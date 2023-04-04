import { db_path } from "../config/db.config";
import { Deck } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";

class DeckModel {
    file_name: string;
    file_path: string;

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "decks.csv";
        this.file_path = db_path;
        fileUtils.createEmptyFile(this.file_name, this.file_path)
    }

    //USE THROW FOR ERROR HANDLING

    //this functions returns all decks from a user id
    //@ts-ignore
    public async getUserDecks(userId: number): Promise<Deck[]> {}

    //this function creates a deck and returns it with the new setted values
    //@ts-ignore
    public async createDeck(deck: Omit<Deck, "id">): Promise<Deck> {}

    //this function updates a deck and returns it with the new setted values
    //@ts-ignore
    public async updateDeck(deck: Omit<Deck, "id" | "userId">): Promise<Deck> {}

    //this function deletes a deck
    public async deleteDeck(id: number): Promise<void> {}
}

export default new DeckModel();