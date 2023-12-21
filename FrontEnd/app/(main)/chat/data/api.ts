import { Channel } from "@/types";
import axios from "axios";
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
export const joinChannel = async (id_channel: string, password: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/join?id_channel=${id_channel}&password=${password}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// http://localhost:4000/chat/channel/leave/name
export const leaveChannel = async (id_channel: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/leave/?id_channel=${id_channel}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const MuteMember = async (
  id_channel: string | undefined,
  id_friend: string,
  time: number
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/mute/?id_channel=${id_channel}&id_friend=${id_friend}&time=${time}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const UnMuteMember = async (
  id_channel: string | undefined,
  id_friend: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/unmute/?id_channel=${id_channel}&id_friend=${id_friend}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const KickMember = async (
  id_channel: string | undefined,
  id_friend: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/kick/?id_channel=${id_channel}&id_friend=${id_friend}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const BanMember = async (
  id_channel: string | undefined,
  id_friend: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/ban/?id_channel=${id_channel}&id_friend=${id_friend}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const UnBanMember = async (
  id_channel: string | undefined,
  id_friend: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/unban/?id_channel=${id_channel}&id_friend=${id_friend}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const SetAdmin = async (
  id_channel: string | undefined,
  id_friend: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/admin/?id_channel=${id_channel}&id_friend=${id_friend}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const SetMember = async (
  id_channel: string | undefined,
  id_friend: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/chat/channel/member/?id_channel=${id_channel}&id_friend=${id_friend}`
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

export const getChannel = async (id_channel: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/chat/channel/myChannel/${id_channel}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// return object, USERS+USER_ROLE+STATUS
export const getMembers = async (id_channel: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/chat/channel/members/?id_channel=${id_channel}`
    );
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

export const putData = async (data: Channel, id_channel: string) => {
  try {
    const obj = {
      name: data.name,
      description: data.description,
      avatar: data.avatar,
      hash: data.hash,
      type: data.type,
    };

    const response = await axios.put(
      `http://localhost:4000/chat/channel/update/?id_channel=${id_channel}`,
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
    if (file !== null) formData.append("avatar", file);

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

export const getMessages = async (id_channel: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/chat/message/?id_channel=${id_channel}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};
