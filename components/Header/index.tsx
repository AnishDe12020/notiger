import NavLink from "./NavLink";
import { useRouter } from "next/router";
import { Logo } from "../Icons";

const Header = (): JSX.Element => {
  const router = useRouter();

  return (
    <nav className="mx-8 mt-4 flex items-center justify-between md:mx-16">
      <NavLink currentRoute={router.pathname} href="/">
        <Logo className="h-16 w-16" />
      </NavLink>
      <div className="flex space-x-4">
        <NavLink currentRoute={router.pathname} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink currentRoute={router.pathname} href="/apikey">
          API Keys
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
