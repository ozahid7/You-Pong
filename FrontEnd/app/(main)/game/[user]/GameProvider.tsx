"use client";
import { useUser } from "@/api/getHero";
import { socketurl } from "@/const";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

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
}

export const gameContext = createContext<gameContextProps | undefined>(
	undefined
);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [gameSocket, setGameSocket] = useState<Socket>(null);
	const [gameData, setGameData] = useState<Info>();
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		if (gameSocket && gameSocket.listeners("render").length === 0) {
			gameSocket.on("render", (obj: Info) => {
				console.log("from render event", obj);
				setGameData(obj);
			});
		}
	}, [gameSocket]);

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
