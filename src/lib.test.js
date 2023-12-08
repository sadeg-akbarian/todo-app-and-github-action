///<reference types="jest" />

import { isDuplicate } from "./lib";

describe("Testing the todo-app", function () {
  const theTodoList = [
    {
      todo: "Reading",
      done: false,
    },
    {
      todo: "Walking",
      done: false,
    },
    {
      todo: "Swimming",
      done: false,
    },
  ];

  it("should return true with the same casing", () => {
    const newToDo = "Walking";
    const theResult = isDuplicate(newToDo, theTodoList);
    expect(theResult).toBe(true);
  });

  it("should return true with different casing", () => {
    const newToDo = "waLkIng";
    const theResult = isDuplicate(newToDo, theTodoList);
    expect(theResult).toBe(true);
  });

  it("should return false", () => {
    const newToDo = "Jumping";
    const theResult = isDuplicate(newToDo, theTodoList);
    expect(theResult).toBe(false);
  });
});
