import { Card } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";
import Model from "./index.model";


/**
 * @class CardModel is the class that manages the cards
 * @extends Model
 * @public
 * @version 1.0.0
 * 
 */

class CardModel extends Model {
  /**
   * create the file if it doesn't exist
   * @constructor
   */
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
    this.startFile();
  }

  
  //@ts-ignore
  /**
   * @description this function returns all the cards of a deck by its id
   * @method getDeckCards
   * @param {<string>} id
   * @returns {Promise<Card[]>} 
   * 
   */
  public async getDeckCards(deckId: string): Promise<Card[]> {
    const cards: Card[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { deckId },
      false
    );
    return cards;
  }

  //@ts-ignore
  /**
   * 
   * @param {Omit<Card, "id" | "last_review" | "fibonacci">} card
   * @returns {Promise<Card>} newCard
   * this function creates a card and returns it with the new setted values:
   * last_review = current date of creation
   * fibonacci = 0 
   */
  public async createCard(
    card: Omit<Card, "id" | "last_review" | "fibonacci">
  ): Promise<Card> {
    if (!card || !card.deckId || !card.back || !card.front || card.deckId.trim() === "" || card.userId.trim() === "" || card.back.trim() === "" || !card.userId) {
      const error = new Error("Datos del usuario inválidos");
      (error as any).statusCode = 400;
      throw error;
    }
    const date = new Date();
    const newCard: Card = {
      ...card,
      id: v4(),
      last_review: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
      fibonacci: 0,
    };

    /** append the new sessions to the csv */
    
    await fileUtils.append(
      [newCard],
      this.file_path + this.file_name,
      this.headers
    );
    return newCard;
  }

  //@ts-ignore
  /**
   * @method updateCard
   * this function updates a card and returns it with the new setted values
   * @param {Omit<Card, "id" | "userId">} card
   * @param {<string>} id
   * @returns {Promise<Card>} newCard
   */
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
/** 
 * @constant cardModel
 * @type {CardModel}
 * @public
 */
export default new CardModel();
