import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWRImmutable from "swr/immutable";

import axios from "axios";
import { useState } from "react";

import { CreateStream } from "../../components/Project";

const STREAMS_URL = "/api/streams";

const ProjectPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id: projectId } = router.query;
  const { data: project, error } = useSWRImmutable(
    projectId && `/api/projects/${router.query.id}`
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCreateStreamSubmit = async (values, { setSubmitting }) => {
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
  };

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
          <CreateStream
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleSubmit={handleCreateStreamSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
