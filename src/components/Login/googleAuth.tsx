import google from "/public/assets//svg/google-icon-logo.svg";
import { initializeOauthAPI } from "../../services/api";
import { useAppDispatch } from "../../Redux/hooks";
import { oAuthAsync } from "../../Redux/features/userSlice";

export const GoogleAuthentication = ({ setError, setShowModal }: { 
    setError: React.Dispatch<React.SetStateAction<{
        email?: string;
        otp?: string;
        general?: string;
      }>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
 }) => {
  const dispatch = useAppDispatch();

  const handleMessage = async (event: any) => {
    if (
      event.origin === import.meta.env.VITE_CLIENT_URL &&
      event?.data?.source === "google"
    ) {
      const { data } = event;
      if (!data?.code) return;

      try {
        await dispatch(oAuthAsync(data?.code)).unwrap();
        setShowModal(true);
      } catch (err: any) {
        setError({ general: 'Authentication failed' });
      }
    }
  };

    const oAuth = async () => {
        try {
            const url = await initializeOauthAPI();
            console.log(url);
            const width =
                window.screen.width / 3 < 300 ? 300 : window.screen.width / 3;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - 500) / 2;
            const options = `width = ${ width }, height = ${ 500}, scrollbars = yes, left = ${ left }, top = ${ top }`;

            window.addEventListener("message", handleMessage);
            window.open(url, "_blank", options);
        } catch (error) {
            window.removeEventListener("message", handleMessage);
            window.close();
        }
    };

  return (
    <button
      onClick={oAuth}
      type="button"
      className="cursor-pointer flex justify-center items-center font-medium  w-fit border-[3px] border-[#abacb0] p-[12px] rounded-[22px]"
    >
      <img className="w-[32px]" src={google} alt="Google logo" />
    </button>
  );
};
