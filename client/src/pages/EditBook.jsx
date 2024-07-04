import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((response) => {
        setFormData({
          ...formData,
          title: response.data.title,
          author: response.data.author,
          publishYear: response.data.publishYear,
        });
      })
      .catch((err) => console.log(err));
    console.log(formData);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, publishYear } = formData;

    try {
      const { data } = await axios.put(`http://localhost:8080/books/${id}`, {
        title,
        author,
        publishYear,
      });
      console.log(data);

      if (data.error) {
        toast.error(data.error);
      } else {
        setFormData({});
        toast.success(data.message);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      <form
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
        action=""
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="title">
            Title
          </label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            value={formData.title}
            placeholder="Title"
            name="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-xl mr-4 text-gray-500" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-xl mr-4 text-gray-500" htmlFor="publishYear">
            Publish Year
          </label>
          <input
            type="number"
            placeholder="Publish Year"
            name="publishYear"
            value={formData.publishYear}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            onChange={(e) =>
              setFormData({ ...formData, publishYear: e.target.value })
            }
          />
        </div>
        <button className="p-2 m-8 bg-sky-300" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBook;
