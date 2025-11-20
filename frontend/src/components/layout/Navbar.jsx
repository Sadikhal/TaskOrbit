import { Link } from "react-router-dom";
import { useAuthState } from "../../redux/hooks/authHooks";

const Navbar = () => {
  const { user } = useAuthState();

  return (
    <div className="flex items-center justify-between p-4 bg-white ml-2 rounded-lg mb-3 md:gap-4 lg:gap-16 md:px-6">
      {/* logo in left side*/}
      <Link to="/" className="h-full w-full">
        <img
          src="/images/logo.png"
          className="w-20 h-20 rounded-full object-contain"
          alt="logo"
        />
      </Link>
     
     {/* user profile in right side  */}
      <div className="flex items-center gap-6 justify-end w-full lg:px-8">
        {user && (
          <div
            className="p-2 flex flex-row gap-3 items-center border border-slate-200 rounded-full hover:shadow-xl cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-xs font-medium">{user.name}</span>
            </div>
            <img
              src="/images/avatar.png"
              alt="user"
              className="rounded-full object-cover w-7 h-7"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
