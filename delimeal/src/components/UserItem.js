import React from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const UserItem = ({ userItem, userIndx }) => {
  const [money, setMoney] = React.useState(0);

  //   Function to make API call which allows the Manager to adjust user's balance
  const balanceHandler = async (userItm) => {
    await axios
      .put("/user/put-balance/", 
    //   Request . body
    // passing key id: is holding selected user's objectId
    // passing key money: is holding the state value the manager changed
      {
        id: userItm._id,
        money: money,
      })
    //   .then is the promise that happens when the api call is successful
      .then((res) => {
        console.log("User has been modified.");
        alert("User Balance has been modified.")
        // window.location.reload(false);
      })
    //   .catch is the promise that happens when the api call has failed
      .catch((err) => {
        alert("Issue processing balance informaiton. ", err);
      });
  };
  const blacklistHandler = async (userItm) => {
    console.log("userItm.blacklisted ", !userItm.blacklisted);
    await axios
      .put("/user/blacklist/", 
    //   request.body, passing key id to hold the selected user's objectId
    // and passing key blacklist to hold the selected user's !blacklist variable
      {
        id: userItm._id,
        blacklist: !userItm.blacklisted,
      })
      .then((res) => {
        console.log("User has been modified.");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Issue modifying blacklist informaiton. ", err);
      });
  };
  const registerHandler = async (userItm) => {
    await axios
      .put("/user/register/", {
        id: userItm._id,
        register: !userItm.registered,
      })
      .then((res) => {
        console.log("User has been modified.");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Issue modifying register informaiton. ", err);
      });
  };
  return (
    <div key={userIndx} className="relative">
      <ul className="relative z-0 divide-y divide-black">
        <li key={userItem.name} className="bg-white border">
          <div className="relative px-6 py-5 flex items-center space-x-3">
            <div className="flex-1 min-w-0">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              <div className="flex flex-row gap-x-4">
                <p className="text-sm font-medium text-gray-900">
                  {userItem.name}
                </p>
                {!userItem?.blacklisted ? (
                  <span
                    className={`text-xs text-white rounded-full p-1 ${
                      userItem.registered ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {userItem.registered ? "Registered" : "Deregistered"}
                  </span>
                ) : (
                  <span className="text-xs text-white rounded-full p-1 bg-gray-600">
                    Blacklisted
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">{userItem.email}</p>
              <p className="text-sm text-gray-500 truncate">{userItem.role}</p>
              {/* </a> */}
            </div>
            <div className="flex-1 min-w-0">
              {/* <Stack spacing={2} direction="row"> */}
              <div className="flex flex-row gap-x-3">
                <input
                  id="money"
                  name="money"
                  type="number"
                  min={0}
                  step={0.5}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Amount to add"
                  onChange={(event) => {
                    setMoney(event.target.value);
                  }}
                />
                <Button
                  variant="contained"
                //   className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 text-xs"
                  onClick={() => balanceHandler(userItem)}
                >
                Adjust balance
                </Button>
                {/* <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 text-xs"
                  onClick={() => balanceHandler(userItem)}
                >
                  Adjust balance
                </button> */}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <Button
                variant="outlined"
                color="error"
                onClick={() => blacklistHandler(userItem)}
              >
                {userItem?.blacklisted ? "unblacklist" : "blacklist"}
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              <Button
                variant="contained"
                color="success"
                // variant="contained"
                onClick={() => registerHandler(userItem)}
              >
                {userItem?.registered ? "unregister" : "register"}
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserItem;
