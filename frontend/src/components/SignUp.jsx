import { Icon, UserPlus } from "lucide-react";
import { useState } from "react";
import {
  BUTTONCLASSES,
  FIELDS,
  Inputwrapper,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
} from "../assets/dummy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM = { name: "", email: "", password: "" };

const SignUp = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post("/api/users/register", formData);
      if (data.success) {
        console.log("SignUp Successfully");
        setMessage({
          text: "Registration successfull!! You can now log in.",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text:
          error.response?.data?.message || "An error occured. Please try again",
        type: "error",
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">
          Join TaskFlow to manage your tasks
        </p>
      </div>
      {message.text && (
        <div
          className={
            message.type === "success" ? MESSAGE_SUCCESS : MESSAGE_ERROR
          }
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {FIELDS.map(({ name, type, placeholder, icon: Icon }) => (
          <div key={name} className={Inputwrapper}>
            <Icon className="text-purple-500 w-5 h-5 mr-2" />

            <input
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
              className="w-full focus:outline-none text-sm text-gray-700 "
              required
            />
          </div>
        ))}

        <button type="submit" className={BUTTONCLASSES} disabled={loading}>
          {loading ? (
            "Signing Up..."
          ) : (
            <>
              <UserPlus className="w-4 h-4" /> Sign Up
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={onSwitchMode}
          className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;
