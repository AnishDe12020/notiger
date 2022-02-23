import { Formik, Form, FormikValues, FormikHelpers } from "formik";

import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";
import * as Yup from "yup";

import Modal from "../../components/Modal";

interface ICreateProjectProps {
  handleSubmit: (
    values: FormikValues,
    options: FormikHelpers<FormikValues>
  ) => void;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const CreateProjectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const CreateProject = ({
  modalOpen,
  setModalOpen,
  handleSubmit,
}: ICreateProjectProps): JSX.Element => {
  return (
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
        onSubmit={handleSubmit}
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
