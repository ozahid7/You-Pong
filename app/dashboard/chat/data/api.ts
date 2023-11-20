import { Channel } from "@/types";
import axios from "axios";
import { attachReactRefresh } from "next/dist/build/webpack-config";
// import fs from "fs";
// import { setDataObj } from "@/components/tools/GroupsModal";

export const getData = async () => {
  try {
    const response = await axios.get("http://178.62.74.69:400/chat/channel");
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
      avatar: data.avatar,
      hash: data.hash,
      type: data.type,
    };

    const response = await axios.post(
      "http://178.62.74.69:400/chat/channel",
      obj
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const putData = async (data: Channel, name: string) => {
  try {
    const obj = {
      name: data.name,
      description: data.description,
      avatar: data.avatar,
      hash: data.hash,
      type: data.type,
    };

    const response = await axios.put(
      `http://178.62.74.69:400/chat/channel/${name}`,
      obj
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const setFile = async (file: File | null) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axios.post(
      "http://178.62.74.69:400/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getFile = async (pathname: string) => {
  try {
    const response = await axios.get(
      `http://178.62.74.69:400/file/${pathname}`
    );

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};
