import { client } from "../../config/axios.config";
import { useEffect, useState } from "react";
import styles from "./Decks.module.css";
import Image from "next/image";
import { loading, obtainInfo, showMessage } from "@/utils/alerts";
import { Deck } from "@/config/interfaces.config";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

interface Props {
  setSelectedDeck: (d: Deck | null) => void;
  selectedDeck: Deck | null;
  layout?: "horizontal" | "vertical";
}

const Decks = ({
  setSelectedDeck,
  selectedDeck,
  layout = "horizontal",
}: Props) => {
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

  const updateDeck = async (deck: Deck) => {
    try {
      const info = await obtainInfo(
        [
          {
            label: "Nombre del mazo",
            name: "name",
            type: "text",
          },
        ],
        "Modificar mazo",
        "Modificar"
      );

      loading(true);
      const response = await client.put(`/decks/${deck.id}`, info);
      loading(false);

      setDecks(
        decks.map((d) => {
          if (deck.id === d.id) return response.data;
          return d;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDeck = async (deck: Deck) => {
    loading(true);
    await client.delete(`/decks/${deck.id}`);
    loading(false);

    if (selectedDeck && selectedDeck.id === deck.id) {
      setSelectedDeck(null);
    }
    setDecks(decks.filter((d) => deck.id !== d.id));

    showMessage("Mazo eliminado correctamente", "success");
  };

  const onDeckClick = (deck: Deck) => {
    if (selectedDeck && selectedDeck.id === deck.id) {
      showMessage("El mazo ya está seleccionado", "error");
    } else {
      setSelectedDeck(deck);
    }
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div
      className={`${styles.decks} ${
        layout === "vertical" ? styles.vertical : ""
      }`}
    >
      <Image
        width={45}
        height={45}
        onClick={addDeck}
        src="/habits/add.svg"
        alt="Agregar"
        className={styles.add}
      />
      {decks.map((deck) => (
        // @ts-ignore
        <ContextMenuTrigger key={deck.id} id={deck.id}>
          {/*@ts-ignore*/}
          <ContextMenu id={deck.id}>
            {/*@ts-ignore*/}
            <MenuItem onClick={() => updateDeck(deck)}>Actualizar</MenuItem>
            {/*@ts-ignore*/}
            <MenuItem onClick={() => deleteDeck(deck)}>Eliminar</MenuItem>
          </ContextMenu>
          <div onClick={() => onDeckClick(deck)} className={styles.deck}>
            <Image
              src="/decks/folder.svg"
              width={85}
              height={69}
              alt="carpeta"
            />
            <p>{deck.name}</p>
          </div>
        </ContextMenuTrigger>
      ))}
    </div>
  );
};

export default Decks;
