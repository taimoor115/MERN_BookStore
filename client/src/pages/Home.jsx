import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Spinner from "../components/Spinner";
import TableShow from "../components/home/TableShow";
import CardShow from "../components/home/CardShow";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [show, setShow] = useState("table");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/books")
      .then((response) => {
        setIsLoading(false);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-200 hover:bg-sky-300 px-4 py-1 rounded-lg"
          onClick={() => setShow("table")}
        >
          Table View
        </button>
        <button
          className="bg-sky-200 hover:bg-sky-300 px-4 py-1 rounded-lg"
          onClick={() => setShow("cards")}
        >
          Cards View
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox classname="text-sky-800  text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : show === "table" ? (
        <TableShow data={data} />
      ) : (
        <CardShow />
      )}
    </div>
  );
};

export default Home;
