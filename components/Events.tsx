import toast from "react-hot-toast";
import useSWR from "swr";
import IStream from "../types/Stream";

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
    <div className="flex flex-col">
      <h2 className="text-normal text-lg text-white md:text-xl lg:text-2xl">
        {stream.name}
      </h2>
      {events &&
        events.map(event => (
          <div key={event._id}>
            <h3 className="text-md text-gray-100">{event?.name}</h3>
            <p className="text-sm text-gray-300">{event?.description}</p>
          </div>
        ))}
    </div>
  );
};

export default Events;
