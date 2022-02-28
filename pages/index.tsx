import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FaBell, FaLink, FaLock } from "react-icons/fa";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-6 bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text py-4 text-5xl font-bold text-transparent md:text-6xl lg:text-7xl">
        Notiger
      </h1>
      <h2 className="text-2xl font-normal text-gray-300 md:text-3xl lg:text-4xl">
        Get{" "}
        <span className="bg-gradient-to-tr from-green-400 to-green-600 bg-clip-text text-3xl font-medium text-transparent md:text-4xl lg:text-5xl">
          realtime notifications
        </span>{" "}
        on events from your application
      </h2>

      <div className="mt-32 flex flex-wrap space-x-24">
        <div className="flex w-64 flex-col items-center justify-center space-y-2">
          <FaLink className="mb-2 h-10 w-10 text-white" />
          <h3 className="text-xl font-semibold text-gray-100">
            Easy to implement
          </h3>
          <p className="text-center text-gray-300">
            Events can be created by posting a webhook to our Rest API. As
            simple as 2 lines of code
          </p>
        </div>
        <div className="flex w-64 flex-col items-center justify-center space-y-2">
          <FaLock className="mb-2 h-10 w-10 text-white" />
          <h3 className="text-xl font-semibold text-gray-100">Secure</h3>
          <p className="text-center text-gray-300">
            Events are securely stored in MongoDB and can only be accessed after
            you have logged in
          </p>
        </div>
        <div className="flex w-64 flex-col items-center justify-center space-y-2">
          <FaBell className="mb-2 h-10 w-10 text-white" />
          <h3 className="text-xl font-semibold text-gray-100">
            Realtime notifications
          </h3>
          <p className="text-center text-gray-300">
            Get push notifications on events directly on your computer and
            mobile phone
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
