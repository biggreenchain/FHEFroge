import React, { useState } from "react";
import { submitVote } from "../lib/blockchain";

const VoteForm: React.FC = () => {
  const [vote, setVote] = useState<number | null>(null);

  const handleVote = async () => {
    if (vote !== null) {
      try {
        await submitVote(vote);
        alert("投票提交成功！");
      } catch (error) {
        console.error("投票失败:", error);
        alert("投票失败，请检查网络或合约状态");
      }
    }
  };

  return (
    <div>
      <h2>投出你的选择</h2>
      <button onClick={() => setVote(1)}>赞成</button>
      <button onClick={() => setVote(0)}>反对</button>
      <button onClick={handleVote} disabled={vote === null}>
        提交投票
      </button>
    </div>
  );
};

export default VoteForm;
