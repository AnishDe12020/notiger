import { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
// import { CgGoogle } from "react-icons/cg";
import { ImGoogle } from "react-icons/im";

const AuthPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center space-x-3 rounded-lg bg-gray-100 px-4 py-2 text-lg font-medium text-gray-900 hover:opacity-60"
      >
        <ImGoogle className="h-5 w-5" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export const getServerSideProps = async context => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export default AuthPage;
