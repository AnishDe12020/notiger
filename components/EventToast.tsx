import { Transition } from "@headlessui/react";
import { Toast } from "react-hot-toast";
import Twemoji from "react-twemoji";

interface IToastProps {
  t: Toast;
}

const EventToast = ({ t }: IToastProps): JSX.Element => {
  return (
    <Transition
      show={t.visible}
      className="flex space-x-2 rounded-2xl bg-secondary px-4 py-3 transition duration-200"
      enter="transition duration-1000"
      enterFrom="-translate-y-full"
      enterTo="translate-y-0"
      leave="transition duration-200"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-full"
    >
      <Twemoji
        className="flex h-fit w-fit items-center justify-center rounded-full bg-gray-800 p-3"
        options={{ className: "h-4 w-4 md:h-6 md:w-6" }}
      >
        {/* @ts-ignore */}
        {payload?.data.icon || "🔔"}
      </Twemoji>
      <div className="flex flex-col text-gray-100">
        <h3 className="text-md text-normal">
          {/* @ts-ignore */}
          {payload?.data.name || "New Event"}
        </h3>
        <p className="text-sm text-gray-300">
          {/* @ts-ignore */}
          {payload?.data.description}
        </p>
      </div>
    </Transition>
  );
};

export default EventToast;
