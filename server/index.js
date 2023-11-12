const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "57cb30a393e2d0570fdcffa681b42aa584f6f70e0f615b443956ae840028f408";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;
  console.log("Request Body:", name);
  console.log("Request Body.proof:", proof);

  // TODO: prove that a name is in the list
  let verify = verifyProof(proof, name, MERKLE_ROOT);
  console.log(`Esto es verify:${verify}`);

  const isInTheList = verify;

  isInTheList
    ? res.send("You got a toy robot!")
    : res.send("You are not on the list :(");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
