"use client";

import Decks from "@/components/Decks/Decks";
import styles from "./page.module.css";
import AppLayout from "@/components/AppLayout";
import { ChangeEvent, useEffect, useState } from "react";
import { Card, Deck } from "@/config/interfaces.config";
import { client } from "@/config/axios.config";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { showMessage } from "@/utils/alerts";
import Return from "@/components/Return/Return";

const montserrat = Montserrat({ subsets: ["latin"] });

interface SessionState {
  initDate: Date | null;
  endDate: Date | null;
}

const ActiveRecall = () => {
  const [selectedDeck, setSelectedDeck] = useState<null | Deck>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [finished, setFinished] = useState(false);
  const [session, setSession] = useState<SessionState>({
    initDate: null,
    endDate: null,
  });

  const updateCards = async () => {
    const response = await client.get(`/cards/${selectedDeck!.id}`);
    setCards(response.data);
    if (response.data.length > 0) {
      setSelectedCard(0);
    } else {
      setSelectedCard(null);
    }
  };

  useEffect(() => {
    if (selectedDeck) {
      updateCards();
      setSession({
        initDate: new Date(Date.now()),
        endDate: null,
      });
    }
  }, [selectedDeck]);

  const onType = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const newValue = value.replaceAll("\n\n\n", "\n\n");
    setText(newValue);
  };

  const onCheck = () => {
    setFinished(true);
  };

  const onNext = async () => {
    if (selectedCard! + 1 <= cards.length - 1) {
      setSelectedCard(selectedCard! + 1);
      setText("");
      setFinished(false);
    } else {
      showMessage(
        "¡Tu sesión de estudio ha finalizado! Descansa un poco",
        "success"
      );
      if (!session.endDate) {
        const currentDate = new Date(Date.now());
        await client.post("/sessions", {
          reviewed_cards: cards.length,
          reached_goals: 0,
          initDate: session.initDate,
          endDate: currentDate,
        });
        setSession({
          ...session,
          endDate: currentDate,
        });
      }
    }
  };

  return (
    <AppLayout>
      <Return />
      <main className={styles.main}>
        <div className={styles.container}>
          {selectedDeck ? (
            <>
              {selectedCard !== null ? (
                finished ? (
                  <>
                    <p className={styles.title}>{cards[selectedCard].front}</p>
                    <div className={styles.card}>
                      <p className={styles.response}>
                        <b>Respuesta escrita: </b> {text}
                      </p>

                      <p className={styles.response}>
                        <b>Respuesta guardada: </b> {cards[selectedCard].back}
                      </p>
                    </div>
                    <p className={styles.terminar} onClick={onNext}>
                      Siguiente
                    </p>
                  </>
                ) : (
                  <>
                    <p className={styles.title}>
                      {cards[selectedCard] && cards[selectedCard].front}
                    </p>
                    <div className={styles.card}>
                      <textarea
                        className={montserrat.className}
                        cols={30}
                        rows={10}
                        placeholder="Escribe tu respuesta"
                        onChange={onType}
                        value={text}
                      ></textarea>
                    </div>
                    <p className={styles.terminar} onClick={onCheck}>
                      Terminar
                    </p>
                  </>
                )
              ) : (
                <>
                  <p className={styles.title}>{selectedDeck.name}</p>
                  <h1 className={styles.noDeck}>No hay cartas en el mazo</h1>
                </>
              )}
            </>
          ) : (
            <Image
              src="/decks/tumbleweed.png"
              width={450}
              height={450}
              alt="tumbleweed"
              draggable={false}
            />
          )}
          <Decks
            selectedDeck={selectedDeck}
            setSelectedDeck={setSelectedDeck}
          />
        </div>
      </main>
    </AppLayout>
  );
};

export default ActiveRecall;
