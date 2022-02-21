import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <h1 className="text-gray-100">
        This is just a side project I am working on. It is not out yet and it
        would be helpful if you can let me know where you found the link to this
        website from on{" "}
        <a
          className="transition/200 text-blue-500 hover:opacity-60"
          href="https://twitter.com/AnishDe12020"
        >
          Twitter
        </a>
      </h1>
    </div>
  );
};

export default Home;
