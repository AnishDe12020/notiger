import { useState } from "react";
import IApiKey from "../types/ApiKey";
import cx from "classnames";
import Button from "./Button";
import { HiEye, HiClipboardCopy } from "react-icons/hi";

interface IApiKeyProps {
  apiKey: IApiKey;
}

const ApiKey = ({ apiKey }: IApiKeyProps): JSX.Element => {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="flex space-x-4">
      <h3
        className={cx("w-96 text-gray-100", hidden ? "blur-sm" : "blue-none")}
      >
        {apiKey.key}
      </h3>
      <div className="flex space-x-1">
        <Button className="bg-transparent !text-gray-100">
          <HiClipboardCopy
            onClick={() => navigator.clipboard.writeText(apiKey.key)}
          />
        </Button>
        <Button className="bg-transparent !text-gray-100">
          <HiEye onClick={() => setHidden(!hidden)} />
        </Button>
      </div>
    </div>
  );
};

export default ApiKey;
