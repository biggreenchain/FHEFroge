import { ethers } from "ethers";
import { initFhevmjs, encrypt8 } from "fhevmjs";

// 合约ABI（从编译后的Voting.sol获取）
const contractABI = [
  "function vote(euint8 encryptedVote) public",
  "function getResults() public view returns (bytes memory, bytes memory)",
];

// 初始化provider和合约
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // 替换为部署后的地址
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// 提交加密投票
export async function submitVote(vote: number) {
  await initFhevmjs();
  const encryptedVote = encrypt8(vote); // 加密投票（0或1）
  const tx = await contract.vote(encryptedVote);
  await tx.wait();
  console.log("Vote submitted:", tx.hash);
}

// 获取加密结果
export async function getResults() {
  const [encryptedYes, encryptedNo] = await contract.getResults();
  return { encryptedYes, encryptedNo };
}
