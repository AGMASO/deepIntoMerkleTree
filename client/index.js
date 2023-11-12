const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main(name) {
  if (!name) {
    console.error("Please provide a name as a command-line argument.");
    return;
  }
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex((n) => n === name);
  console.log(index);

  //Creating merkle tree root hash
  const root = merkleTree.getRoot();
  console.log(typeof root);

  //Creating proof
  const proof = merkleTree.getProof(index);

  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      index: index,
      proof: proof,
      root: root,
      name: name,
    });
    console.log({ gift });
  } catch (error) {
    console.log(error);
  }
}

const nameArg = process.argv[2];
main(nameArg);
