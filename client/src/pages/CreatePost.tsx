import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { FormField } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/v1/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
    return;
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setForm({ ...form, prompt: randomPrompt });
    return;
  };

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:3000/api/v1/dalle/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        console.log(response);
        console.log(data);

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.error(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
    return;
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create visually stunning images using DALL-E AI
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Tom"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder={getRandomPrompt()}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : generatingImg ? (
              <p className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
                <FontAwesomeIcon
                  className="object-contain h-5 w-5 animate-spin text-white"
                  icon={faSpinner}
                />
              </p>
            ) : (
              <FontAwesomeIcon
                className="object-contain opacity-40"
                icon={faImage}
              />
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={generateImg}
            disabled={generatingImg}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others.
          </p>
          <button
            className="mt-3 text-white bg-[#4649ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
