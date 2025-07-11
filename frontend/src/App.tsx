import React from "react";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";

const App: React.FC = () => {
  return (
    <div>
      <h1>FHEVM 加密投票系统</h1>
      <VoteForm />
      <Results />
    </div>
  );
};

export default App;
