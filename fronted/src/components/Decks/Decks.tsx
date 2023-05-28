import { client } from "../../config/axios.config";
import { useEffect, useState } from "react";
import styles from "./Decks.module.css";
import Image from "next/image";
import { loading, obtainInfo, showMessage } from "@/utils/alerts";
import { Deck } from "@/config/interfaces.config";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  const getDecks = async () => {
    const response = await client.get("/decks");
    setDecks(response.data);
  };

  const addDeck = async () => {
    try {
      const info = await obtainInfo(
        [
          {
            label: "Nombre del mazo",
            name: "name",
            type: "text",
          },
        ],
        "Agregar Mazo",
        "Agregar"
      );

      loading(true);
      const response = await client.post("/decks", info);
      loading(false);

      setDecks([...decks, response.data]);
      showMessage("Mazo agregado correctamente", "success");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div className={styles.decks}>
      <Image
        width={45}
        height={45}
        onClick={addDeck}
        src="/habits/add.svg"
        alt="Agregar"
        className={styles.add}
      />
      {decks.map((deck) => (
        <>
          {/*@ts-ignore*/}
          <ContextMenuTrigger id={deck.id}>
            {/*@ts-ignore*/}
            <ContextMenu id={deck.id}>
              {/*@ts-ignore*/}
              <MenuItem>Actualizar</MenuItem>
              {/*@ts-ignore*/}
              <MenuItem>Eliminar</MenuItem>
            </ContextMenu>
            <div key={deck.id} className={styles.deck}>
              <Image
                src="/decks/folder.svg"
                width={85}
                height={69}
                alt="carpeta"
              />
              <p>{deck.name}</p>
            </div>
          </ContextMenuTrigger>
        </>
      ))}
    </div>
  );
};

export default Decks;
