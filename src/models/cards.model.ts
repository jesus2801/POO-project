import { Card } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";
import Model from "./index.model";

class CardModel extends Model {
  //create the file if it doesn't exist
  constructor() {
    super();
    this.file_name = "cards.csv";
    this.headers = [
      "id",
      "userId",
      "deckId",
      "last_review",
      "front",
      "back",
      "fibonacci",
    ];
  }

  //this functions returns all cards from a deck id
  //@ts-ignore
  public async getDeckCards(deckId: string): Promise<Card[]> {
    const cards: Card[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { deckId },
      false
    );
    return cards;
  }

  //this function creates a card and returns it with the new setted values:
  //last_review = current date of creation
  //fibonacci = 0
  //@ts-ignore
  public async createCard(
    card: Omit<Card, "id" | "last_review" | "fibonacci">
  ): Promise<Card> {
    const date = new Date();
    const newCard: Card = {
      ...card,
      id: v4(),
      last_review: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
      fibonacci: 0,
    };

    //append the new sessions to the csv
    await fileUtils.append(
      [newCard],
      this.file_path + this.file_name,
      this.headers
    );
    return newCard;
  }

  //this function updates a card and returns it with the new setted values
  //@ts-ignore
  public async updateCard(
    card: Omit<Card, "id" | "userId">,
    id: string
  ): Promise<Card> {
    const cards: Card[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      false
    );
    const newCard: Card = { ...card, id: id, userId: cards[0].userId };

    const newRows = await fileUtils.update(
      this.file_path + this.file_name,
      "id",
      id,
      newCard
    );

    await fileUtils.create(
      this.file_path + this.file_name,
      newRows,
      this.headers
    );

    return newCard;
  }
}

export default new CardModel();
