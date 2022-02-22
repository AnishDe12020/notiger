import { Formik, Form } from "formik";
import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";

import Modal from "../../components/Modal";

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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 2000);
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
