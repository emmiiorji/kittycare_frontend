import { LogBtnByProps } from "../../utils/types";

const LogBtnBy = ({ src, alt, className, onClick }: LogBtnByProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-[48px] sm:w-[56px] h-[48px] sm:h-[56px] p-3 flex-col items-center justify-center border-2 border-[#898B90] rounded-[17.5px] sm:rounded-[20px] cursor-pointer ${className}`}
    >
      <div className="w-[31px] h-[31px]">
        <img className="w-full h-full" src={src} alt={alt} />
      </div>
    </div>
  );
};

export default LogBtnBy;
