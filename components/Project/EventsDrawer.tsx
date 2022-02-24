import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { ObjectId } from "mongodb";
import { Fragment, ReactNode, useState } from "react";
import Events from "../Events";

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
    <Dialog.Root onOpenChange={setDrawerOpen} open={drawerOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Transition.Root show={drawerOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="tanslate-x-0"
          leave="ease-in duration-200"
        >
          <Dialog.Overlay />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="tanslate-x-0"
          leave="ease-in duration-200"
        >
          <Dialog.Content className="fixed right-0 top-0 z-50 bg-black">
            <Events streamId={streamId as unknown as ObjectId} />
          </Dialog.Content>
        </Transition.Child>
      </Transition.Root>
    </Dialog.Root>
  );
};

export default EventsDrawer;
