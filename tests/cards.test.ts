import { Card } from "../src/interfaces/db.interface";
import { router } from "../src/routes";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';


const card ={
    
    "userId": "10",
    "deckId": "10",
    "front": "front",
    "back": "back",
} 
    


    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(router).post("/").send(card);
    expect(response.statusCode).toBe(201);
});
})

