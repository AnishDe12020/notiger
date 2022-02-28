import useNotifications from "../hooks/useNotifications";
import Button from "./Button";
import { HiBell } from "react-icons/hi";

const NotificationButton = (): JSX.Element => {
  let { isSetup, setUpNotifications } = useNotifications();

  isSetup = false;

  return (
    <>
      {!isSetup && (
        <Button
          className="group absolute right-8 bottom-8 h-12 w-12 rounded-full"
          onClick={setUpNotifications}
          aria-label="Enable Push Notifications"
        >
          <HiBell className="h-8 w-8" />
        </Button>
      )}
    </>
  );
};

export default NotificationButton;
