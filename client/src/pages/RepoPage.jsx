import React, { useContext, useState, useEffect } from "react";
import AddFileModal from "../components/AddFileModal";
import Context from "../ContextAPI";
import queryString from "query-string";

const RepositoryPage = () => {
  const queryParams = queryString.parse(window.location.search);
  const repoId = queryParams.id;

  const context = useContext(Context);
  const [mod, setMod] = useState(false);
  const [repo, setRepo] = useState({ name: "", type: false, files: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repoDetails = await context.GetRepo(repoId);
        console.log(repoDetails);
        setRepo(repoDetails);
      } catch (error) {
        console.error("Error fetching repo details:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {};

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto mt-8 p-8">
        <div className="p-8 bg-gray-800 rounded-md justify-between flex">
          <div className="flex-row">
            <h1 className="text-4xl font-bold mb-2">{repo.name}</h1>
            <div className="font-light">{repo.type ? "Public" : "Private"}</div>
          </div>
          <div className="flex-row">
            <div className="text-4xl font-bold mb-2">
              {context.user_details.name}
            </div>
            <div className="font-light flex justify-end ">
              {context.user_details.username}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-md p-8">
          <div className="flex justify-end space-x-4">
            <div className="text-right mb-4">
              <button className="bg-green-500 text-white py-2 px-4 rounded">
                View Commits
              </button>
            </div>
            <div className="text-right mb-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => setMod(true)}
              >
                Add Files
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {repo.files ? (
              repo.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
                >
                  <div className="font-bold text-xl">{file.name}</div>
                  <div className="space-x-2">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(file.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white text-3xl font-bold text-center">
                No Files Present
              </div>
            )}
          </div>
        </div>
      </div>

      {mod && <AddFileModal setMod={setMod} id={repo.id} />}
    </div>
  );
};

export default RepositoryPage;
