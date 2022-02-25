import axios from "axios";
import { NextPage } from "next";
import toast from "react-hot-toast";
import useSWR from "swr";
import ApiKey from "../../components/ApiKey";
import Button from "../../components/Button";

const ApiKeyPage: NextPage = () => {
  const { data: apiKeys, error } = useSWR("/api/apiKey");

  if (error) {
    toast.error("Something went wrong!");
  }

  console.log(apiKeys);

  const generateApiKey = async () => {
    const res = await axios.post("/api/apiKey");
    console.log(res);
  };

  return (
    <div>
      <Button onClick={generateApiKey}>Generate API Key</Button>
      {apiKeys.map(apiKey => (
        <ApiKey apiKey={apiKey} key={apiKey._id} />
      ))}
    </div>
  );
};

export default ApiKeyPage;
