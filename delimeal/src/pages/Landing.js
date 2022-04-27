import React from "react";
import LoggedView from "../components/LoggedView";

const Landing = () => {
  const [user] = React.useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  return (
    <div className="flex justify-center">
      {!user ? (
        <div className="font-serif py-32 text-center">
          <p className="text-5xl whitespace-normal pb-4">
            Welcome to the best restaurant in the city.
          </p>
          <p className="text-4xl whitespace-normal">
            Browse our menu and see what others think.
          </p>
        </div>
      ) : (
        <LoggedView />
      )}
    </div>
  );
};

export default Landing;