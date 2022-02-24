import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWRImmutable from "swr/immutable";
import cx from "classnames";

import axios from "axios";
import { useState } from "react";

import { CreateStream } from "../../components/Project";
import useSWR from "swr";
import IStream from "../../types/Stream";
import Events from "../../components/Events";
import useBreakpointValue from "../../utils/useBreakpointValue";

const STREAMS_URL = "/api/streams";

const ProjectPage: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { id: projectId } = router.query;

  const { data: project, error: projectError } = useSWRImmutable(
    projectId && `/api/projects/${router.query.id}`
  );

  const { data: streams, error: streamsError } = useSWR(
    projectId && `${STREAMS_URL}?projectId=${projectId}`
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStream, setSelectedStream] = useState<IStream>();

  console.log(selectedStream);

  if (projectError) {
    console.error(projectError);
    toast.error("Something went wrong!");
  }

  if (streamsError) {
    console.error(streamsError);
    toast.error("Something went wrong!");
  }
  console.log(streams);
  console.log(session);

  const breakpointValue = useBreakpointValue();

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

  const handleSelectStream = (stream: IStream) => {
    if (stream === selectedStream) {
      setSelectedStream(undefined);
    } else {
      if (
        breakpointValue === "mobile" ||
        breakpointValue === "sm" ||
        breakpointValue === "xs" ||
        breakpointValue === "md"
      ) {
        router.push(`/stream/${stream._id}`);
      } else {
        setSelectedStream(stream);
      }
    }
  };

  return (
    <div className={cx("mx-8 mt-16 flex space-x-16 md:mx-16")}>
      <div>
        <div className="flex justify-between">
          <div className="mb-8 space-y-4">
            {project ? (
              <>
                <h1 className="text-bold text-3xl text-white">
                  {project?.name}
                </h1>
                <p className="text-md ml-1 text-gray-300">
                  {project?.description}
                </p>
              </>
            ) : (
              <>
                <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-700"></div>
                <div className="h-6 w-28 animate-pulse rounded-lg bg-gray-700"></div>
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
        <div className="flex flex-col">
          {streams ? (
            streams.length > 0 ? (
              streams.map(stream => (
                <button
                  key={stream._id}
                  className={cx(
                    "mb-8 flex h-[150px] flex-col justify-between space-y-4 rounded-lg border-2 border-gray-700 p-4 transition duration-200 hover:border-gray-400 md:p-6",
                    selectedStream === stream && "border-gray-300"
                  )}
                  onClick={() => handleSelectStream(stream)}
                >
                  <h3 className="text-normal text-lg text-white">
                    {stream.name}
                  </h3>
                  <p className="text-gray-300">
                    {stream.description || "No description"}
                  </p>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center space-y-8">
                <h2 className="text-normal text-semibold text-center text-xl text-white md:text-2xl lg:text-3xl">
                  No streams yet!
                </h2>
                <CreateStream
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  handleSubmit={handleCreateStreamSubmit}
                />
              </div>
            )
          ) : (
            <>
              <div className="mb-8 flex h-[150px] flex-col justify-between space-y-4 rounded-lg border-2 border-gray-700 p-4 md:p-6">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              </div>
              <div className="mb-8 flex h-[150px] flex-col justify-between space-y-4 rounded-lg border-2 border-gray-700 p-4 md:p-6">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              </div>
              <div className="mb-8 flex h-[150px] flex-col justify-between space-y-4 rounded-lg border-2 border-gray-700 p-4 md:p-6">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              </div>
              <div className="mb-8 flex h-[150px] flex-col justify-between space-y-4 rounded-lg border-2 border-gray-700 p-4 md:p-6">
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
                <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={cx(
          "w-full flex-col items-center",
          !selectedStream && "justify-center",
          "hidden lg:flex"
        )}
      >
        {selectedStream ? (
          <Events streamId={selectedStream._id} />
        ) : (
          <h2 className="text-xl font-semibold text-white md:text-2xl lg:text-3xl">
            Select a stream to see events
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
