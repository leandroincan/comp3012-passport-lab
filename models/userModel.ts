import { User } from "../interfaces";

const database: User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  findOne: (email: string): User => {
    const user = database.find(
      (user) => user.email === email
    );

    if (user) {
      return user;
    }

    throw new Error(
      `Couldn't find user with email: ${email}`
    );
  },

  findById: (id: number): User => {
    const user = database.find(
      (user) => user.id === id
    );

    if (user) {
      return user;
    }

    throw new Error(
      `Couldn't find user with id: ${id}`
    );
  },

  findByGithubId: (
    githubId: string
  ): User | undefined => {
    return database.find(
      (user) => user.githubId === githubId
    );
  },

  createGithubUser: (
    githubId: string,
    name: string
  ): User => {
    const newUser: User = {
      id: database.length + 1,
      name: name,
      email: "",
      password: "",
      role: "user",
      githubId: githubId,
    };

    database.push(newUser);

    return newUser;
  },
};

export { database, userModel };