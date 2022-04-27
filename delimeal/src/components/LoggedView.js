import React, { Fragment } from "react";
import axios from "axios";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import OrderItem from "./OrderItem";

const LoggedView = () => {
  const [money, setMoney] = React.useState(0);
  const [user, setUser] = React.useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  //   const []
  const [topDishes, setTopDishes] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  //   console.log(user?.orders);
  const reviewAvg = (arr) => {
    if (arr.length < 1) {
      return 0;
    }
    let total = 0;
    let len = arr.length;
    arr.forEach((item) => {
      total += item.rating;
    });
    return parseFloat(total / len).toFixed(2);
  };
  const getTopDishes = async () => {
    await axios
      .get("/menu/get-all/")
      .then((res) => {
        // console.log("got dishes. ", res.data);
        let aux_arr = [];
        res.data.forEach((item) => {
          aux_arr.push({
            ...item,
            date: new Date(item.date).toLocaleDateString(),
            // time: new Date(item.date).toLocaleTimeString(),
            review: parseFloat(reviewAvg(item.reviews)),
          });
          //   console.log("dsa -> ", reviewAvg(item.reviews));
        });
        setTopDishes(
          aux_arr
            .sort((a, b) => parseFloat(b.review) - parseFloat(a.review))
            .slice(0, 3)
        );
      })
      .catch((err) => {
        console.log("error getting dishes. ", err);
      });
  };

  React.useEffect(() => {
    getTopDishes();
    getOrders();
  }, []);
  const getOrders = async () => {
    await axios
      .get("/order/get-users/?email=" + user.email)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error getting user's orders. ", err);
      });
  };
  const balanceHandler = async () => {
    await axios
      .put("/user/put-balance/", {
        id: user._id,
        money: parseFloat(user.money) + parseFloat(money),
      })
      .then((res) => {
        alert(money + " has been added to balance. ");
        getUser();
      })
      .catch((err) => {
        alert("Issue processing balance informaiton. ", err);
      });
  };

  const getUser = async () => {
    // console.log("{ email: user.email } : ", { email: user.email });
    await axios
      .post("/user/get-user/", { email: user.email })
      .then((res) => {
        console.log("res -> ", res);
        setUser(res.data);
        window.localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Error getting user. ", err);
      });
    window.location.reload(false);
  };

  return (
    <div>
      <main className="py-10">
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm font-medium text-gray-500">
                Balance: $ {parseFloat(user.money).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <div>
              <label htmlFor="money" className="sr-only">
                Money
              </label>
              <input
                id="money"
                name="money"
                type="number"
                min={0}
                step={0.5}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Amount to add"
                onChange={(event) => setMoney(event.target.value)}
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              onClick={balanceHandler}
            >
              Add to balance
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Account Information
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.role}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.email}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Warnings
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.warning}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* History */}
            <section aria-labelledby="notes-title">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="notes-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      History
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6 relative">
                    History of food
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900"
              >
                Top Dishes
              </h2>

              {/* Top Feed */}
              <div className="mt-6 flow-root">
                Top rated items
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoggedView;