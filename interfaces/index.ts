import { Strategy } from "passport";

export interface PassportStrategy {
  name: string;
  strategy: Strategy;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  githubId?: string;
}