import { v4 } from "uuid";
import { Deck } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import Model from "./index.model";

/**
 * @class DeckModel is the class that manages the decks
 * @extends Model
 * @public
 */

class DeckModel extends Model {
  
  /**
   * @constructor create the file if it doesn't exist
   * @param {string} file_name
   * @param {string[]} headers
   * @param {string} file_path
   * @returns {void}
   * 
   */
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

  
  //@ts-ignore
  /**
   * 
   * @param {string} userId
   * @returns {Promise<Deck[]>} decks
   * this function returns all the decks of a user
   */
  public async getUserDecks(userId: string): Promise<Deck[]> {
    const decks: Deck[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { userId },
      false
    );
    return decks;
  }

  //@ts-ignore
  /** 
   * this function creates a deck and returns it with the new setted values
   * @method createDeck
   * @param {Omit<Deck, "id">} deck
   * @returns {Promise<Deck>} newDeck
   * 
  */
  public async createDeck(deck: Omit<Deck, "id">): Promise<Deck> {
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

  
  //@ts-ignore
  /**
   * this function updates a deck and returns it with the new setted values
   * @method updateDeck
   * @param {Omit<Deck, "id" | "userId">} deck
   * @param {string} id
   * @returns  {Promise<Deck>} newDeck
   */
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
