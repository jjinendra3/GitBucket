import React, { useState } from "react";
import axios from 'axios'   
const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalSizeExceeded, setTotalSizeExceeded] = useState(false);
  const maxSizeInBytes = 5 * 1024 * 1024;

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

  const handleUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });

    axios.post('http://localhost:5000/files/upload', formData)
      .then(response => {
        console.log('Upload successful', response.data);
      })
      .catch(error => {
        console.error('Upload failed', error);
      });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="*/*"
      />
      {totalSizeExceeded && (
        <p style={{ color: "red" }}>Total size exceeds the limit (5 MB).</p>
      )}
      <button onClick={handleUpload} disabled={totalSizeExceeded} className="bg-blue-900">
        Upload Files
      </button>
    </div>
  );
};

export default FileUpload;
