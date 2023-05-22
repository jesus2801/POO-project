/*import { router } from "../src/routes/goals.routes";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';

const goal = {
    userId: "10",
    deckId: "10",
    goal: 10,
    current: 5
}

const id= "10";

    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(router).post("/").send(goal);
        expect(response.status).toBe(201);
});
    test("It should respond with a 400 status code", async () => {
    const response = await request(router).post("/").send({});
        expect(response.statusCode).toBe(400);} 
    )
})

describe("GET /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(router).get("/").send(id);
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(router).get("/").send("id");
    expect(response.statusCode).toBe(200);
});
}
)

describe("DELETE /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(router).delete("/").send(id);
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(router).delete("/").send("id");
    expect(response.statusCode).toBe(200);
});
}
)
/*