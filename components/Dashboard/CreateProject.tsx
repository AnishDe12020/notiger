import { Formik, Form } from "formik";

import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";
import * as Yup from "yup";

import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import { useState } from "react";
import { useSWRConfig } from "swr";
import axios from "axios";
import { Session } from "next-auth";

const CreateProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const PROJECTS_URL = "/api/projects";

interface ICreateProjectProps {
  session: Session;
}

const CreateProject = ({ session }: ICreateProjectProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const handleCreateProjectSubmit = async (values, { setSubmitting }) => {
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
  };

  return (
    <Modal
      triggerText="Create Project"
      title="Create Project"
      isOpen={modalOpen}
      toggleOpen={setModalOpen}
    >
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={CreateProjectValidationSchema}
        onSubmit={handleCreateProjectSubmit}
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
  );
};

export default CreateProject;
