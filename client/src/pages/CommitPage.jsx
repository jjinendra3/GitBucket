import React from "react";

const App = () => {
  const changesArray = [
    {
      filename: "file.txt",
      filestr: [
        { lineNumber: 1, oldLine: "Old Line 1", newLine: "New Line 1" },
        { lineNumber: 2, oldLine: "Old Line 2", newLine: "New Line 2" },
      ],
    },
    {
      filename: "file.txt",
      filestr: [
        { lineNumber: 1, oldLine: "Old Line 1", newLine: "New Line 1" },
        { lineNumber: 2, oldLine: "Old Line 2", newLine: "New Line 2" },
      ],
    },
    {
      filename: "file.txt",
      filestr: [
        { lineNumber: 1, oldLine: "Old Line 1", newLine: "New Line 1" },
        { lineNumber: 2, oldLine: "Old Line 2", newLine: "New Line 2" },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="font-bold mb-4 text-center text-3xl">
        Commit Number skdwifhdweiih3984u935
      </h1>
      <div className="space-y-8">
        {changesArray.map((change, index) => (
          <div key={index} className="flex mb-4">
            <div className="flex-row">
              <div className="text-2xl font-bold">{change.filename}</div>
            </div>
            <div className="flex justify-around w-full p-2  ">
              <div className="w-1/2 p-4 space-y-2">
                {change.filestr.map((line) => (
                  <div
                    key={line.lineNumber}
                    className="flex justify-between text-white"
                  >
                    <div className="w-full bg-red-700 border border-white p-2 rounded">
                      {line.oldLine}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-1/2 p-4 space-y-2">
                {change.filestr.map((line) => (
                  <div
                    key={line.lineNumber}
                    className="flex justify-between text-white"
                  >
                    <div className="w-full bg-green-700 border border-white p-2 rounded">
                      {line.newLine}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
