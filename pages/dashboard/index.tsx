import { Formik, Form, Field } from "formik";
import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Button from "../../components/Button";

import Modal from "../../components/Modal";

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="text-white">
      <Modal triggerText="Open e" title="Title">
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="opacity-80">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-lg border-2 bg-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="description" className="opacity-80">
                  Description
                </label>
                <Field
                  as="textarea"
                  type="text"
                  name="description"
                  id="description"
                  className="rounded-lg border-2 bg-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
                />
              </div>
              <Button type="submit">Create Project</Button>
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
