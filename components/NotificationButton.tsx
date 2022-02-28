import useNotifications from "../hooks/useNotifications";
import Button from "./Button";
import { HiBell } from "react-icons/hi";
import { useSession } from "next-auth/react";

const NotificationButton = (): JSX.Element => {
  const { isSetup, setUpNotifications } = useNotifications();
  const { data: session } = useSession();

  return (
    <>
      {!isSetup && session && (
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
