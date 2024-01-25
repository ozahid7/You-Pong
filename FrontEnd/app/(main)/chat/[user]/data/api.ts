import { Channel } from "@/types";
import axios from "axios";

axios.defaults.withCredentials = true;

export const userChannels = async () => {
  try {
    const response = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/user/channels`);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getUsers = async (id_channel: string) => {
  try {
    const response = await axios.get(
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/users?id_channel=${id_channel}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/join/name
export const joinChannel = async (id_channel: string, password: string) => {
  try {
    const response = await axios.put(
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/join?id_channel=${id_channel}&password=${password}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/join/name
export const joinPrivate = async (id_channel: string, id_friend: string) => {
  try {
    const response = await axios.put(
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/joinPrivate/?id_channel=${id_channel}&id_friend=${id_friend}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

// http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/leave/name
export const leaveChannel = async (id_channel: string) => {
  try {
    const response = await axios.put(
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/leave/?id_channel=${id_channel}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/mute/?id_channel=${id_channel}&id_friend=${id_friend}&time=${time}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/unmute/?id_channel=${id_channel}&id_friend=${id_friend}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/kick/?id_channel=${id_channel}&id_friend=${id_friend}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/ban/?id_channel=${id_channel}&id_friend=${id_friend}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/unban/?id_channel=${id_channel}&id_friend=${id_friend}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/admin/?id_channel=${id_channel}&id_friend=${id_friend}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/member/?id_channel=${id_channel}&id_friend=${id_friend}`
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
    const response = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel`);
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/myChannel/${id_channel}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/members/?id_channel=${id_channel}`
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel`,
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/channel/update/?id_channel=${id_channel}`,
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/upload`,
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
    const response = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/file/${pathname}`);

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

export const getMainUser = async () => {
  try {
    const response = await axios.get(`http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/user/GetHero`);
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
      `http://${process.env.NEXT_PUBLIC_HOST_IP}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/chat/message/?id_channel=${id_channel}`
    );
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
};

////////////////////////////////////////////////////////////

export const fetchData_userChannels_Direct = async () => {
  const result = await userChannels();
  return result.Object.direct;
};

export const fetchData_userChannels_Channel = async () => {
  const result = await userChannels();
  return result.Object.groups;
};

export const fetchData_users = async (id_channel: string) => {
  const result = await getUsers(id_channel);
  return result.Object;
};

export const fetchData_getMainUser = async () => {
  const result = await getMainUser();
  return result.userInfo;
};

export const fetchData_getMembers = async (id_channel: string) => {
  const result = await getMembers(id_channel);
  return result.Object;
};

export const fetchData_Messages = async (id_channel: string) => {
  const result = await getMessages(id_channel);
  return result.Object;
};

export const fetchData_Channel = async (id_channel: string) => {
  const result = await getChannel(id_channel);
  return result.Object;
};

export const fetchData_getChannels = async () => {
  const result = await getChannels();
  return result.Object;
};
