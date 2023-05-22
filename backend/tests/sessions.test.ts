import app from "../src/index";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';
import { Session } from "../src/interfaces/db.interface";

const session:Omit<Session, "id"> ={
      "userId": "24",
      "duration": "45",
      "reviewed_cards": 2,
      "reached_goals": 4,
      "initDate": "2021-05-05",
      "endDate": "2021-05-05",
} 

    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/sessions").send(session);
     expect(response.status).toBe(201);
});
})

const id = "24"
describe("GET /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/sessions/");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/sessions/"+id);
    expect(response.statusCode).toBe(200);
});
})