import { Card } from "../src/interfaces/db.interface";
import app from "./indextest";
import request from "supertest";
import {describe, expect, test} from '@jest/globals';
import { User } from "../src/interfaces/db.interface";
import { Task } from "../src/interfaces/db.interface";
import { Session } from "../src/interfaces/db.interface";
import { Goal } from "../src/interfaces/db.interface";
import { Deck } from "../src/interfaces/db.interface";
import { Habit } from "../src/interfaces/db.interface";

let token: string | null = null;
//jwt token
describe("registro", () => {
    test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/auth/register").send({password:"jefe1234",name:"jesus"+Math.random()})      
    expect(response.status).toBe(200);
})})

describe("login", () => {
    test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/auth/login").send({password:"jefe1234",name:"jesus"})
    expect(response.status).toBe(200);
    token=response.body.token;
})
test("It should respond with a 401 status code", async () => {
    const response = await request(app).post("/auth/login").send({password:"15652",name:"juan"})
    expect(response.status).toBe(401);

})
})
//-----------------------------------------------------------------------------------
const card:Omit<Card, "id" | "last_review" | "fibonacci"> ={
    userId: "10",
    deckId: "10",
    front: "front",
    back: "back"
} 
let Newcard: string | null=null


    describe("POST /cards", () => {
        test("It should respond with a 201 status code", async () => {
    const response = (await request(app).post("/cards").set("Authorization",token||"no existe").send(card));
    Newcard=response.body.id;
     expect(response.status).toBe(201);
});
    test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/cards").set("Authorization",token||"no existe").send({});
    expect(response.status).toBe(400);
});

    test("It should respond with a 403 status code", async () => {
      const response = await request(app).post("/cards").send(card);
      expect(response.status).toBe(403);
    });
})



describe("GET /cards", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/cards/").set("Authorization",token||"no existe").send("123");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/cards/"+Newcard).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
test("It should respond with a 403 status code", async () => {
  const response = await request(app).get("/cards/"+Newcard);
  expect(response.statusCode).toBe(403);
});
})

describe("PUT /cards", () => {
    test("It should respond with a 500 status code", async () => {
    const response = await request(app).put("/cards/:IdCard").set("Authorization",token||"no existe").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/cards/"+Newcard).set("Authorization",token||"no existe").send(card);
    expect(response.statusCode).toBe(200);
});
test("It should respond with a 403 status code", async () => {
  const response = await request(app).put("/cards/"+Newcard).send(card);
  expect(response.statusCode).toBe(403);
})})


    describe("DELETE /cards", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/cards/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/cards/"+Newcard).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
test("It should respond with a 200 status code", async () => {
  const response = await request(app).delete("/cards/"+Newcard);
  expect(response.statusCode).toBe(403);
})})





//-------------------------------------------------------------------------
const user: Omit<User, "id"> = {
    name: "Pipe Santos",
    password: "password123",
  };
  
  let newUser: string | null = null;
  describe("POST /users", () => {
    test("It should respond with a 201 status code", async () => {
      const response = await request(app).post("/users").send(user).set("Authorization",token||"no existe");
      newUser = response.body.id;
      expect(response.status).toBe(201);
    });
    
    test("It should respond with a 400 status code", async () => {
      const response = await request(app).post("/users").send({}).set("Authorization",token||"no existe");
      expect(response.status).toBe(400);
    });
    test("It should respond with a 403 status code", async () => {
      const response = await request(app).post("/users").send(user);
      expect(response.status).toBe(403);})
  });
  



  describe("GET /users/:userId", () => {
    test("It should respond with a 404 status code", async () => {
      const response = await request(app).get("/users/").set("Authorization",token||"no existe")
      expect(response.statusCode).toBe(404);
    });
  
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).get("/users/"+newUser).set("Authorization",token||"no existe");
      expect(response.statusCode).toBe(200);
    });

    test("It should respond with a 403 status code", async () => {
      const response = await request(app).get("/users/"+newUser);
      expect(response.statusCode).toBe(403);
    })
  });
  
  describe("PUT /users/:userId", () => {
    test("It should respond with a 500 status code", async () => {
      const response = await request(app).put("/users/:id").set("Authorization",token||"no existe").send("123");
      expect(response.statusCode).toBe(500);
    });
  
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).put("/users/"+newUser).set("Authorization",token||"no existe").send(user);
      expect(response.statusCode).toBe(200);
    })
    test("It should respond with a 403 status code", async () => {
      const response = await request(app).put("/users/"+newUser).send(user);
      expect(response.statusCode).toBe(403);
    })
  });
  
  describe("DELETE /users/:userId", () => {
    test("It should respond with a 404 status code", async () => {
      const response = await request(app).delete("/users/").set("Authorization",token||"no existe");
      expect(response.statusCode).toBe(404);
    });
  
    test("It should respond with a 200 status code", async () => {
      const response = await request(app).delete("/users/"+newUser).set("Authorization",token||"no existe");
      expect(response.statusCode).toBe(200);
    });
    test("It should respond with a 403 status code", async () => {
      const response = await request(app).delete("/users/"+newUser);
      expect(response.statusCode).toBe(403);
    })
  });
  


//--------------------------------------------------------------------
const task: Omit<Task, "id" | "done"> ={
    userId: "10",
    content: "content",
    category: "category",
    date: "date"
    
} 
let newtask: string | null=null

    describe("POST /tasks", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/tasks").set("Authorization",token||"no existe").send(task);
    newtask=response.body.id;
     expect(response.status).toBe(201);
});
    test("It should respond with a 500 status code", async () => {
    const response = await request(app).post("/tasks").set("Authorization",token||"no existe").send({});
    expect(response.status).toBe(500);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).post("/tasks").send(task);
    expect(response.status).toBe(403);
    })
   
})



describe("GET /tasks", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/tasks/"+newtask).set("Authorization",token||"no existe").send({});
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
    test ("It should respond with a 403 status code", async () => {
    const response = await request(app).get("/tasks/");
    expect(response.statusCode).toBe(403);
    })
})

describe("PUT /tasks", () => {
    test("It should respond with a 500 status code", async () => {
    const response = await request(app).put("/tasks/:content").set("Authorization",token||"no existe").send("123");
    expect(response.statusCode).toBe(500);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/tasks/"+newtask).set("Authorization",token||"no existe").send(task);
    expect(response.statusCode).toBe(200);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).put("/tasks/"+newtask).send(task);
    expect(response.statusCode).toBe(403);
    })
})


    describe("DELETE /tasks", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/tasks/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/tasks/"+newtask).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).delete("/tasks/"+newtask);
    expect(response.statusCode).toBe(403);
    })
})



//--------------------------------------------------------------------

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
    const response = await request(app).post("/sessions").set("Authorization",token||"no existe").send(session);
     expect(response.status).toBe(201);
});
        test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/sessions").set("Authorization",token||"no existe").send({});
        expect(response.status).toBe(400);
});
        test("It should respond with a 403 status code", async () => {
    const response = await request(app).post("/sessions").send(session);
    expect(response.status).toBe(403);})
})

const sid = "24"
describe("GET /sessions", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/sessions/4652").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/sessions").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).get("/sessions");
    expect(response.statusCode).toBe(403);
    })
})

describe("DELETE /sessions", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/sessions/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/sessions/"+sid).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).delete("/sessions/"+sid);
    expect(response.statusCode).toBe(403);
    })
})



//--------------------------------------------------------------------
const goal  = {
  "userId": "juan pedro",
  "title": "liberacion bolivariana",
  "description": "liberar a venezuela",
}
let newgoal: string | null=null

    describe("POST /goals", () => {
        test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/goals").set("Authorization",token||"no existe").send(goal);
    newgoal=response.body.id;
        expect(response.status).toBe(201);
});     
        test("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/goals").set("Authorization",token||"no existe").send({title: "liberacion bolivariana"});
        expect(response.status).toBe(400);
});
        test("It should respond with a 403 status code", async () => {
    const response = await request(app).post("/goals").send(goal);
    expect(response.status).toBe(403);})
    
})


describe("GET /goals", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/goalsa/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);})
        //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/goals/"+newgoal).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).get("/goals/"+newgoal);
    expect(response.statusCode).toBe(403);})
}
)

describe("DELETE /goals", () => {
    test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);
});
    //se necesita un id para que funcione
    test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/goals/"+newgoal).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
});
    test("It should respond with a 403 status code", async () => {
    const response = await request(app).delete("/goals/"+newgoal);
    expect(response.statusCode).toBe(403);})
}
)
//--------------------------------------------------------------------

const deck: Omit<Deck, "id"> = {
    userId: "012e9ee4-5659-4551-8760-5612e6adb31e",
    name: "Deck 1",
};

let newdeck: string | null = null;
console.log("Userid: " + deck.userId);
describe("POST /decks", () => {
  test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/decks").set("Authorization",token||"no existe").send(deck);
    newdeck = response.body.id;
    expect(response.status).toBe(201);
  });
  test ("It should respond with a 500 status code", async () => {
    const response = await request(app).post("/decks").set("Authorization",token||"no existe").send({});
    expect(response.status).toBe(500);
  })
  test("It should respond with a 403 status code", async () => {
    const response = await request(app).post("/decks").send(deck);
    expect(response.status).toBe(403);
  }
  );
});


    

describe("GET /decks/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/decks/").set("Authorization",token||"no existe")
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/decks/" + deck.userId).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
  });
  test ("It should respond with a 403 status code", async () => {
    const response = await request(app).get("/decks/" + deck.userId);
    expect(response.statusCode).toBe(403);
  }
  );
});

describe("PUT /decks/:id", () => {
  test("It should respond with a 500 status code", async () => {
    const response = await request(app).put("/decks/:id").set("Authorization",token||"no existe").send("123");
    expect(response.statusCode).toBe(500);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/decks/" +newdeck).set("Authorization",token||"no existe").send(deck);
    expect(response.statusCode).toBe(200);
  });
  test ("It should respond with a 403 status code", async () => {
    const response = await request(app).put("/decks/" +newdeck).send(deck);
    expect(response.statusCode).toBe(403);
  })
});

describe("DELETE /decks/:id", () => {
    test("It should respond with a 404 status code", async () => {
        const response = await request(app).delete("/decks/").set("Authorization",token||"no existe");
        expect(response.statusCode).toBe(404);
    });
    
    test("It should respond with a 200 status code", async () => {
        const response = await request(app).delete("/decks/" + newdeck).set("Authorization",token||"no existe");
        expect(response.statusCode).toBe(200);
    });
    test ("It should respond with a 403 status code", async () => {
        const response = await request(app).delete("/decks/" + newdeck);
        expect(response.statusCode).toBe(403);})
    })



//--------------------------------------------------------------------    
    const habit: Omit<Habit, "id"|"fullfilled"> = {
      userId: "012e9ee4-5659-4551-8760-5612e6adb31e",
      name: "Habit 1"
    }

  let newhabit: string | null = null;

describe("POST /habits", () => {
  test("It should respond with a 201 status code", async () => {
    const response = await request(app).post("/habits").set("Authorization",token||"no existe").send(habit);
    newhabit = response.body.id;
    expect(response.status).toBe(201);
  });
  test ("It should respond with a 400 status code", async () => {
    const response = await request(app).post("/habits").set("Authorization",token||"no existe").send({});
    expect(response.status).toBe(400);
  })
  test("It should respond with a 403 status code", async () => {
    const response = await request(app).post("/habits").send(habit);
    expect(response.status).toBe(403);
  }
  );
}
);


describe("GET /habits/:userId", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).get("/habits/").set("Authorization",token||"no existe")
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).get("/habits/" +newhabit).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
  });
  test ("It should respond with a 403 status code", async () => {
    const response = await request(app).get("/habits/" +newhabit);
    expect(response.statusCode).toBe(403);
  }
  )
}
);

describe("PUT /habits/:id", () => {
  test("It should respond with a 400 status code", async () => {
    const response = await request(app).put("/habits/:id").set("Authorization",token||"no existe").send("123");
    expect(response.statusCode).toBe(400);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).put("/habits/" + newhabit).set("Authorization",token||"no existe").send(habit);
    expect(response.statusCode).toBe(200);
  });
  test ("It should respond with a 403 status code", async () => {
    const response = await request(app).put("/habits/" + newhabit).send(habit);
    expect(response.statusCode).toBe(403);
  })
}
);

describe("DELETE /habits/:id", () => {
  test("It should respond with a 404 status code", async () => {
    const response = await request(app).delete("/habits/").set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(404);
  });

  test("It should respond with a 200 status code", async () => {
    const response = await request(app).delete("/habits/" + newhabit).set("Authorization",token||"no existe");
    expect(response.statusCode).toBe(200);
  });
  test ("It should respond with a 403 status code", async () => {
    const response = await request(app).delete("/habits/" + newhabit);
    expect(response.statusCode).toBe(403);})
})
