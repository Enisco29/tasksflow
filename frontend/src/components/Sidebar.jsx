import { useEffect, useState } from "react";
import {
  LINK_CLASSES,
  menuItems,
  PRODUCTIVITY_CARD,
  SIDEBAR_CLASSES,
  TIP_CARD,
} from "../assets/dummy";
import { Lightbulb, Menu, Sparkles, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ user, tasks }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalTasks = tasks?.length || 0;
  const completedTask = tasks?.filter((t) => t.completed).length || 0;
  const productivity =
    totalTasks > 0 ? Math.round((completedTask / totalTasks) * 100) : 0;

  const username = user?.name || "User";

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const renderMenuItems = (isMobile = false) => (
    <ul className="space-y-2">
      {menuItems.map(({ text, path, icon }) => (
        <li key={text}>
          <NavLink
            to={path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              [
                LINK_CLASSES.base,
                isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
                isMobile ? "justify-start" : "lg:justify-start",
              ].join(" ")
            }
          >
            <span className={LINK_CLASSES.icon}>{icon}</span>
            <span
              className={`${isMobile ? "block" : "hidden lg:block"} ${
                LINK_CLASSES.text
              }`}
            >
              {text}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      {/**Desktop */}
      <div className={SIDEBAR_CLASSES.desktop}>
        <div className="p-5 border-b border-purple-100 lg:block hidden">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold pl-4 text-gray-800 capitalize">
                Hey, {username}👋
              </h2>
              <p className="text-sm text-purple-500 font-medium flex gap-1">
                <Sparkles className="w-3 h-3 mt-1.5" />
                Let's crush some tasks!!
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          <div className={PRODUCTIVITY_CARD.container}>
            <div className={PRODUCTIVITY_CARD.header}>
              <div className={`${PRODUCTIVITY_CARD.label} max-lg:hidden`}>
                PRODUCTIVITY
              </div>
              <span className={`${PRODUCTIVITY_CARD.badge} max-lg:px-1`}>
                {productivity}%
              </span>
            </div>

            <div className={PRODUCTIVITY_CARD.barBg}>
              <div
                className={PRODUCTIVITY_CARD.barFg}
                style={{ width: `${productivity}%` }}
              ></div>
            </div>
          </div>
          {renderMenuItems()}

          <div className="mt-auto pt-6 lg:block hidden">
            <div className={TIP_CARD.container}>
              <div className="flex items-center gap-2">
                <div className={`${TIP_CARD.iconWrapper} -mt-16`}>
                  <Lightbulb className="w-5 h-5 text-purple-600 " />
                </div>

                <div>
                  <h3 className={TIP_CARD.title}>Pro Tip</h3>
                  <p className={TIP_CARD.text}>
                    Use keyboard shortcuts to boost productivity
                  </p>
                  <a
                    href="http://devenny.vercel.app"
                    target="_blank"
                    className="block mt-2 text-sm text-purple-500 hover:underline"
                  >
                    Visit DevEnny Digital Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Mobile menu */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className={SIDEBAR_CLASSES.mobileButton}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
      {/**Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className={SIDEBAR_CLASSES.mobileDrawerBackdrop}
            onClick={() => setMobileOpen(false)}
          >
            <div
              className={SIDEBAR_CLASSES.mobileDrawer}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-bold text-purple-600 ">Menu</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-purple-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-lg mt-5 font-bold pl-4 text-gray-800 capitalize">
                  Hey, {username}👋
                </h2>
                <p className="text-sm text-purple-500 font-medium flex gap-1">
                  <Sparkles className="w-3 h-3 mt-1.5" />
                  Let's crush some tasks!!
                </p>
              </div>

              {renderMenuItems(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
