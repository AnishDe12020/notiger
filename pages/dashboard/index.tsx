import { Formik, Form } from "formik";
import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";
import * as Yup from "yup";

import Modal from "../../components/Modal";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const PROJECTS_URL = "/api/projects";

const CreateProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  const {
    data: { data: projects },
    error,
  } = useSWR("/api/projects");

  console.log(projects);

  if (error) {
    toast.error("Error fetching projects");
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      {projects?.length > 0 &&
        projects.map(project => (
          <div className="text-white" key={project.id}>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
        ))}
      <Modal
        isOpen={modalOpen}
        toggleOpen={setModalOpen}
        triggerText="Create Project"
        title="Create Project"
      >
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={CreateProjectValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // @ts-ignore
            const { data, error } = await axios.post(PROJECTS_URL, {
              name: values.name,
              description: values.description,
              // @ts-ignore
              ownerId: session.user.id,
            });

            if (error) {
              toast.error("Something went wrong!");
              console.error(error);
            } else {
              toast.success("Project created!");
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
                placeholder="My Awesome Project"
                label="Project Name"
                required
              />
              <FormikInputGroup
                as="textarea"
                id="description"
                name="description"
                label="Project Description"
              />
              <Button loading={isSubmitting} type="submit" className="w-40">
                Create Project
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth?redirectTo=%2Fdashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default DashboardPage;
