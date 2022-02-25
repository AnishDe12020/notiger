import { NextPage } from "next";
import { useSession } from "next-auth/react";

import toast from "react-hot-toast";
import useSWR from "swr";
import { CreateProject } from "../../components/Dashboard";
import Link from "next/link";

const PROJECTS_URL = "/api/projects";

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  const { data: projects, error } = useSWR(
    session &&
      // @ts-ignore
      `${PROJECTS_URL}?ownerId=${session.token.user.id}`
  );

  if (error) {
    toast.error("Error fetching projects");
  }

  return (
    <div className="mx-8 mt-16 flex flex-col justify-center space-y-16 md:mx-32 lg:mx-64 xl:mx-96">
      <div className="flex justify-end">
        <CreateProject session={session} />
      </div>
      <div
        className="grid items-center justify-center gap-8 align-middle"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {projects ? (
          projects.length > 0 ? (
            projects.map(project => (
              <Link
                href="/project/[id]"
                as={`/project/${project._id}`}
                key={project._id}
                passHref
              >
                <a
                  className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white transition duration-200 hover:border-gray-400 md:p-6"
                  key={project._id}
                >
                  <h3 className="text-normal text-lg">{project.name}</h3>
                  <p className="text-gray-300">
                    {project.description || "No Description"}
                  </p>
                </a>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8">
              <h2 className="text-semibold text-center text-xl text-white md:text-2xl lg:text-3xl">
                No projects yet!
              </h2>
              <CreateProject session={session} />
            </div>
          )
        ) : (
          <>
            <div className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
            <div className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6">
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
