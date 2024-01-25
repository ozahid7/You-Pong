interface Props {
  text: string;
}

const ChatHeading = ({ text }: Props) => {
  return (
    <div className="md:flex w-full hidden md:w-[90px] h-[10%] justify-center items-center mb-5">
      <h1
        className="flex w-fit md:w-[90%] h-fit text-[#424242] text-shadow-xl font-['Chakra_Petch'] font-[700] leading-normal not-italic 2xl:text-[32px] xl:text-[30px] md:text-[25px] text-[30px]"
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
