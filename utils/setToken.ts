import getFCMToken from "../lib/firebase";

const setToken = async () => {
  try {
    const token = await getFCMToken();
    if (token) {
      console.log(token);
    }
  } catch (err) {
    console.error(err);
  }
};

export default setToken;
