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

export type UserInfo = {
    achievements: [];
    history: [{}];
    level: number;
    loses: number;
    rank: number;
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
    status: string;
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
    getFriend: "friend/sort",
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

export interface searchUsers extends Array<user> {}

export const friendsEndPoint = {
    block: "friend/block",
    accept: "friend/accept",
    decline: "friend/decline",
    search: "friend/search",
    remove: "friend/remove",
    add: "friend/send",
};
