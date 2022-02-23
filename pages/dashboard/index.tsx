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
import useSWR, { useSWRConfig } from "swr";

const PROJECTS_URL = "/api/projects";

const CreateProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  console.log(session);

  const { data: projects, error } = useSWR(
    // @ts-ignore
    `${PROJECTS_URL}?ownerId=${session.token.user.id}`
  );

  console.log(projects);

  if (error) {
    toast.error("Error fetching projects");
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="mx-8 mt-16 flex flex-col justify-center space-y-16 md:mx-32 lg:mx-64 xl:mx-96">
      <div className="flex justify-end">
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
                ownerId: session.token.user.id,
              });

              if (error) {
                toast.error("Something went wrong!");
                console.error(error);
              } else {
                // @ts-ignore
                mutate(`${PROJECTS_URL}?ownerId=${session.token.user.id}`);
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
      <div
        className="grid items-center justify-center gap-8 align-middle"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {projects &&
          projects.map(project => (
            <div
              className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6"
              key={project.id}
            >
              <h3 className="text-normal text-lg">{project.name}</h3>
              <p className="text-gray-300">
                {project.description || "No Description"}
              </p>
            </div>
          ))}
      </div>
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
