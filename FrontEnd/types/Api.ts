export type singInData = {
    tfaStatus: boolean
}

export type singUpData = {
    tfaStatus: any
}

export type tfaSendCodeData = {
    valid: boolean
}







//EndPoints
export const endPoints = {
    signin: "auth/local/signin",
    signup: "auth/local/signup",
    tfaSendCode: "auth/twoFactorAuth",
    tfaSwitch: "user/twoFactorAuth",
    getuser: "user/GetHero",
};