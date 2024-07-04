import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const CardShow = ({ data }) => {
  return (
    <div className="grid sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((book) => (
        <div
          key={book._id}
          className="border-2 border-gray-500 rounded-lg px-3 py-2 m-4 relative hover:shadow-xl"
        >
          <h2 className="top-1 absolute right-2 px-4 py-1 bg-red-300">
            {book.publishYear}
          </h2>
          <h4 className="my-2 text-gray-500 ">{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2>{book.title}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardShow;
