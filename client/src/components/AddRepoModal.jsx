import { useContext, useState } from "react";
import Context from "../ContextAPI";

export default function Modal({ setmod }) {
  const context = useContext(Context);
  const [repodetails, setrepodetails] = useState({ name: "" });
  const [repotype, setrepotype] = useState("");

  const onChange = (event) => {
    setrepodetails({ ...repodetails, [event.target.name]: event.target.value });
  };

  const handleUpload = async () => {
    try {
      const response = await context.AddRepo(repodetails.name, repotype);
      console.log(response);
      const updatedRepos = [
        ...context.user_details.repos,
        {
          name: repodetails.name,
          id: response.data.repo._id,
          type: repotype,
        },
      ];

      await context.setuser_details((prevState) => ({
        ...prevState,
        repos: updatedRepos,
      }));

      setrepodetails({ name: "" });
      setmod(false);
    } catch (error) {
      console.error("Error while uploading:", error);
      alert("Error while uploading. Please try again.");
    }
  };

  const handleClose = () => {
    setmod(false);
  };

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative max-w-3xl mx-auto bg-primary p-8 rounded-lg w-1/2 text-text-col border-2 border-neon">
          <div className="text-3xl font-extrabold text-center mb-6">
            Create A Repository
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Repository Name
            </label>
            <input
              type="text"
              name="name"
              value={repodetails.name}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 text-prim bg-gray-600"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Type</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${
                  repotype === "true"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setrepotype("true")}
              >
                Public
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  repotype === "false"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setrepotype("false")}
              >
                Private
              </button>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                (!repodetails.name || !repotype) &&
                "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleUpload}
              disabled={!repodetails.name || !repotype}
            >
              Upload Files
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
