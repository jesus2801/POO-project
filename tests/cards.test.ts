import { Card } from "../src/interfaces/db.interface";
import app from "../src/index";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';


const card:Omit<Card, "id" | "last_review" | "fibonacci"> ={
    userId: "10",
    deckId: "10",
    front: "front",
    back: "back"
} 
const id= "f4feb3af-729f-4ceb-8e62-e86ad8f43f0a";

    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/").send(card);
     expect(response.status).toBe(201);
});
   test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/").send({});
        expect(response.statusCode).toBe(400);})
})

describe("GET /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/:iDDeck").send("123");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/:iDDeck").send(id);
    expect(response.statusCode).toBe(200);
});
})

describe("PUT /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/:IdCard").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/:IdCard").send(id);
    expect(response.statusCode).toBe(200);
});
})


    describe("DELETE /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/:IdCard").send("123");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/:IdCard").send(id);
    expect(response.statusCode).toBe(200);
});
})