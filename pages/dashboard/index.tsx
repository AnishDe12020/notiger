import { Formik, Form } from "formik";
import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";
import * as Yup from "yup";

import Modal from "../../components/Modal";
import axios from "axios";

const CreateProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <Modal triggerText="Create Project" title="Create Project">
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={CreateProjectValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // @ts-ignore
            const { data, error } = await axios.post("/api/projects", {
              name: values.name,
              description: values.description,
              // @ts-ignore
              ownerId: session.user.id,
            });

            if (error) {
              console.error(error);
            } else {
              console.log(data);
            }

            setSubmitting(false);
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
