import axios from "axios";
import { NextPage } from "next";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import ApiKey from "../../components/ApiKey";
import Button from "../../components/Button";
import { NextSeo } from "next-seo";

const ApiKeyPage: NextPage = () => {
  const { data: apiKeys, error } = useSWR("/api/apiKey");
  const { mutate } = useSWRConfig();

  if (error) {
    toast.error("Something went wrong!");
  }

  const generateApiKey = async () => {
    const res = await axios.post("/api/apiKey");
    console.log(res);
    mutate("/api/apiKey");
  };

  return (
    <>
      <NextSeo title="Notiger | API Keys" />
      <div className="mx-8 mt-32 flex flex-col space-y-16 md:mx-16">
        <Button onClick={generateApiKey} className="md:w-fit">
          Generate API Key
        </Button>
        <div className="flex flex-col space-y-4">
          {apiKeys ? (
            apiKeys.length > 0 ? (
              apiKeys.map(apiKey => <ApiKey apiKey={apiKey} key={apiKey._id} />)
            ) : (
              <h2 className="text-normal text-lg text-white md:text-xl lg:text-2xl">
                No API Keys yet
              </h2>
            )
          ) : (
            <>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700 md:w-64 lg:w-96" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700 md:w-64 lg:w-96" />{" "}
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700 md:w-64 lg:w-96" />{" "}
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700 md:w-64 lg:w-96" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ApiKeyPage;
