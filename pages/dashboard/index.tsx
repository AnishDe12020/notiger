import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div className="text-white">Dashboard :)</div>;
};

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

export default DashboardPage;
