import { useEffect } from "react";

const GoogleRedirect = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const responseData = {
      code,
      source: "google",
    };

    window?.opener?.postMessage(responseData, "*");
    window?.close();
  }, []);

  return <div className="min-h-screen w-full bg-[#fff]"></div>;
};

export default GoogleRedirect;