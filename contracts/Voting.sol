// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "fhevm/lib/TFHE.sol";

contract Voting {
    // 加密的投票计数器
    euint32 private yesVotes;
    euint32 private noVotes;

    // 构造函数：初始化加密计数器为0
    constructor() {
        yesVotes = TFHE.asEuint32(0);
        noVotes = TFHE.asEuint32(0);
    }

    // 提交加密投票（1表示赞成，0表示反对）
    function vote(euint8 encryptedVote) public {
        euint32 isYes = TFHE.asEuint32(encryptedVote);
        euint32 isNo = TFHE.sub(TFHE.asEuint32(1), isYes);

        yesVotes = TFHE.add(yesVotes, isYes);
        noVotes = TFHE.add(noVotes, isNo);
    }

    // 获取加密的投票结果（仅调用者可解密）
    function getResults() public view returns (bytes memory, bytes memory) {
        bytes memory encryptedYes = TFHE.reencrypt(yesVotes, msg.sender);
        bytes memory encryptedNo = TFHE.reencrypt(noVotes, msg.sender);
        return (encryptedYes, encryptedNo);
    }
}
