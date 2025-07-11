import React, { useEffect, useState } from "react";
import { getResults } from "../lib/blockchain";

const Results: React.FC = () => {
  const [results, setResults] = useState<{ yes: string; no: string } | null>(
    null
  );

  useEffect(() => {
    const fetchResults = async () => {
      const { encryptedYes, encryptedNo } = await getResults();
      setResults({ yes: encryptedYes, no: encryptedNo });
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h2>投票结果（加密）</h2>
      {results ? (
        <>
          <p>赞成票（加密）: {results.yes}</p>
          <p>反对票（加密）: {results.no}</p>
        </>
      ) : (
        <p>加载中...</p>
      )}
    </div>
  );
};

export default Results;
