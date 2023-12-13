import { Channel } from "@/types";
import axios from "axios";
import { attachReactRefresh } from "next/dist/build/webpack-config";
// import fs from "fs";
// import { setDataObj } from "@/components/tools/GroupsModal";

axios.defaults.withCredentials = true;

export const userChannels = async () => {
  try {
    const response = await axios.get("http://localhost:4000/user/channels");
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// http://localhost:4000/chat/channel/join/name
export const joinChannel = async (name: string, password: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/join?name=${name}&password=${password}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// http://localhost:4000/chat/channel/leave/name
export const leaveChannel = async (name: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/leave?name=${name}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getChannels = async () => {
  try {
    const response = await axios.get("http://localhost:4000/chat/channel");
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getChannel = async (name: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/chat/channel/${name}`);
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
      "http://localhost:4000/chat/channel",
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
      `http://localhost:4000/chat/channel/update?name=${name}`,
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
      "http://localhost:4000/upload",
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
    const response = await axios.get(`http://localhost:4000/file/${pathname}`);

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getMembers = async () => {
  try {
    const response = await axios.get("http://localhost:4000/user");
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getMainUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/user/GetHero");
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};
