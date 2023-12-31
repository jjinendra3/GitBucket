import React from 'react';
import logo from '../assets/logo.png'

function App() {
  return (
    <div className=" p-8 my-4 text-center text-white flex-row justify-center items-center">
        <div className='w-1/2 mx-auto'>

      <div className="mb-4 flex justify-center">
        <img src={logo} alt="Logo" className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to GHB</h1>
      <p className="text-lg mb-8">
        Your personal code space. Manage your repositories, commits, and files effortlessly.
      </p>
      <div>
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <div className="list-disc ">
          <div className="text-lg mb-2">Manage your repositories</div>
          <div className="text-lg mb-2">Create and view commits</div>
          <div className="text-lg mb-8">Download the latest files</div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">About the Developer</h2>
        <p className="text-lg mb-2">
          Jinendra Jain - Second Year Computer Science Engineering (CSE) undergraduate at JIIT Noida.
        </p>
        <div className="flex space-x-4 justify-center mb-8">
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            >
            LinkedIn
          </a>
          <a
            href="https://github.com/your-github"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            >
            GitHub
          </a>
        </div>
        
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Contribute to GHB</h2>
        <p className="text-lg mb-4">
          We invite developers from around the world to contribute to GHB. Your ideas and expertise can make a significant impact. Visit our GitHub repository, explore the issues, or open a new one. Let's build together!
        </p>
        <div className="flex space-x-4 justify-center">
          <a
            href="https://github.com/your-github/ghb"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            >
            Contribute on GitHub
          </a>
        </div>
      </div>
    </div>
              </div>
  );
}

export default App;
