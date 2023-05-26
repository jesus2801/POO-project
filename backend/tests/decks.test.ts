import { Deck } from "../src/interfaces/db.interface";
import app from "./indextest";
import request from "supertest";
import { describe, expect, test } from '@jest/globals';

const deck: Omit<Deck, "id"> = {
    userId: "ec441444-7cda-4628-8ee6-cf0fe32ee5d9",
    name: "Deck 1",
};

const id = "38e45700-c267-499f-81dd-efd4e3d654d9";
console.log("Userid: " + deck.userId);
describe("POST /decks", () => {
  test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/decks").send(deck);
    expect(response.status).toBe(201);
  });
});

describe("GET /decks/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/decks/")
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/decks/" + deck.userId);
    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /decks/:id", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/decks/:id").send("123");
    expect(response.statusCode).toBe(500);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/decks/" + id).send(deck);
    expect(response.statusCode).toBe(200);
  });
});

