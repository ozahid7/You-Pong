import { Channel } from "@/types";
import axios from "axios";
import { attachReactRefresh } from "next/dist/build/webpack-config";
// import { setDataObj } from "@/components/tools/GroupsModal";

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

export const setData = async (data: Channel) => {
  try {
    const obj = {
      name: data.name,
      description: data.description,
      avatar: "<string>data.avatar",
      hash: data.hash,
      type: data.type,
    };
    console.log(data);

    const response = await axios.post(
      "http://localhost:3001/chat/channel",
      obj
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};
