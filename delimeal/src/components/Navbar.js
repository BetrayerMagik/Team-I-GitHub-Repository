import React from "react";
import { Link } from "react-router-dom";

const pages = [
  {
    title: "Home",
    directory: "/",
  },
  {
    title: "Biddings",
    directory: "/order",
  },
];
const settings = [
  {
    title: "Sign in",
    directory: "/sign-in",
  },
  {
    title: "Sign up",
    directory: "/sign-up",
  },
];

const Navbar = () => {
  const [user] = React.useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  const logoutHandler = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    //   outer box
    <div className="sticky top-0 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-between px-4">
      {/* Far left */}
      <div className="flex gap-x-4">
        <Link to="/">
          <button type="button" className="font-extrabold text-xl">
            IMAGE
          </button>
        </Link>
        {pages.map((page) => (
          <Link to={page.directory} key={page.title}>
            <button type="button" className="text-lg">
              {page.title}
            </button>
          </Link>
        ))}
        {/* Ternary statement to check if the signed in user is manager or not */}
        {user?.role === "manager" && (
          <Link to="/user" key="users">
            <button type="button" className="text-lg">
              Users
            </button>
          </Link>
        )}
      </div>
      {/* Far right */}
      <div className="flex gap-x-4">
        {!window.localStorage.getItem("user") ? (
          settings.map((page) => (
            <Link to={page.directory} key={page.title}>
              <button type="button" className="text-lg">
                {page.title}
              </button>
            </Link>
          ))
        ) : (
          <div className="flex gap-x-6">
            <Link to="/">
              <button
                type="button"
                className="btn btn-light"
                onClick={logoutHandler}
              >
                Log Out
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
