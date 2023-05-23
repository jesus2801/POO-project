import { Task } from "../src/interfaces/db.interface";
import app from "../src/index";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';


const task: Omit<Task, "id" | "done"> ={
    userId: "10",
    content: "content",
    category: "category",
    date: "date"
    
} 
const id= "929e8f30-4b23-4db6-a598-049dc12141ce";

    describe("POST /", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/tasks").send(task);
     expect(response.status).toBe(201);
});
   
})

describe("GET /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/tasks/").send("123");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks/"+id);
    expect(response.statusCode).toBe(200);
});
})

describe("PUT /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/tasks/:content").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/tasks/"+id).send(task);
    expect(response.statusCode).toBe(200);
});
})


    describe("DELETE /", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/tasks/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/tasks/"+id);
    expect(response.statusCode).toBe(200);
});
})