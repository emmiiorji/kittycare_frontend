import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/features/userSlice";
import { useAppDispatch } from "../Redux/hooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[700px] flex flex-col items-center justify-center gap-3">
      <a href="/login" className="text-xl">Login</a>
      <a href="/signup" className="text-xl">Signup</a>
      <a href="/priceselection" className="text-xl">Price Selection</a>
      <a href="/paymentmethod" className="text-xl">Payment Method</a>
      <a href="/paymentdetail" className="text-xl">Payment Detail</a>
      <a href="/cat-assistant" className="text-xl">Chatroom</a>
      <a href="/cat-profile" className="text-xl">Profile</a>
      <a href="/progress" className="text-xl">Go to Progress</a>
      <span className="text-xl" onClick={()=>{dispatch(logout()); navigate("/login");}}>Logout</span>
    </div>
  );
};

export default Dashboard;
