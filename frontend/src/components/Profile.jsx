import { ToastContainer, toast } from "react-toastify";
import { BACK_BUTTON } from "../assets/dummy";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const API_URL = "http://localhost:4000";

const Profile = ({ setCurrentUser, onLogout }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => navigate(-1)} className={BACK_BUTTON}>
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {profile.name ? profile.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Account Settings
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your profile and security settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
