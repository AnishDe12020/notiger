import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWRImmutable from "swr/immutable";
import cx from "classnames";

import { CreateStream } from "../../components/Project";
import useSWR from "swr";

import EventsDrawer from "../../components/Project/EventsDrawer";

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

  return (
    <div className={cx("mx-8 mt-16 md:mx-16")}>
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
              <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-6 w-28 animate-pulse rounded-lg bg-gray-700"></div>
            </>
          )}
        </div>

        <div>
          <CreateStream project={project} />
        </div>
      </div>

      <div className="flex flex-col">
        {streams ? (
          streams.length > 0 ? (
            streams.map(stream => (
              <EventsDrawer streamId={stream._id} key={stream._id}>
                <button
                  key={stream._id}
                  className={cx(
                    "mb-8 flex h-[150px] flex-col justify-between space-y-4 rounded-lg border-2 border-gray-700 p-4 transition duration-200 hover:border-gray-400 md:p-6"
                  )}
                >
                  <h3 className="text-normal text-lg text-white">
                    {stream.name}
                  </h3>
                  <p className="text-gray-300">
                    {stream.description || "No description"}
                  </p>
                </button>
              </EventsDrawer>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8">
              <h2 className="text-normal text-semibold text-center text-xl text-white md:text-2xl lg:text-3xl">
                No streams yet!
              </h2>
              <CreateStream project={project} />
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
  );
};

export default ProjectPage;
