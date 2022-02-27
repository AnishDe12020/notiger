import setToken from "../utils/setToken";
import Button from "./Button";

const Header = (): JSX.Element => {
  return (
    <nav className="mx-8 mt-4 flex items-end justify-end md:mx-16">
      <Button onClick={setToken}>Enable push notifications</Button>
    </nav>
  );
};

export default Header;
