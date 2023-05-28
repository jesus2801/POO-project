export interface User {
  id: string;
  name: string;
  password: string; //user password
}

export interface Goal {
  id: string;
  userId: string;
  time: string; // HH:MM:SS format
  date: string; // date when the task was completed
  done: boolean;
  category: "g" | "s"; // g = general, s = per session
  sessionId?: string; //if category = 's' then sessionId points to the session id this goal belongs
}

export interface Session {
  id: string;
  userId: string;
  reviewed_cards: number; //number of cards reviewed
  reached_goals: number; //number of goals achieved after finishinng the session
  initDate: Date;
  endDate: Date;
}

export interface Card {
  id: string;
  userId: string;
  deckId: string;
  front: string;
  back: string;
  last_review: string; //date
  fibonacci: number;
}

export interface Task {
  id: string;
  userId: string;
  content: string;
  category: string;
  done: boolean;
  date: Date;
}

export interface BackendTask {
  id: string;
  userId: string;
  content: string;
  category: string;
  done: string;
  date: string;
}

export interface Deck {
  id: string;
  userId: string;
  name: string;
}
