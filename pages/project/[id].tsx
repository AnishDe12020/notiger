import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";

const ProjectPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: project, error } = useSWR(`/api/projects/${router.query.id}`);

  if (error) {
    toast.error(error.message);
  }
  console.log(project);
  console.log(session);

  return (
    <div className="mx-8 mt-16 md:mx-16 lg:mx-32 xl:mx-64">
      <h1 className="text-bold mb-4 text-3xl text-white">{project?.name}</h1>
      <p className="text-md ml-1 text-gray-300">{project?.description}</p>
    </div>
  );
};

export const getServerSideProps = async ctx => {
  const { id } = ctx.query;

  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `/auth?redirectTo=%2Fproject%2F${id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      id,
    },
  };
};

export default ProjectPage;
