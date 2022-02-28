import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FaBell, FaLink, FaLock } from "react-icons/fa";
import * as Accordion from "@radix-ui/react-accordion";
import { HiChevronDown } from "react-icons/hi";

const uses = [
  {
    heading: "Build Notifications",
    content: "Get notified whenever a build completes in Netlify",
  },
  {
    heading: "IoT Devices",
    content:
      "Say, there is a temperature sensor which sends out an event whenever the temperature crosses 30°C. This event will trigger a notification.",
  },
  {
    heading: "Manufacturing",
    content:
      "3D printers take a long time to print an object. It can fire an event that triggers a notification as soon as the print is done.",
  },
];

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="mx-6 flex flex-col items-center md:mx-16 lg:mx-32 xl:mx-48">
      <h1 className="mb-6 bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text py-4 text-5xl font-bold text-transparent md:text-6xl lg:text-7xl">
        Notiger
      </h1>
      <h2 className="text-2xl font-normal text-gray-300 md:text-3xl lg:text-4xl">
        Get{" "}
        <span className="bg-gradient-to-tr from-green-400 to-green-600 bg-clip-text text-3xl font-medium text-transparent md:text-4xl lg:text-5xl">
          realtime notifications
        </span>{" "}
        on events from your application
      </h2>

      <div className="mt-32 flex flex-wrap space-x-24">
        <div className="flex w-64 flex-col items-center justify-center space-y-2">
          <FaLink className="mb-2 h-10 w-10 text-white" />
          <h3 className="text-xl font-semibold text-gray-100">
            Easy to implement
          </h3>
          <p className="text-center text-gray-300">
            Events can be created by posting a webhook to our Rest API. As
            simple as 2 lines of code
          </p>
        </div>
        <div className="flex w-64 flex-col items-center justify-center space-y-2">
          <FaLock className="mb-2 h-10 w-10 text-white" />
          <h3 className="text-xl font-semibold text-gray-100">Secure</h3>
          <p className="text-center text-gray-300">
            Events are securely stored in MongoDB and can only be accessed after
            you have logged in
          </p>
        </div>
        <div className="flex w-64 flex-col items-center justify-center space-y-2">
          <FaBell className="mb-2 h-10 w-10 text-white" />
          <h3 className="text-xl font-semibold text-gray-100">
            Realtime notifications
          </h3>
          <p className="text-center text-gray-300">
            Get push notifications on events directly on your computer and
            mobile phone
          </p>
        </div>
      </div>

      <Accordion.Root
        type="multiple"
        className="mx-8 mt-32 w-2/3 space-y-4 md:mx-24 lg:mx-32 xl:mx-48"
      >
        <h3 className="text-2xl font-medium text-gray-100 md:text-3xl lg:text-4xl">
          Uses
        </h3>
        {uses.map(({ heading, content }) => (
          <Accordion.Item key={heading} value={heading}>
            <Accordion.Header className="w-full">
              <Accordion.Trigger className="group inline-flex w-full items-center justify-between bg-secondary px-4 py-2 text-left radix-state-open:rounded-t-lg radix-state-closed:rounded-lg">
                <span className="text-md font-medium text-gray-100">
                  {heading}
                </span>
                <HiChevronDown className="h-6 w-6 text-gray-100 transition duration-200 ease-in-out group-radix-state-open:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="w-full rounded-b-lg bg-secondary py-2 px-4">
              <p className="text-gray-300">{content}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default Home;
