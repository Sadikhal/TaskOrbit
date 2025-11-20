import { Link } from "react-router-dom";
import React from "react";
import { useAuthActions, useAuthState } from "../../redux/hooks/authHooks";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { menuItems } from "../../lib/menuItems";

const SideBar = ({ open }) => {
  const { authLogout } = useAuthActions();
  const { user } = useAuthState();

// logout handling 
  const handleLogout = async () => {
    try {
      await authLogout().unwrap();
      toast.success("Logged out");
    } catch (err) {
      toast.error(err || "Logout failed");
    }
  };

  return (
    <div
      className={cn(
        "fixed h-[calc(100vh-64px)] lg:top-1 top-16 left-0 lg:w-44",
        open ? "w-full" : "w-12 md:w-16"
      )}
    >
      <ScrollArea className="h-full pt-4 px-2">
          <div className="flex flex-col gap-2 px-3">
            <div className="hidden lg:block font-poppins text-lg text-gray-600 font-bold my-3">
              Dashboard
            </div>
             <div className="text-xs text-slate-400 hidden lg:block">Manage your tasks</div>
             {/* sidebar menu  if authenticated*/}
            {menuItems.map((item, index) => {
              return item.href === "logout" ? (
                user ? (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className={cn(
                      "flex items-center cursor-pointer gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight text-sm w-full",
                      open ? "justify-start" : "justify-center lg:justify-start"
                    )}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className="min-h-5 h-5 min-w-5 w-5"
                    />
                    <span className={cn(!open && "hidden lg:block")}>
                      Logout
                    </span>
                  </button>
                ) : (
                  //if not authenticated
                  <Link
                    key={index}
                    to="/auth/login"
                    className={cn(
                      "flex items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight text-sm",
                      open ? "justify-start" : "justify-center lg:justify-start"
                    )}
                  >
                    <img
                      src="/images/login.png"
                      alt=""
                      className="min-h-5 h-5 min-w-5 w-5"
                    />
                    <span className={cn(!open && "hidden lg:block")}>
                      Login
                    </span>
                  </Link>
                )
              ) : (
                <Link
                  to={item.href}
                  key={index}
                  className={cn(
                    "flex items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight text-sm",
                    open ? "justify-start" : "justify-center lg:justify-start"
                  )}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="min-h-5 h-5 min-w-5 w-5"
                  />
                  <span className={cn(!open && "hidden lg:block")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
      </ScrollArea>
    </div>
  );
};

export default SideBar;
