import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Settings, Zap } from "lucide-react";
import { useRef, useState } from "react";

const Navbar = ({ user = {}, onLogout }) => {
  const navigate = useNavigate();

  const menuref = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = async () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 fonts-sans">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        {/**Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          {/**Logo */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
            <Zap className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -middle-1 w-3 h-3 bg-white rounded-full shadow-md animate-ping " />
          </div>
          {/**Brand Name */}
          <span className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            Taskflow
          </span>
        </div>

        {/**Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 text-gray-600 hover:text-purple-500 transition-colors duration-300 hover:bg-purple-50 rounded-full"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/**User dropdown */}
          <div ref={menuref} className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-200"
            >
              <div className="relative">
                {user.avater ? (
                  <img
                    src={user.avater}
                    alt="avater"
                    className="w-9 h-9 rounded-full shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 text-white font-semibold shadow-md">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  menuOpen ? "rotate-100" : ""
                }`}
              />
            </button>
            {menuOpen && (
              <ul className="absolute top-14 right-0 w-56 bg-white rounded-lg shadow-xl border-purple-100 z-50 overflow-hidden animate-fadeIn">
                <li className="p-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-purple-50 rounded-lg text-sm text-gray-700 transition-colors flex items-center gap-2 group"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 text-gray-700" />
                    Profile Settings
                  </button>
                </li>

                <li className="p-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-4 h-4 ml-1" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
