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
            <h1 className="text-4xl font-bold mb-2">{repoDetails.name} Commits</h1>
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
          <div className="space-y-4 ">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
              >
                <div className="font-bold text-xl ml-4">
                  <button className="hover:underline">{file.name}</button></div>
                <div className="space-x-2 text-center">
                    
                    <div>✅</div>
                    <div className="font-thin text-sm">Approved By GHB</div>  
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
