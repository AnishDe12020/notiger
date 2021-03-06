import NavLink from "./NavLink";
import { useRouter } from "next/router";
import { Logo } from "../Icons";
import { signOut, useSession } from "next-auth/react";
import Button from "../Button";

const Header = (): JSX.Element => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="mx-8 mt-4 flex items-center justify-between md:mx-16">
      <NavLink
        currentRoute={router.pathname}
        href="/"
        className="!opacity-100 hover:!opacity-80"
      >
        <Logo className="h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
      </NavLink>
      <div className="flex space-x-4">
        {session ? (
          <>
            <NavLink currentRoute={router.pathname} href="/dashboard">
              Dashboard
            </NavLink>
            <NavLink currentRoute={router.pathname} href="/apikey">
              API Keys
            </NavLink>
            <Button
              onClick={signOut}
              className="lg:text-md !bg-transparent text-xs !font-normal !text-gray-100 !opacity-80 hover:!opacity-60 md:text-sm"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <NavLink
            currentRoute={router.pathname}
            href={`/auth?callbackUrl=${router.pathname}`}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
