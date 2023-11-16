import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/chat/channel");
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const setData = async () => {
  try {
    const response = await axios.post("http://localhost:3001/chat/channel");
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};
