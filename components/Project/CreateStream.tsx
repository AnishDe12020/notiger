import { Formik, Form } from "formik";

import Button from "../../components/Button";
import FormikInputGroup from "../../components/FormikInputGroup";
import * as Yup from "yup";

import Modal from "../../components/Modal";
import { useState } from "react";
import IProject from "../../types/Project";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import axios from "axios";

interface ICreateStreamProps {
  project: IProject;
}

const CreateStreamValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  description: Yup.string(),
});

const STREAMS_URL = "/api/streams";

const CreateStream = ({ project }: ICreateStreamProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const handleCreateStreamSubmit = async (values, { setSubmitting }) => {
    // @ts-ignore
    const { error } = await axios.post(STREAMS_URL, {
      name: values.name,
      description: values.description,
      projectId: project._id,
    });

    if (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } else {
      mutate(`${STREAMS_URL}?projectId=${project._id}`);
      toast.success("Stream created!");
    }

    setSubmitting(false);
    setTimeout(() => {
      setModalOpen(false);
    }, 50);
  };

  return (
    <Modal
      triggerText="Create Stream"
      title="Create Stream"
      isOpen={modalOpen}
      toggleOpen={setModalOpen}
    >
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={CreateStreamValidationSchema}
        onSubmit={handleCreateStreamSubmit}
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
