export type singInData = {
    tfaStatus: boolean;
};

export type singUpData = {
    tfaStatus: any;
};

export type tfaSendCodeData = {
    valid: boolean;
};

export type userData = {
    userInfo: {
        achievements: [];
        level: number;
        loses: number;
        rank: string;
        tfaStatus: boolean;
        username: string;
        wins: number;
        avatar: string;
    };
};

//EndPoints
export const endPoints = {
    signin: "auth/local/signin",
    signup: "auth/local/signup",
    tfaSendCode: "auth/twoFactorAuth",
    tfaSwitch: "user/twoFactorAuth",
    getuser: "user/GetHero",
};
