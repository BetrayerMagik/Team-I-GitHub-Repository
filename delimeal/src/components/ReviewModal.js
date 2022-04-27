import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReviewModal = ({ title, isRating = false, data }) => {
  const [open, setOpen] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [co, setCo] = React.useState("complement");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("data -> ", data);
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <label className="block text-2xl font-medium text-gray-700 h-20">
              {title}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="flex flex-col items-center justify-center">
                {isRating ? (
                  <select
                    id="rating"
                    name="rating"
                    autoComplete="rating"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                ) : (
                  <div className="flex flex-col p-4 gap-10">
                    <select
                      id="co"
                      name="co"
                      autoComplete="co"
                      value={co}
                      onChange={(event) => setCo(event.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full p-2 pr-7 bg-transparent text-gray-500 sm:text-sm rounded-md border"
                    >
                      <option value="complement">Complement</option>
                      <option value="complaint">Complaint</option>
                    </select>
                    <input
                      type="text"
                      name="review"
                      id="review"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-300 rounded-md border "
                      placeholder="Review Text"
                      onChange={(event) => setReview(event.target.value)}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewModal;