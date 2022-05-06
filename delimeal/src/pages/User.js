import React from "react";
import axios from "axios";
import UserItem from "../components/UserItem";

const User = () => {
  const [users, setUsers] = React.useState([]);

  const SortArray = (x, y) => {
    return x.role.localeCompare(y.role);
  };

  const getUsers = async () => {
    await axios
      .get("/user/get-all/")
      .then((res) => {
        setUsers(res.data.sort(SortArray));
      })
      .catch((err) => {
        console.log("Error getting users list. ", err);
      });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <nav className="h-full overflow-y-auto" aria-label="Directory">
      {users.length > 0 ? (
        users.map(
          (userItem, userIndx) =>
            userItem.name && (
              <UserItem
                userItem={userItem}
                userIndx={userIndx}
                key={userIndx}
              />
            )
        )
      ) : (
        <div>No users</div>
      )}
    </nav>
  );
};

export default User;