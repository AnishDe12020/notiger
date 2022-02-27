import useNotifications from "../../hooks/useNotifications";
import Button from "../Button";
import NavLink from "./NavLink";
import { useRouter } from "next/router";

const Header = (): JSX.Element => {
  const { isSetup, setUpNotifications } = useNotifications();
  const router = useRouter();

  console.log("Is setup: ", isSetup);

  return (
    <nav className="mx-8 mt-4 flex items-center justify-end md:mx-16">
      {!isSetup && (
        <Button onClick={setUpNotifications}>Enable push notifications</Button>
      )}
      <div className="flex space-x-4">
        <NavLink currentRoute={router.pathname} href="/dashboard">
          Dashboard
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
