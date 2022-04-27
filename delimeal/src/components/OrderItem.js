import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import OrderCollapseTable from "./OrderCollapseTable";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const OrderItem = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [total, setTotal] = React.useState(0.0);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const totalHandler = () => {
    let localTotal = 0;
    data.food.forEach((item) => {
      localTotal += parseFloat(item.cost);
    });
    setTotal(parseFloat(localTotal).toFixed(2));
  };

  const getDateTime = () => {
    setDate(new Date(data.date).toLocaleDateString());
    setTime(new Date(data.date).toLocaleTimeString());
  };

  React.useEffect(() => {
    totalHandler();
    getDateTime();
  }, []);

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Typography variant="h7" color="black">
            {`${date} - ${time}`}
          </Typography>
          <Typography variant="h9" color="black">
            $ {total}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          className="focus:outline-none"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="border-t-2 border-dashed">
            {/* NEED TO ADD EACH FOOD OF ORDER */}
            <>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Cost
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              For Chef
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              For Delivery
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {/* {console.log("data -> ", data)} */}
                          {data.food.map((dataItem, dataItemIndex) => (
                            //   console.log("data ->", data)
                            <OrderCollapseTable
                              data={dataItem}
                              key={dataItemIndex}
                              method={data.method}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
            {/* <p>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</p> */}
            {/* <SearchTable newData={newData} authProps={authProps} /> */}
          </CardContent>
        </Collapse>
      </>
      {/* 
      <>
        <form
          className="flex items-center p-2"
          // onSubmit={dosageSubmitHandler}
        >
          <input
            required
            type="number"
            min={0}
            className="m-1"
            placeholder="Dosage Amount"
            //   onChange={handleDosageChange}
          />
          <select
            required
            className="m-1"
            id="servingUnit"
            //   onChange={handleUnitChange}
          >
            <option value="mg">Milligrams (mg)</option>
            <option value="g">Grams (g)</option>
          </select>
          <button
            className="bg-blue-700 text-white p-2 rounded-md ml-2"
            type="submit"
          >
            Add to Account
          </button>
        </form>
      </> */}
    </Card>
  );
};

export default OrderItem;