import React,{useState} from "react";
import { useContext } from "react";
import Context from "../ContextAPI";
import AddRepoModal from './AddRepoModal';
function RepoList() {
  const [modal, setmodal] = useState(false);
  const context=useContext(Context);
  const {repos} =context.user_details;
  return (
    <div className="flex-row">
  <button
    className="bg-primary p-2 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
    onClick={() => {
      setmodal(true);
    }}
  >
    Add Repo
  </button>

  {repos &&
    repos.map((repo) => (
      <div key={repo.id} className="bg-gray-900 rounded-lg p-4 my-4" onClick={async()=>{
        const r=await context.GetRepo(repo.id);
        console.log(r);
      }}>
        <div className="text-white text-4xl font-bold m-2">{repo.name}</div>
        <div className="text-white text-sm font-light m-2">
          {repo.type ? "Public" : "Private"}
        </div>
      </div>
    ))}

  {modal && <AddRepoModal setmod={setmodal} />}
</div>

  );
}

export default RepoList;
