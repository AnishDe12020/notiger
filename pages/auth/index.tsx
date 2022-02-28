import { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
// import { CgGoogle } from "react-icons/cg";
import { ImGoogle } from "react-icons/im";
import Button from "../../components/Button";
import { NextSeo } from "next-seo";

const AuthPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <NextSeo title="Notiger | Authentication" />

      <div className="flex h-screen flex-col items-center justify-center">
        {session ? (
          <Button onClick={() => signOut()} danger>
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => signIn("google")}>
            <ImGoogle className="h-5 w-5" />
            <span>Sign in with Google</span>
          </Button>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session && context.query.callbackUrl) {
    return {
      redirect: {
        destination: context.query.callbackUrl,
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
