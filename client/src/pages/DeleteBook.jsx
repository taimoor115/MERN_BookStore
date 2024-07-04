import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    await axios
      .delete(`http://localhost:8080/books/${id}`)

      .then(() => {
        setLoading(false);
        toast.success("Delete successfully");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 ">Book Delete</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-500 rounded-xl w-[600px] mx-auto p-8">
          <h3 className="text-2xl">Are you sure?</h3>
          <button
            className="p-3 m-8 text-white bg-red-500"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
