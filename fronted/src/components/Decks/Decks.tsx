import { client } from "@/config/axios.config";
import { useEffect, useState } from "react";

const Decks = () => {
  const [decks, setDecks] = useState();

  const getDecks = async () => {
    const response = await client.get("/decks");
    console.log(response.data);
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div>
      <h1>lkajdsf</h1>
    </div>
  );
};

export default Decks;
