import { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
// import { CgGoogle } from "react-icons/cg";
import { ImGoogle } from "react-icons/im";

const AuthPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {session ? (
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center space-x-3 rounded-lg bg-red-500 px-4 py-2 text-lg font-medium text-gray-900 hover:opacity-60"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center space-x-3 rounded-lg bg-gray-100 px-4 py-2 text-lg font-medium text-gray-900 hover:opacity-60"
        >
          <ImGoogle className="h-5 w-5" />
          <span>Sign in with Google</span>
        </button>
      )}
    </div>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session && context.query.redirectTo) {
    return {
      redirect: {
        destination: context.query.redirectTo,
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

export default AuthPage;
