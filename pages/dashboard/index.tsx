import { NextPage } from "next";
import { useSession } from "next-auth/react";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { CreateProject } from "../../components/Dashboard";

const PROJECTS_URL = "/api/projects";

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  console.log(session);

  const { data: projects, error } = useSWR(
    session &&
      // @ts-ignore
      `${PROJECTS_URL}?ownerId=${session.token.user.id}`
  );

  if (error) {
    toast.error("Error fetching projects");
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    <div className="mx-8 mt-16 flex flex-col justify-center space-y-16 md:mx-32 lg:mx-64 xl:mx-96">
      <div className="flex justify-end">
        <CreateProject
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleSubmit={handleCreateProjectSubmit}
        />
      </div>
      <div
        className="grid items-center justify-center gap-8 align-middle"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {projects ? (
          projects.length > 0 ? (
            projects.map(project => (
              <div
                className="flex h-[200px] w-full flex-col space-y-4 rounded-lg border-2 border-gray-700 p-4 text-white md:p-6"
                key={project.id}
              >
                <h3 className="text-normal text-lg">{project.name}</h3>
                <p className="text-gray-300">
                  {project.description || "No Description"}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8">
              <h2 className="text-semibold text-center text-xl text-white md:text-2xl lg:text-3xl">
                No projects yet!
              </h2>
              <CreateProject
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleSubmit={handleCreateProjectSubmit}
              />
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
