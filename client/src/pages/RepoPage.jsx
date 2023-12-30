import React, { useState } from "react";
import AddFileModal from "../components/AddFileModal";
const RepositoryPage = () => {
  const [mod, setmod] = useState(false);

  const [files, setFiles] = useState([
    { id: 1, name: "file1.txt", content: "File content 1" },
    { id: 2, name: "file2.txt", content: "File content 2" },
    { id: 3, name: "file3.txt", content: "File content 3" },
  ]);

  const repoDetails = {
    id:'ekjebeb927389232hjbehwd',
    name: "Adsus",
    filearr: files,
    type: true,
  };
  const handleDelete = (id) => {
    // Implement delete functionality
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto mt-8 p-8">
        <div className="p-8 bg-gray-800 rounded-md justify-between flex">
          <div className="flex-row">
            <h1 className="text-4xl font-bold mb-2">{repoDetails.name}</h1>
            <div className="font-light">
              {repoDetails.type ? "Private" : "Public"}
            </div>
          </div>
          <div className="flex-row">
            <div className="text-4xl font-bold mb-2">Name</div>
            <div className="font-light flex justify-end ">username</div>
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
                onClick={() => {
                  setmod(true);
                }}
              >
                Add Files
              </button>
            </div>
          </div>

          <div className="space-y-4 ">
            {files.map((file) => (
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
            ))}
          </div>
        </div>
      </div>
      {mod && <AddFileModal setmod={setmod} id={repoDetails.id}/>}
    </div>
  );
};

export default RepositoryPage;
