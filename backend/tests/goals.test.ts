import { Goal } from "../src/interfaces/db.interface";
import app from "../src/index";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';

const goal = {
    "userId":"juan pedro", 
    "title":"liberacion bolivariana", 
    "description":"liberar a venezuela"
}

const id= "786d55d0-f198-4204-84ea-7104e2a42e76";

    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/goals").send(goal);
        expect(response.status).toBe(201);
});

})

describe("GET /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/goalsa/");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/goals/"+id);
    expect(response.statusCode).toBe(200);
});
}
)

describe("DELETE /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/goals/"+id);
    expect(response.statusCode).toBe(200);
});
}
)
