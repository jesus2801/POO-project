import { Card } from "../src/interfaces/db.interface";
import app from "../src/index";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';

const card:Omit<Card, "id" | "last_review" | "fibonacci"> ={
    userId: "1122222332",
    deckId: "10",
    front: "front",
    back: "back"
} 

    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/cards").send(card);
     expect(response.status).toBe(201);
});
        test("It should respond with a 400 status code", async () => { 
    const response = await request(app).post("/cards").send({});
        expect(response.status).toBe(400);})
})


const id = "3c380ee7-f02e-4a33-9dd1-1801903f115c"
describe("GET /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/cards/");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/cards/"+id);
    expect(response.statusCode).toBe(200);
});
})

describe("PUT /", () => {
    test("It should respond with a 500 status code", async () => {
    const response = await request(app).put("/cards/:IdCard").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/cards/"+id).send(card);
    expect(response.statusCode).toBe(200);
});
})


    describe("DELETE /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/cards/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/cards/"+id);
    expect(response.statusCode).toBe(200);
});
})