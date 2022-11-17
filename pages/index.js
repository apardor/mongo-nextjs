import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import clientPromise from "../lib/mongodb";

export async function getStaticProps() {
  const client = await clientPromise;
  const db = client.db("productsdb");
  const food = (await db.collection("food").find({}).toArray())[0];
  console.log('what is loooove', JSON.stringify(food._id))
  return {
    props: {
      food: [food.food]
    },
  };
}

export default function Home(props) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1> South Gallery Mongo</h1>

      <main className="container">
        {props? props?.food.map((food) => {
          return food.map((data) => {
            return (
              <article key={data.id}>
                <h3>{data.name}</h3>
                <p>quantity: {data.quantity}</p>
                <Image width={300} height={400} src= {`/${data.name}.jpg `} alt={data.name} priority='true'/>
              </article>
            );
          });
        }): ''}
      </main>
    </div>
  );
}
