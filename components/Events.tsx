import toast from "react-hot-toast";
import useSWR from "swr";
import IStream from "../types/Stream";
import ReactJson from "react-json-view";

interface IEventsProps {
  stream: IStream;
}

const Events = ({ stream }: IEventsProps): JSX.Element => {
  const { data: events, error } = useSWR(
    stream && `/api/events?streamId=${stream._id}`
  );

  console.log(events);

  if (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <h2 className="text-normal mb-8 text-lg text-white md:text-xl lg:text-2xl">
        {stream.name}
      </h2>
      {events &&
        events.map(event => (
          <div key={event._id} className="space-y-8">
            <div className="flex space-x-8">
              {event?.icon && (
                <div className="text-white">
                  <span>{event?.icon || "?"}</span>
                </div>
              )}
              <div className="flex flex-col space-y-4">
                <h3 className="text-md text-gray-100">{event?.name}</h3>
                <p className="text-sm text-gray-300">{event?.description}</p>
              </div>
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
        ))}
    </div>
  );
};

export default Events;
