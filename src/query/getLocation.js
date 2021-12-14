import axios from "axios";

export const getLocations = async () => {
  const { data } = await axios.get(
    "https://geepstracker.herokuapp.com/device/61b7946f19ea920268bb6dbd",
    {
      headers: {
        accept: "*/*",
        //   authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
