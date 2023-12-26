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
	achievement: { title: string; description: string };
	is_owned: boolean;
}

export type achievementReturn = {
	message: string;
	object: Achievement[];
};

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
	uid: string;
	user_relation: 'PENDING' | 'ACCEPTED' | 'NONE';
	tfaStatus: boolean;
	username: string;
	createdAt: string;
	updatedAt: string;
	status: string;
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
	user_relation: 'PENDING' | 'ACCEPTED' | 'NONE';
	rank: number;
	wins: number;
	loses: number;
	uid: string;
	status: string;
	tfaStatus: boolean;
	achievements: Achievement[];
	matchs: match[];
	isIntra: boolean;
	createdAt: string;
	updatedAt: string;
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
	getAchiv: "/achievement",
	updateInfo: "user/update",
};

//friends
export type user = {
	avatar: string;
	username: string;
	id_user: string;
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

export type searchBarReturn = {
	message: string;
	Object: searchUsers;
};

export const friendsEndPoint = {
	block: "friend/block",
	accept: "friend/accept",
	decline: "friend/refuse",
	search: "friend/search",
	unblock: "friend/unblock",
	add: "friend",
};

export const chatEndPoint = {
	direct: "chat/channel/direct",
};
