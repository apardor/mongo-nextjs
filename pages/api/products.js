import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  console.log(req.method);
  const db = client.db("productsdb");
  if(req.method === "GET") {
      const food = await db.collection("food").find({}).toArray();
      res.json({ status: 200, food });
  }
}
