import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { ObjectId } from "mongodb";
import { Fragment, ReactNode, useState } from "react";
import Events from "../Events";
import cx from "classnames";
import { HiX } from "react-icons/hi";

interface IEventsDrawerProps {
  streamId: string;
  children: ReactNode;
}

const EventsDrawer = ({
  children,
  streamId,
}: IEventsDrawerProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <Dialog.Root onOpenChange={setDrawerOpen} open={drawerOpen} modal={false}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Transition.Root show={drawerOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="tanslate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Content className="fixed right-0 top-0 z-50 my-4 w-full rounded-lg bg-secondary px-4 py-4 pt-16 md:right-4 md:w-[56rem] lg:right-8">
            <Events streamId={streamId as unknown as ObjectId} />
            <Dialog.Close
              className={cx(
                "absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1",
                "focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-60"
              )}
            >
              <HiX className="h-6 w-6 text-gray-500 hover:opacity-60" />
            </Dialog.Close>
          </Dialog.Content>
        </Transition.Child>
      </Transition.Root>
    </Dialog.Root>
  );
};

export default EventsDrawer;
