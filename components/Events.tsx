import toast from "react-hot-toast";
import useSWR from "swr";

import dynamic from "next/dynamic";
import Twemoji from "react-twemoji";
import getCreatedAtFromMongoId from "../utils/getCreatedAtFromMongoId";
import { ObjectId } from "mongodb";
import EventsAPIExample from "./Project/EventsAPIExample";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface IEventsProps {
  streamId: ObjectId;
}

const Events = ({ streamId }: IEventsProps): JSX.Element => {
  const { data: events, error } = useSWR(
    streamId && `/api/events?streamId=${streamId}`
  );

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <EventsAPIExample streamId={streamId as unknown as string} />

      <div className="mt-4 flex flex-col space-y-8">
        {events ? (
          events.length > 0 ? (
            events.map(event => (
              <div
                key={event._id}
                className="space-y-8 rounded-lg border-2 border-gray-500 p-4"
              >
                <div className="flex justify-between">
                  <div className="flex space-x-4 md:space-x-6">
                    <Twemoji
                      className="flex h-fit w-fit items-center justify-center rounded-full bg-gray-800 p-3"
                      options={{ className: "h-4 w-4 md:h-6 md:w-6" }}
                    >
                      {event?.icon || "🔔"}
                    </Twemoji>

                    <div className="flex flex-col space-y-2 md:space-y-4">
                      <h3 className="text-lg text-gray-100">
                        {event?.name || "No name"}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {event?.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    {getCreatedAtFromMongoId(event._id)}
                  </p>
                </div>

                <ReactJson
                  src={event}
                  theme={{
                    base00: "#000000",
                    base01: "#242424",
                    base02: "#484848",
                    base03: "#6c6c6c",
                    base04: "#918f8f",
                    base05: "#b5b3b3",
                    base06: "#e0e0e0",
                    base07: "#ffffff",
                    base08: "#d70000",
                    base09: "#ff9900",
                    base0A: "#ffff00",
                    base0B: "#00d7ff",
                    base0C: "#0099ff",
                    base0D: "#0066ff",
                    base0E: "#9933ff",
                    base0F: "#ff33ff",
                  }}
                  iconStyle="triangle"
                  style={{ borderRadius: "1rem", padding: "1rem" }}
                />
              </div>
            ))
          ) : (
            <>
              <h2 className="text-semibold text-center text-lg text-white md:text-xl lg:text-2xl">
                No events yet
              </h2>
            </>
          )
        ) : (
          <>
            <div className="space-y-8 rounded-lg border-2 border-gray-500 p-4">
              <div className="flex justify-between">
                <div className="flex space-x-4 md:space-x-6">
                  <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-500"></div>

                  <div className="flex flex-col space-y-2 md:space-y-4">
                    <div className="h-6 w-64 animate-pulse rounded-lg bg-gray-500" />
                    <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-500" />
                  </div>
                </div>
              </div>

              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="space-y-8 rounded-lg border-2 border-gray-500 p-4">
              <div className="flex justify-between">
                <div className="flex space-x-4 md:space-x-6">
                  <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-500"></div>

                  <div className="flex flex-col space-y-2 md:space-y-4">
                    <div className="h-6 w-64 animate-pulse rounded-lg bg-gray-500" />
                    <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-500" />
                  </div>
                </div>
              </div>

              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="space-y-8 rounded-lg border-2 border-gray-500 p-4">
              <div className="flex justify-between">
                <div className="flex space-x-4 md:space-x-6">
                  <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-500"></div>

                  <div className="flex flex-col space-y-2 md:space-y-4">
                    <div className="h-6 w-64 animate-pulse rounded-lg bg-gray-500" />
                    <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-500" />
                  </div>
                </div>
              </div>

              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-500" />
            </div>
            <div className="space-y-8 rounded-lg border-2 border-gray-500 p-4">
              <div className="flex justify-between">
                <div className="flex space-x-4 md:space-x-6">
                  <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-500"></div>

                  <div className="flex flex-col space-y-2 md:space-y-4">
                    <div className="h-6 w-64 animate-pulse rounded-lg bg-gray-500" />
                    <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-500" />
                  </div>
                </div>
              </div>

              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
