import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";
import Events from "../../components/Events";

const StreamPage: NextPage = () => {
  const router = useRouter();
  const { id: streamId } = router.query;
  const { data: stream, error } = useSWR(`/api/streams/${streamId}`);
  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  return <div className="mx-8">{stream && <Events stream={stream} />}</div>;
};

export default StreamPage;
