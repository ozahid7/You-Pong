"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface gameContextProps {
	gameSocket: Socket;
	setGameSocket: any;
	gameData: Info;
	setGameData: any;
	submit: boolean;
	setSubmit: any;
}

export interface ball {
	x: number;
	y: number;
	speed: number;
	radius: number;
	color: string;
	dx: number;
	dy: number;
}

export interface player {
	x: number;
	y: number;
	score: number;
	width: number;
	height: number;
	color: string;
}

export interface opponent {
	x: number;
	y: number;
	score: number;
	width: number;
	height: number;
	color: string;
}

export interface fieald {
	width: number;
	height: number;
}

export interface Info {
	ball: ball;
	player: player;
	opponent: opponent;
	fieald: fieald;
	id_match: string;
	id_opponent: string;
	id_player: string;
}

export const gameContext = createContext<gameContextProps | undefined>(
	undefined
);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [gameSocket, setGameSocket] = useState<Socket>(null);
	const [gameData, setGameData] = useState<Info>();
	const [submit, setSubmit] = useState(false);

	return (
		<gameContext.Provider
			value={{
				gameSocket,
				setGameSocket,
				gameData,
				setGameData,
				submit,
				setSubmit,
			}}
		>
			{children}
		</gameContext.Provider>
	);
};

export const useGameContext = () => {
	return useContext(gameContext);
};

export default GameProvider;
