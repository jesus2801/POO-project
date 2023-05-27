import { Card } from "../src/interfaces/db.interface";
import app from "./indextest";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';
import { User } from "../src/interfaces/db.interface";
import { Task } from "../src/interfaces/db.interface";
import { Session } from "../src/interfaces/db.interface";
import { Goal } from "../src/interfaces/db.interface";
import { Deck } from "../src/interfaces/db.interface";
import {extraerPrimeraFila} from "./sentings";
import { Habit } from "../src/interfaces/db.interface";
const card:Omit<Card, "id" | "last_review" | "fibonacci"> ={
    userId: "10",
    deckId: "10",
    front: "front",
    back: "back"
} 
const cid= "1677f4b2-9324-427a-aaf3-8a27dc78edf2";

    describe("POST /cards", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/cards").send(card);
     expect(response.status).toBe(201);
});
    test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/cards").send({});
    expect(response.status).toBe(400);
});
})

const newcard= extraerPrimeraFila('../db/cards.csv').then((data)=>{
    return data[0];
})


describe("GET /cards", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/cards/").send("123");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/cards/"+newcard);
    expect(response.statusCode).toBe(200);
});
})

describe("PUT /cards", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/cards/:IdCard").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/cards/"+newcard).send(card);
    expect(response.statusCode).toBe(200);
});
})


    describe("DELETE /cards", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/cards/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/cards/"+newcard);
    expect(response.statusCode).toBe(200);
});
})






const user: Omit<User, "id"> = {
    name: "Pipe Santos",
    password: "password123",
  };
  
  const uid = "03c609ca-d7dd-44e1-ba44-d08c631d1668";
  
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
  
const newUser= extraerPrimeraFila('../db/users.csv').then((data)=>{
    return data[0];
}
)

  describe("GET /users/:userId", () => {
    test("It should respond with a 404 status code", async () => {
      const response = await request(app).get("/users/")
      expect(response.statusCode).toBe(404);
    });
  
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).get("/users/"+newUser);
      expect(response.statusCode).toBe(200);
    });
  });
  
  describe("PUT /users/:userId", () => {
    test("It should respond with a 404 status code", async () => {
      const response = await request(app).put("/users/:id").send("123");
      expect(response.statusCode).toBe(500);
    });
  
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).put("/users/"+newUser).send(user);
      expect(response.statusCode).toBe(200);
    });
  });
  
  describe("DELETE /users/:userId", () => {
    test("It should respond with a 404 status code", async () => {
      const response = await request(app).delete("/users/");
      expect(response.statusCode).toBe(404);
    });
  
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).delete("/users/"+newUser);
      expect(response.statusCode).toBe(200);
    });
  });
  



const task: Omit<Task, "id" | "done"> ={
    userId: "10",
    content: "content",
    category: "category",
    date: "date"
    
} 
const tid= "5c91633c-81bb-41d2-9ea9-9ad982498543";

    describe("POST /tasks", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/tasks").send(task);
     expect(response.status).toBe(201);
});
    test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/tasks").send({});
    expect(response.status).toBe(400);
});
   
})

const newtask= extraerPrimeraFila('../db/tasks.csv').then((data)=>{ 
  console.log("se esta haciondo la prueba");
    return data[0];
}
)

describe("GET /tasks", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/tasks/").send("123");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks/"+newtask);
    expect(response.statusCode).toBe(200);
});
})

describe("PUT /tasks", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/tasks/:content").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/tasks/"+newtask).send(task);
    expect(response.statusCode).toBe(200);
});
})


    describe("DELETE /tasks", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/tasks/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/tasks/"+newtask);
    expect(response.statusCode).toBe(200);
});
})





const session:Omit<Session, "id"> ={
      "userId": "24",
      "duration": "45",
      "reviewed_cards": 2,
      "reached_goals": 4,
      "initDate": "2021-05-05",
      "endDate": "2021-05-05",
} 

    describe("POST /sessions", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/sessions").send(session);
     expect(response.status).toBe(201);
});
        test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/sessions").send({});
        expect(response.status).toBe(400);
});
})

const sid = "24"
describe("GET /sessions", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/sessions/");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/sessions/"+sid);
    expect(response.statusCode).toBe(200);
});
})

describe("DELETE /sessions", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/sessions/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/sessions/"+sid);
    expect(response.statusCode).toBe(200);
});
})




const goal  = {
  "userId": "juan pedro",
  "title": "liberacion bolivariana",
  "description": "liberar a venezuela",
}

const id= "06696340-b0a1-4daf-956c-5c319b3e9537";

    describe("POST /goals", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/goals").send(goal);
        expect(response.status).toBe(201);
});     
        test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/goals").send({title: "liberacion bolivariana"});
        expect(response.status).toBe(400);
});
})
 const newgoal= extraerPrimeraFila('../db/goals.csv').then((data)=>{
    return data[0];
})

describe("GET /goals", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/goalsa/");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/goals/"+newgoal);
    expect(response.statusCode).toBe(200);
});
}
)

describe("DELETE /goals", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/goals/"+newgoal);
    expect(response.statusCode).toBe(200);
});
}
)


const deck: Omit<Deck, "id"> = {
    userId: "012e9ee4-5659-4551-8760-5612e6adb31e",
    name: "Deck 1",
};

const did = "9a57f0d8-9681-4440-8f6f-e17ba6eff5c6";
console.log("Userid: " + deck.userId);
describe("POST /decks", () => {
  test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/decks").send(deck);
    expect(response.status).toBe(201);
  });
  test ("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/decks").send({});
    expect(response.status).toBe(400);
  })
});
const newdeck = extraerPrimeraFila('../db/decks.csv').then((data)=>{
    return data[0];
})

    

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
    const response = await request(app).put("/decks/" +newdeck).send(deck);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /decks/:id", () => {
    test("It should respond with a 404 status code", async () => {
        const response = await request(app).delete("/decks/");
        expect(response.statusCode).toBe(404);
    });
    
    test("It should respond with a 200 status code", async () => {
        const response = await request(app).delete("/decks/" + newdeck);
        expect(response.statusCode).toBe(200);
    });
    })

    const habit: Omit<Habit, "id"|"fullfilled"> = {
      userId: "012e9ee4-5659-4551-8760-5612e6adb31e",
      name: "Habit 1"
    }
  
describe("POST /habits", () => {
  test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/habits").send(habit);
    expect(response.status).toBe(201);
  });
  test ("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/habits").send({});
    expect(response.status).toBe(400);
  })
}
);
const newhabit = extraerPrimeraFila('../db/habits.csv').then((data)=>{
  return data[0];})

describe("GET /habits/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/habits/")
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/habits/" + habit.userId);
    expect(response.statusCode).toBe(200);
  });
}
);

describe("PUT /habits/:id", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).put("/habits/:id").send("123");
    expect(response.statusCode).toBe(500);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/habits/" + newhabit).send(habit);
    expect(response.statusCode).toBe(200);
  });
}
);

describe("DELETE /habits/:id", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/habits/");
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/habits/" + newhabit);
    expect(response.statusCode).toBe(200);
  });
})
