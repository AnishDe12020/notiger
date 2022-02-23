import { Formik, Form, FormikValues, FormikHelpers } from "formik";

import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";
import * as Yup from "yup";

import Modal from "../../components/Modal";

interface ICreateStreamProps {
  handleSubmit: (
    values: FormikValues,
    options: FormikHelpers<FormikValues>
  ) => void;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const CreateStreamValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const CreateStream = ({
  modalOpen,
  setModalOpen,
  handleSubmit,
}: ICreateStreamProps): JSX.Element => {
  return (
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
        onSubmit={handleSubmit}
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
  );
};

export default CreateStream;
