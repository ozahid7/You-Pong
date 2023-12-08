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

export type userInfo = {
    achievements: [];
    history: [{}];
    level: number;
    loses: number;
    rank: string;
    tfaStatus: boolean;
    username: string;
    wins: number;
    avatar: string;
    isIntra: boolean;
};
export type userData = {
    userInfo: userInfo;
};

//EndPoints
export const endPoints = {
    signin: "auth/local/signin",
    getTfaStatus: "auth/getTfaStatus",
    signup: "auth/local/signup",
    tfaSendCode: "auth/twoFactorAuth",
    userTfaSendCode: "user/tfa/switch",
    tfaSwitch: "user/twoFactorAuth",
    getuser: "user/GetHero",
    getFriend: "friend/sort",
    getFile: 'upload',
};

//friends
type user = {
    avatar: string;
    username: string;
    status: string;
}


export type FriendArr = {
    accepted: user[];
    blocked: user[];
    pending: user[];
};