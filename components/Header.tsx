import setUpNotifications from "../utils/setUpNotifications";
import Button from "./Button";

const Header = (): JSX.Element => {
  return (
    <nav className="mx-8 mt-4 flex items-end justify-end md:mx-16">
      <Button onClick={setUpNotifications}>Enable push notifications</Button>
    </nav>
  );
};

export default Header;
