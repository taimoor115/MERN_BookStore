import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);

  console.log(book);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        console.log(book);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 ">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              <b>Id:</b>
            </span>
            <span>{book._id}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              <b>Title:</b>
            </span>
            <span>{book.title}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              <b>Author:</b>
            </span>
            <span>{book.author}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              <b>Publish Year:</b>
            </span>
            <span>{book.publishYear}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              <b>Create Time:</b>
            </span>
            <span>
              {new Date(book.createdAt)
                .toString()
                .split(" ")
                .slice(4)
                .join(" ")}
            </span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              <b>Last Update Time:</b>
            </span>
            <span>
              {new Date(book.updatedAt)
                .toString()
                .split(" ")
                .slice(4)
                .join(" ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
