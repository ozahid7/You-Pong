interface Props {
	text: string,
}

const ChatHeading = ({text} : Props) => {
  return (
    <div className="flex w-full h-[10%] justify-center">
      <h1
        className="flex w-[90%] h-fit text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[32px] xs:text-[25px] font-[700] leading-normal not-italic"
        style={{
          textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {text}
      </h1>
    </div>
  );
};

export default ChatHeading;
