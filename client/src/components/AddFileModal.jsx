import { useState } from "react";
import axios from "axios";
export default function Modal({ setmod,id }) {
  const maxSizeInBytes = 5 * 1024 * 1024;
  const [totalSizeExceeded, setTotalSizeExceeded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('repoid',id);
    axios
      .post("http://localhost:5000/files/upload", formData)
      .then((response) => {
        console.log("Upload successful", response.data);
        setmod(false);
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > maxSizeInBytes) {
      setTotalSizeExceeded(true);
      setSelectedFiles([]);
    } else {
      setTotalSizeExceeded(false);
      setSelectedFiles(files);
    }
  };

  const handleClose = () => {
    setmod(false);
  };
  return (
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="relative  my-6 mx-auto max-w-3xl bg-primary p-5  rounded-lg w-1/2 text-text-col border-2 border-neon">
            <div className="text-3xl font-extrabold text-center mb-4">
              Add Files
            </div>
            <div className="flex justify-center ml-24">
              <div className="flex-row">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".txt, .md, .html, .css, .js, .json, .java, .py, .cpp, .php, .ruby, .sh, .sql, .xml, .yml, .jsx"
                />

                {totalSizeExceeded && (
                  <p style={{ color: "red" }}>
                    Total size exceeds the limit (5 MB).
                  </p>
                )}
              </div>
            </div>
            <div></div>
            <div className="flex-row text-center my-6">
              {selectedFiles.length !== 0 ? (
                selectedFiles.map((file) => {
                  return <div>{file.name}</div>;
                })
              ) : (
                <div className="text-2xl font-bold text-red-500">
                  No Files Selected
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleUpload}
                disabled={totalSizeExceeded}
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
