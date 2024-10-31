import { useState } from "react";
import { useAppDispatch } from "../../../Redux/hooks";
import { addMessage, sendChatMessageAsync } from "../../../Redux/features/chatSlice";
import { Message } from "../../../utils/types";
import RiveAnimation from "../../RiveAnimation";
import { HiOutlineArrowRight } from "react-icons/hi2";
import React from "react";

interface InputFieldProps {
  onTyping: boolean;
  messageList: Message[];
}

const InputField = ({ onTyping, messageList }: InputFieldProps) => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      content: input,
      role: "user"
    };

    dispatch(addMessage(newMessage));

    const cats = localStorage.getItem('cats');
    const catId = cats ? JSON.parse(cats)[0].id : "";

    const messagesForApi = [...messageList, newMessage].map(({ role, content }) => ({ role, content }));

    dispatch(sendChatMessageAsync({
      catId: catId,
      messages: messagesForApi as Message[]
    }));

    setInput("");
  };

  return (
    <div className="w-full pt-7">
      <div className="w-full flex items-center relative">
        <div className={`h-20 ${onTyping ? "w-20" : "w-0"} absolute -top-[80%]`}>
          <RiveAnimation src="riv/V2/Typing_animation.riv" />
        </div>
        <input
          aria-label="Chat message input"
          role="textbox"
          className="w-full text-[14px] sm:text-[16px] p-[22px] sm:p-6 border-2 rounded-[20px] bg-[#F3EDE8] text-opacity-30 font-semibold focus:outline-none"
          placeholder="Type your question... Meow it out!"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          value={input}
        />
        <button
          aria-label="Send message"
          className="w-[50px] h-[38px] sm:w-20 sm:h-14 text-white bg-blue-600 hover:bg-blue-400 active:bg-purple-700 outline-none border-none absolute right-3 border-2 rounded-md sm:rounded-xl flex justify-center items-center"
          onClick={handleSubmit}
        >
          <HiOutlineArrowRight className="text-md sm:text-2xl" />
        </button>
      </div>
      <div className="w-[210px] sm:w-full m-auto text-center font-bold sm:font-semibold text-[14px] sm:text-lg mt-4">
        Chat with a vet 24/7 for advice and consultations
      </div>
    </div>
  );
};

export default InputField;
