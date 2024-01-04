interface Props {
  text: string;
}

const ChatHeading = ({ text }: Props) => {
  return (
    <div className="flex w-[90px] h-[10%] justify-center">
      <h1
        className="flex w-[90%] h-fit text-[#424242] text-shadow-xl font-['Chakra_Petch'] font-[700] leading-normal not-italic 2xl_:text-[32px] xl_:text-[30px] md_:text-[25px] sm_:text-[20px] xs_:text-[15px] fold:text-[15px]"
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
