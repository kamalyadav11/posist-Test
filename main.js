const SHA256 = require("crypto-js/sha256");
class Node {
    constructor(nodeNumber, timestamp, data, previousHash = '', referenceNodeId) {
        this.nodeNumber = nodeNumber;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.referenceNodeId = referenceNodeId; 
    }

    calculateHash() {
        return SHA256(this.nodeNumber + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class GenesisNode{
  constructor() {
      this.chain = [this.createGenesisNode()];
  }

  createGenesisNode() {
      return new Node(0, "01/01/2017", "Genesis block", "0");
  }

  getLatestNode() {
      return this.chain[this.chain.length - 1];
  }

  addNode(newNode) {
      newNode.previousHash = this.getLatestNode().hash;
      newNode.hash = newNode.calculateHash();
      this.chain.push(newNode);
  }
  
}

let kamalCoin = new GenesisNode();
kamalCoin.addNode(new Node(1, "20/07/2017", { amount: 4 }));
kamalCoin.addNode(new Node(2, "20/07/2017", { amount: 2 }));

console.log(JSON.stringify(kamalCoin, null, 4));