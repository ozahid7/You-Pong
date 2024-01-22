import React, { Fragment } from "react";
import MyDialog from "../containers/MyDialog";
import game from "../../public/game_sidebar.png";
import new_game from "../../public/newgame.png";
import Image from "next/image";
import { TbLogicOr } from "react-icons/tb";
import settings from "../../public/gameSettings.png"

const HowToPlay = ({ isOpen, setIsOpen, closeModal }) => {

	return (
		<MyDialog
			isOpen={isOpen}
			closemodal={() => {
				setIsOpen(false);
			}}
			withCorner={false}
			withClose={false}
			customClass="absolute h-[80%] w-[90%] sm:w-[66%] max-w-[700px]"
		>
			<Fragment>
				<h1 className=" flex justify-center w-full items-center text-palette-dark font-body font-[700] text-[45px]">
					How To Play
				</h1>
				<div className="flex gap-5 flex-col">
					<div className="flex flex-col gap-3">
						<h2 className="flex justify-center items-center font-nunito font-[400] text-[20px]">
							Welcome to the classic game of Pong !
						</h2>
						<h3 className="flex text-palette-orange hover:text-palette-green justify-center items-center font-nunito font-[500] text-[20px]">
							Here's how you can play ↴
						</h3>
					</div>
					<div className="flex gap-4 flex-col">
						<div className="flex flex-row items-center justify-between">
							<p className="font-number text-[30px] text-palette-orange w-[90px] self-start">1 - </p>
							<p className="font-nunito text-[26px] break-words">There's only two ways you can create a match with another user, the <span className="text-palette-orange hover:text-palette-green">First</span> one is clicking on :</p>
						</div>
						<div className="flex flex-row gap-5 items-center w-[100%] justify-evenly">
							<Image src={game} width={200} height={200} className="" alt="game" />
							<p className="font-nunito text-[40px] font-[500] text-palette-orange hover:text-palette-green"><TbLogicOr /></p>
							<Image src={new_game} width={250} height={100} className="h-[100px] flex" alt="game" />
						</div>
						<div className="flex flex-row items-center justify-between ">
							<p className="font-number text-[30px] text-palette-orange w-[90px] self-start">2 - </p>
							<p className="font-nunito text-[26px] break-words">After clicking on one of the buttons, you will be redirected to the <span className="text-palette-orange hover:text-palette-green">Game Options</span>, choose your options carefully, then click <span className="text-palette-orange hover:text-palette-green font-body">PLAY</span></p>
						</div>
						<div className="flex w-[100%] items-center justify-center debug">
							<Image src={settings} width={300} height={300} className="w-[90%] h-full " alt="game" />
						</div>
					</div>
				</div>
			</Fragment>
		</MyDialog>
	);
};

export default HowToPlay;