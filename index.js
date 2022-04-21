import express from "express";
import { MongoClient } from "mongodb";
const app = express();
const PORT = 4000;
// const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

async function createConnection() {
  const client = new MongoClient(
    "mongodb+srv://prithiv:welcome123@cluster0.jc18x.mongodb.net"
  );
  await client.connect();
  console.log("Mongo is connected ✌️😊");
  return client;
}
export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello Everyone 4000😄");
});

app.get("/money-manager", function (req, res) {
  res.send("Hello Everyone 4000😄");
});

app.get("/money-manager/alldata", async function (req, res) {
  const data = await client
    .db("money_manager")
    .collection("income")
    .find({})
    .toArray();
  res.send(data);
});

app.get("/money-manager/expense", async function (req, res) {
  const data = await client
    .db("money_manager")
    .collection("income")
    .find({ type: "expense" })
    .toArray();
  res.send(data);
});

app.get("/money-manager/income", async function (req, res) {
  const data = await client
    .db("money_manager")
    .collection("income")
    .find({ type: "income" })
    .toArray();
  res.send(data);
});

app.post("/money-manager/data", async function (req, res) {
  const data = req.body;
  const result = await client
    .db("money_manager")
    .collection("income")
    .insertOne(data);
  res.send(result);
});
app.listen(PORT, () => console.log("sever started da goiyaala"));
