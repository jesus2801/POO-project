"use client";

import Decks from "@/components/Decks/Decks";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Card, Deck } from "@/config/interfaces.config";
import AppLayout from "@/components/AppLayout";
import { client } from "@/config/axios.config";
import { loading, obtainInfo, showMessage } from "@/utils/alerts";
import "./styles.default.css";
import Return from "@/components/Return/Return";

const Flashcards = () => {
  const [selectedDeck, setSelectedDeck] = useState<null | Deck>(null);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [reveal, setReveal] = useState(false);

  const addCard = async () => {
    try {
      if (!selectedDeck) {
        showMessage("Primero elige un mazo para agregar una carta", "error");
        return;
      }

      const info: any = await obtainInfo(
        [
          {
            label: "frontal",
            name: "front",
            type: "text",
          },
          {
            label: "reverso",
            name: "back",
            type: "text",
          },
        ],
        "Agregar Carta",
        "Agregar"
      );
      await client.post(`/cards`, {
        ...info,
        deckId: selectedDeck!.id,
      });

      const response = await client.get(`/cards/${selectedDeck!.id}`);
      const cs = response.data.filter((c: any) => c.fibonacci == 0);
      setAllCards(cs);
      if (cs.length > 0) {
        setSelectedCard(0);
      } else {
        setSelectedCard(null);
      }
      showMessage("carta agregada correctamente", "success");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const updateCards = async () => {
      const response = await client.get(`/cards/${selectedDeck!.id}`);
      const cs = response.data.filter((c: any) => c.fibonacci == 0);
      setAllCards(cs);
      if (cs.length > 0) {
        setSelectedCard(0);
      } else {
        setSelectedCard(null);
      }
    };
    if (selectedDeck) {
      updateCards();
    }
  }, [selectedDeck]);

  const onNext = async (value: "no" | "yes") => {
    if (!reveal) {
      showMessage(
        "Primero descubre el reverso de la palabra dando click sobre el mismo",
        "error"
      );
      return;
    }

    loading(true);
    await client.put(`/cards/${allCards[selectedCard!].id}`, {
      ...allCards[selectedCard!],
      fibonacci: value === "no" ? 0 : 1,
    });
    loading(false);

    setReveal(false);
    if (selectedCard! + 1 <= allCards.length - 1) {
      setSelectedCard(selectedCard! + 1);
    } else {
      setSelectedCard(null);
      showMessage("¡Felicidades, terminaste tu estudio por hoy!", "success");
    }
  };

  return (
    <AppLayout>
      <Return />
      <main className={styles.main}>
        <div className={styles.container}>
          <Decks
            layout="vertical"
            selectedDeck={selectedDeck}
            setSelectedDeck={setSelectedDeck}
          />
          <div className={styles.flashcards}>
            <div className={styles.header}>
              <p onClick={addCard}>Añadir Carta</p>
              <p>
                {!selectedDeck ? "Ningún mazo seleccionado" : selectedDeck.name}
              </p>
            </div>

            {selectedCard !== null && (
              <>
                <div className={styles.card}>
                  <div>
                    <p>{allCards[selectedCard].front}</p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.currentTarget.classList.add("reveal");
                      setReveal(true);
                    }}
                  >
                    <p>{allCards[selectedCard].back}</p>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button onClick={() => onNext("no")}>No sé</button>
                  <button onClick={() => onNext("yes")}>Fácil</button>
                  <button onClick={() => onNext("no")}>Difícil</button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Flashcards;
