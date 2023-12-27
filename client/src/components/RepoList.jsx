import React from 'react'
function RepoList() {
    const repos = [
    {
      name: "ReactWidgets",
      type: true,
    },
    {
      name: "ExpressAPI",
      type: false,
    },
    {
      name: "MachineLearningKit",
      type: true,
    },
    {
      name: "VueComponents",
      type: false,
    },
    {
      name: "DataScienceToolkit",
      type: true,
    },
    {
      name: "GraphQLServer",
      type: false,
    },
    {
      name: "iOSAppTemplate",
      type: true
    },
    {
      name: "FullStackProject",
      type: false
    },
  ];
  return (
    <div>{ repos.map((repo)=>{
        return (
            <div className="bg-gray-900 rounded-lg p-4 my-4">
                <div className="text-white text-4xl font-bold m-2">{repo.name}</div>
                <div className="text-white text-sm font-light m-2">{repo.type?"Public":"Private"}</div>
            </div>
        )
    })}</div>
  )
}

export default RepoList