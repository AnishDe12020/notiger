import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

import Modal from "../../components/Modal";

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="text-white">
      <Modal triggerText="Open e" title="Title">
        <p>Test</p>
      </Modal>
    </div>
  );
};

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth?redirectTo=%2Fdashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default DashboardPage;
