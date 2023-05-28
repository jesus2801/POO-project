import { v4 } from "uuid";
import { Deck } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import Model from "./index.model";

class DeckModel extends Model {
  //create the file if it doesn't exist
  constructor() {
    super();
    this.file_name = "decks.csv";
    this.headers = [
      "id",
      "userId",
      "name",
    ];
    this.startFile();
  }

  //this functions returns all decks from a user id
  //@ts-ignore
  public async getUserDecks(userId: string): Promise<Deck[]> {
    const decks: Deck[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { userId },
      false
    );
    return decks;
  }

  //this function creates a deck and returns it with the new setted values
  //@ts-ignore
  public async createDeck(deck: Omit<Deck, "id", "cards">): Promise<Deck> {
    if (
      !deck ||
      !deck.userId ||
      !deck.name
    ) {
      const error = new Error("Datos de la sesión inválidos");
      (error as any).statusCode = 400;
      throw error;
    }
    const newDeck: Deck = {
      ...deck,
      id: v4(),
    };

    //append the new sessions to the csv
    await fileUtils.append(
      [newDeck],
      this.file_path + this.file_name,
      this.headers
    );
    return newDeck;
  }

  //this function updates a deck and returns it with the new setted values
  //@ts-ignore
  public async updateDeck(
    deck: Omit<Deck, "id" | "userId">,
    id: string
  ): Promise<Deck> {
    const decks: Deck[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      false
    );
    const newDeck: Deck = { ...deck, id: id, userId: decks[0].userId };

    const newRows = await fileUtils.update(
      this.file_path + this.file_name,
      "id",
      id,
      newDeck
    );

    await fileUtils.create(
      this.file_path + this.file_name,
      newRows,
      this.headers
    );

    return newDeck;
  }
}

export default new DeckModel();
