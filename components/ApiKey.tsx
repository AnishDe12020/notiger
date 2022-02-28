import { useState } from "react";
import IApiKey from "../types/ApiKey";
import cx from "classnames";
import Button from "./Button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoCopy } from "react-icons/io5";

interface IApiKeyProps {
  apiKey: IApiKey;
}

const ApiKey = ({ apiKey }: IApiKeyProps): JSX.Element => {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="flex w-fit space-x-4 rounded-lg border-2 border-gray-700 px-4 py-2">
      <h3
        className={cx(
          "w-fit text-gray-100 md:w-80",
          hidden ? "blur-sm" : "blue-none"
        )}
      >
        {apiKey.key}
      </h3>
      <div className="flex space-x-1">
        <Button className="!bg-transparent !text-gray-300">
          <IoCopy onClick={() => navigator.clipboard.writeText(apiKey.key)} />
        </Button>
        <Button
          onClick={() => setHidden(!hidden)}
          className="!bg-transparent !text-gray-300"
        >
          {hidden ? <HiEyeOff /> : <HiEye />}
        </Button>
      </div>
    </div>
  );
};

export default ApiKey;
