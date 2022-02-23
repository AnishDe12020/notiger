import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Formik, Form } from "formik";
import Button from "../../components/Button";
import * as Yup from "yup";
import Modal from "../../components/Modal";
import axios from "axios";
import { useState } from "react";
import FormikInputGroup from "../../components/FormikInputGroup";

const STREAMS_URL = "/api/streams";

const CreateStreamValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const ProjectPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id: projectId } = router.query;
  const { data: project, error } = useSWR(
    projectId && `/api/projects/${router.query.id}`
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (error) {
    toast.error(error.message);
  }
  console.log(project);
  console.log(session);

  return (
    <div className="mx-8 mt-16 md:mx-16 lg:mx-32 xl:mx-64">
      <div className="flex justify-between">
        <div className="mb-8 space-y-4">
          {project ? (
            <>
              <h1 className="text-bold text-3xl text-white">{project?.name}</h1>
              <p className="text-md ml-1 text-gray-300">
                {project?.description}
              </p>
            </>
          ) : (
            <>
              <div className="h-10 animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-6 animate-pulse rounded-lg bg-gray-700"></div>
            </>
          )}
        </div>

        <div>
          <Modal
            isOpen={modalOpen}
            toggleOpen={setModalOpen}
            triggerText="Create Stream"
            title="Create Stream"
          >
            <Formik
              initialValues={{
                name: "",
                description: "",
              }}
              validationSchema={CreateStreamValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // @ts-ignore
                const { data, error } = await axios.post(STREAMS_URL, {
                  name: values.name,
                  description: values.description,
                  projectId: project._id,
                });

                if (error) {
                  toast.error("Something went wrong!");
                  console.error(error);
                } else {
                  toast.success("Stream created!");
                  console.log(data);
                }

                setSubmitting(false);
                setTimeout(() => {
                  setModalOpen(false);
                }, 50);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <FormikInputGroup
                    type="text"
                    id="name"
                    name="name"
                    placeholder="My Awesome Stream"
                    label="Stream Name"
                    required
                  />
                  <FormikInputGroup
                    as="textarea"
                    id="description"
                    name="description"
                    label="Stream Description"
                  />
                  <Button loading={isSubmitting} type="submit" className="w-40">
                    Create Stream
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
