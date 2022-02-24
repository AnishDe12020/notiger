import { ObjectId } from "mongodb";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Events from "../../components/Events";

const StreamPage: NextPage = () => {
  const router = useRouter();
  const { id: streamId } = router.query;

  return (
    <div className="mx-8">
      {streamId && <Events streamId={streamId as unknown as ObjectId} />}
    </div>
  );
};

export default StreamPage;
