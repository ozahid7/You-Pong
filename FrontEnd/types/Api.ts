export type singInData = {
    tfaStatus: boolean;
};

export type singUpData = {
    tfaStatus: any;
};

export type tfaSendCodeData = {
    valid: boolean;
};

export type userInfo = {
    achievements: [];
    history:  [{}];
    level: number;
    loses: number;
    rank: string;
    tfaStatus: boolean;
    username: string;
    wins: number;
    avatar: string;
};
export type userData = {
    userInfo: userInfo
};

//EndPoints
export const endPoints = {
    signin: "auth/local/signin",
    signup: "auth/local/signup",
    tfaSendCode: "auth/twoFactorAuth",
    tfaSwitch: "user/twoFactorAuth",
    getuser: "user/GetHero",
};
