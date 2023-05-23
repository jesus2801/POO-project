import { User } from "../src/interfaces/db.interface";
import app from "../src/index";
import request from "supertest";
import { describe, expect, test } from '@jest/globals';

const user: Omit<User, "id"> = {
  name: "Pipe Santos",
  password: "password123",
};

const id = "016481a7-5a67-4f9c-b327-0c3f82fc390d";

describe("POST /users", () => {
  test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(201);
  });

  test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/users").send({});
    expect(response.status).toBe(400);
  });
});

describe("GET /users/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/users/")
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/users/"+id);
    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /users/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/users/:id").send("123");
    expect(response.statusCode).toBe(500);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/users/"+id).send(user);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /users/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/users/");
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/users/"+id);
    expect(response.statusCode).toBe(200);
  });
});
