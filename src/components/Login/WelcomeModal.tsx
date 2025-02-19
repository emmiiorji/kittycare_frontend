import { useNavigate } from "react-router-dom";

export const WelcomeModal = ({
    showModal,
    setShowModal
}: {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);

    const photo = localStorage.getItem('photo') || '';
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';

    const handleNavigate = () => {
        setShowModal(false);

         // Check for subscription and redirect accordingly
        const subscriptionId = localStorage.getItem("subscriptionId");
        if (!subscriptionId || subscriptionId === "undefined") {
        navigate(`/progress?${urlParams.toString()}`);
        return;
        }

        // Check for cat profile
        const catId = localStorage.getItem("catId");
        if (!catId || catId === "undefined") {
        navigate("/progress");
        return;
        }

        // If everything exists, redirect to chat
        navigate("/cat-assistant");
    };
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#00000080] bg-opacity-50 py-[80px] left-0 top-0 w-full min-h-screen z-[5000]">
                    <div className="relative w-[95%] md:w-[40%] m-auto mt-[70px] h-[400px] bg-[#fff] rounded-lg relative overflow-y-scroll">
                        <div className="w-full flex justify-center items-center p-[12px] md:p-[24px]">
                            <h2 className="font-bold text-[24px] text-center w-full">Welcome to Kitty Care</h2>
                        </div>
                        <div className="flex flex-col gap-[20px] mt-[15px] justify-center items-center w-full">
                            <div className="flex justify-center items-center w-fit">
                                <img src={photo} className="w-[100px] h-[100px] rounded-[100%]" />
                            </div>
                            <div className="flex justify-center items-center flex-col w-full gap-[5px]">
                                <h3 className="text-center text-[16px] font-semibold">
                                    {name}
                                </h3>
                                <p className="text-center text-[16px]">
                                    {email}
                                </p>
                            </div>

                            <div className="px-[50px] w-full mt-[20px]">
                                <button
                                    onClick={() => {
                                        handleNavigate();
                                    }}
                                    type="button"
                                    className="border-0 bg-[#2563EB] py-[8px] px-[16px] rounded-[4px] text-[#ffffff] font-medium text-[0.75rem] w-full"
                                >
                                    Continue              </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};