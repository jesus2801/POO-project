import { db_path } from "../config/db.config";
import { Card } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { csvOptions } from "../config/db.config";
import fs from "fs";
import fastCsv from "fast-csv";
import decksModel from "./decks.model";
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
    public async getDeckCards(deckId: number): Promise<Card[]> {
        await new Promise((resolve, reject) => {
        const rows: any[] = [];
        fs.createReadStream('cards.csv')
          .pipe(fastCsv.parse({ headers: true }))
          .on('error', (err) => reject(err))
          .on('data', (row) => rows.push(row))
          .on('end', () => {
            const newtab = rows.filter((row) => row["deckid"] === deckId);
            console.log(newtab);
          });
      });

    }
    

    //this function creates a card and returns it with the new setted values:
    //last_review = current date of creation
    //fibonacci = 0
    //@ts-ignore
    public async createCard(card: Omit<Card, "id" | "last_review" | "fibonacci">): Promise<Card> {
        let date= new Date
        const Card=[{
        id: randomUUID,
        userid:"h",
        deckId:"luego mir",
        last_review:`${date.getDay}/${date.getMonth}/${date.getFullYear}`,
        front:InputEvent,
        back:InputEvent,
        fibonacci:0,
       }]
       await new Promise((resolve, reject) => {
        const ws = fs.createWriteStream('cards.csv', { flags: 'a' });
        fastCsv.write(Card, { headers: false })
          .on('error', (err) => reject(err))
          .pipe(ws)
          .on('finish', () => resolve('Fila añadida al yugi'));
      })

    }

    //this function updates a card and returns it with the new setted values
    //@ts-ignore
    public async updateCard(card: Omit<Card, "id" | "userId">,id:number): Promise<Card> {
        let date= new Date
        await new Promise((resolve, reject) => {
            const rows: any[] = [];
            fs.createReadStream('cards.csv')
              .pipe(fastCsv.parse({ headers: true }))
              .on('error', (err) => reject(err))
              .on('data', (row) => rows.push(row))
              .on('end', () => {
                const nuevaTabla = rows.map((row) => {
                  if (row["id"] === id) {
                    row["last_review"] = `${date.getDay}/${date.getMonth}/${date.getFullYear}`;
                    row["front"]= InputEvent
                    row["back"]=InputEvent
                    row["fibonacci"]=0
                  }
                  return row;
                });
                const ws = fs.createWriteStream('cards.csv');
                fastCsv.write(nuevaTabla, { headers: true })
                  .on('error', (err) => reject(err))
                  .pipe(ws)
                  .on('finish', () => resolve('Valor cambiado en el cards CSV'));
              });
          });

    }

    //this function deletes a card
    public async deleteCard(id: number): Promise<void> {
       await new Promise((resolve, reject) => {
            const rows: any[] = [];
            fs.createReadStream('cards.csv')
              .pipe(fastCsv.parse({ headers: true }))
              .on('error', (err) => reject(err))
              .on('data', (row) => rows.push(row))
              .on('end', () => {
                const newtab = rows.filter((row) => row["id"] !== id);
                const ws = fs.createWriteStream('cards.csv');
                fastCsv.write(newtab, { headers: true })
                  .on('error', (err) => reject(err))
                  .pipe(ws)
                  .on('finish', () => resolve('Fila eliminada del cards CSV'));
              });
          });
    }
}

export default new CardModel();