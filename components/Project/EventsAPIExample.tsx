import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import Button from "../Button";
import Modal from "../Modal";

interface IEventsAPIExampleProps {
  streamId: string;
}

const EventsAPIExample = ({
  streamId,
}: IEventsAPIExampleProps): JSX.Element => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>();

  useEffect(() => {
    setApiUrl(`https://www.notiger.xyz/api/events?streamId=${streamId}`);
  }, [streamId]);

  return (
    <Modal triggerText="See API route" isOpen={isOpen} toggleOpen={toggleOpen}>
      <div className="mt-8 flex space-x-2 rounded-lg border-2 border-gray-500 px-4 py-2 text-gray-100">
        <textarea
          className="h-24 w-full resize-none border-none bg-secondary"
          disabled
        >
          {apiUrl}
        </textarea>
        <Button className="!bg-transparent !text-gray-300">
          <IoCopy
            onClick={() => {
              navigator.clipboard.writeText(apiUrl);
              toast.success("Copied to clipboard");
            }}
          />
        </Button>
      </div>
      <p className="mx-4 mt-8 leading-8 text-gray-100">
        Also don&apos;t forget to{" "}
        <Link href="/apikey" passHref>
          <a className="text-blue-500 transition duration-200 hover:opacity-60">
            generate an API Key
          </a>
        </Link>{" "}
        and pass it in as a header called <code>x-api-key</code>. You can also
        pass it in as the <code>apiKey</code> query parameter.
      </p>
    </Modal>
  );
};

export default EventsAPIExample;
