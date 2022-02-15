import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  const user = useUser();
  console.log(user);
  return <div>Dashboard</div>;
};

export default Dashboard;
