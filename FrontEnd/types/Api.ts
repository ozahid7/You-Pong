export type singInData = {
  tfaStatus: boolean;
};

export type singUpData = {
  tfaStatus: any;
};

export type tfaSendCodeData = {
  valid: boolean;
};

export type tfaSwitch = boolean;

export type tfaEnable = {
  img: string;
};

export interface Achievement {
  title: string;
  description: string;
  isOwned: boolean;
}

export interface match {
  avatar: string;
  user: string;
  wins: string | "0";
  loses: string | "0";
}

export type UserInfo = {
  achievements: Achievement[];
  matchs: match[];
  level: number;
  loses: number;
  rank: number;
  isFirstTime: boolean;
  tfaStatus: boolean;
  username: string;
  wins: number;
  avatar: string;
  isIntra: boolean;
};

export type UserData = {
  userInfo: UserInfo;
};

export type UserToShow = {
  avatar: string;
  username: string;
  level: number;
  rank: number;
  wins: number;
  losts: number;
  ispending: boolean;
  status: string;
  achievements: Achievement[];
  matchs: match[];
  isIntra: boolean;
};

//EndPoints
export const endPoints = {
  signin: "auth/local/signin",
  getTfaStatus: "auth/getTfaStatus",
  signup: "auth/local/signup",
  tfaSendCode: "auth/twoFactorAuth",
  userTfaSendCode: "user/tfa/switch",
  tfaSwitch: "user/twoFactorAuth",
  gethero: "user/GetHero",
  getuser: "user/findUser",
  getFriend: "friend",
  getFile: "upload",
  updateInfo: "update",
};

//friends
export type user = {
  avatar: string;
  username: string;
  status: string;
};
export type FriendArr = {
  accepted: user[];
  blocked: user[];
  pending: user[];
};

export type FriendsReturn = {
  message: string;
  Object: FriendArr;
};

export interface searchUsers extends Array<user> {}

export type searchBarReturn  {

}

export const friendsEndPoint = {
  block: "friend/block",
  accept: "friend/accept",
  decline: "friend/refuse",
  search: "friend/search",
  unblock: "friend/unblock",
  add: "friend",
};


export const chatEndPoint = {
  direct: "chat/channel/direct"
}
