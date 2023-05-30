import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

/**
 * @interface User
 * @description this interface is the schema for the user model
 */
export interface User {
  id: string;
  name: string;
  password: string; //user password
}

/**
 * @interface Goal
 * @description this interface is the schema for the goal model
 */
export interface Goal {
  id: string;
  userId: string;
  time: string; // HH:MM:SS format
  date: string; // date when the task was completed
  done: boolean;
  category: "g" | "s"; // g = general, s = per session
  sessionId?: string; //if category = 's' then sessionId points to the session id this goal belongs
  description: string;
  title: string;
}

/**
 * @interface Session
 * @description this interface is the schema for the session model  
 */

export interface Session {
  id: string;
  userId: string;
  reviewed_cards: number; //number of cards reviewed
  reached_goals: number; //number of goals achieved after finishinng the session
  initDate: string;
  endDate: string;
}

/**
 * @interface Card
 * @description this interface is the schema for the card model
 */
export interface Card {
  id: string;
  userId: string;
  deckId: string;
  front: string;
  back: string;
  last_review: string; //date
  fibonacci: number;
}

/**
 * @interface Task
 * @description this interface is the schema for the task model
 */
export interface Task {
  id: string;
  userId: string;
  content: string;
  category: string;
  done: boolean;
  date: string;
}

/**
 * @interface Deck
 * @description this interface is the schema for the deck model
 */
export interface Deck {
  id: string;
  userId: string;
  name: string;
}

/**
 * @interface MasterConfig
 */
export interface MasterConfig {
  /**
   * Cluster principal
   */
  cluster: any;
}
/**
 * @interface Auth
 * @description this interface is the schema for the auth model
 */
export interface Auth {
  name: string;
  password: string;
}
/**
 * @interface Habit
 * @description this interface is the schema for the habit model
 */
export interface Habit {
  name: string;
  id: string;
  userId: string;
  fullfilled: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
  ];
}

/**
 * @interface RequestExt
 * @description this interface extends the Request interface from express
 */

export interface RequestExt extends Request {
  user?: JwtPayload | { id: string };
}
