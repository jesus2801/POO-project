import { db_path } from "../config/db.config";
import { Card } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";

class CardModel {
    file_name: string;
    file_path: string;

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "cards.csv";
        this.file_path = db_path;
        fileUtils.createEmptyFile(this.file_name, this.file_path)
    }

    //USE THROW FOR ERROR HANDLING

    //this functions returns all cards from a deck id
    //@ts-ignore
    public async getDeckCards(deckId: number): Promise<Card[]> {}

    //this function creates a card and returns it with the new setted values:
    //last_review = current date of creation
    //fibonacci = 0
    //@ts-ignore
    public async createCard(card: Omit<Card, "id" | "last_review" | "fibonacci">): Promise<Card> {}

    //this function updates a card and returns it with the new setted values
    //@ts-ignore
    public async updateCard(card: Omit<Card, "id" | "userId">): Promise<Card> {}

    //this function deletes a card
    public async deleteCard(id: number): Promise<void> {}
}

export default new CardModel();