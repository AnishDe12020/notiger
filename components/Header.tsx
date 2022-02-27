import useNotifications from "../hooks/useNotifications";
import Button from "./Button";

const Header = (): JSX.Element => {
  const { isSetup, setUpNotifications } = useNotifications();

  return (
    <nav className="mx-8 mt-4 flex items-end justify-end md:mx-16">
      {!isSetup && (
        <Button onClick={setUpNotifications}>Enable push notifications</Button>
      )}
    </nav>
  );
};

export default Header;
