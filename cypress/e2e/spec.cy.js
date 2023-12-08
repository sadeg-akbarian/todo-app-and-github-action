/// <reference types="cypress" />

function createTodos() {
  cy.get("#new-todo").type("learn cypress");
  cy.get("#add-todo").click();
  cy.get("#new-todo").type("learn html");
  cy.get("#add-todo").click();
  cy.get("#new-todo").type("learn css");
  cy.get("#add-todo").click();
  cy.get("#new-todo").type("learn javascript");
  cy.get("#add-todo").click();
  cy.get("li").should("have.length", 4);
  cy.get("li:nth-child(1)").should("have.text", "learn cypress");
  cy.get("li:nth-child(2)").should("have.text", "learn html");
  cy.get("li:nth-child(3)").should("have.text", "learn css");
  cy.get("li:nth-child(4)").should("have.text", "learn javascript");
  cy.get("#todo-list").get("li").contains("learn html").find("input").click();
  cy.get("#todo-list")
    .get("li")
    .contains("learn javascript")
    .find("input")
    .click();
  cy.get("#todo-list")
    .get("li")
    .contains("learn javascript")
    .should("have.class", "done");
}

describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have input field", () => {
    cy.get("#new-todo").should("exist");
  });

  it("should add new elements", () => {
    cy.get("#new-todo").type("learn cypress");
    cy.get("#add-todo").click();
    cy.get("#todo-list").get("li").should("have.length", 1);
  });

  it("Show open Todos", () => {
    createTodos();
    cy.get("#filter-open").click();
    cy.get("li:nth-child(1)").should("not.have.attr", "hidden");
    cy.get("li:nth-child(2)").should("have.attr", "hidden");
    cy.get("li:nth-child(3)").should("not.have.attr", "hidden");
    cy.get("li:nth-child(4)").should("have.attr", "hidden");
  });

  it("Show done Todos", () => {
    createTodos();
    cy.get("#filter-done").click();
    cy.get("li:nth-child(1)").should("have.attr", "hidden");
    cy.get("li:nth-child(2)").should("not.have.attr", "hidden");
    cy.get("li:nth-child(3)").should("have.attr", "hidden");
    cy.get("li:nth-child(4)").should("not.have.attr", "hidden");
  });

  it("Show all Todos", () => {
    createTodos();
    cy.get("#filter-done").click();
    cy.get("#filter-all").click();
    cy.get("li:nth-child(1)").should("not.have.attr", "hidden");
    cy.get("li:nth-child(2)").should("not.have.attr", "hidden");
    cy.get("li:nth-child(3)").should("not.have.attr", "hidden");
    cy.get("li:nth-child(4)").should("not.have.attr", "hidden");
  });

  it("Delete all Todos", () => {
    createTodos();
    cy.get("#filter-done").click();
    cy.get("#filter-all").click();
    cy.get("#delete-todos").click();
    cy.get("li").should("have.length", 2);
  });

  it("Blur an element", () => {
    cy.get("#new-todo").as("deg").focus();
    cy.get("@deg").should("have.focus");
    cy.get("@deg").blur();
    cy.get("@deg").should("not.have.focus");
  });

  it("Uncheck a checkbox", () => {
    cy.get("#new-todo").type("learn cypress");
    cy.get("#add-todo").click();
    cy.get("#todo-list").get("li").find("input").check();
    cy.get("#todo-list").get("li").should("have.class", "done");
    cy.get("#todo-list").get("li").find("input").uncheck();
    cy.get("#todo-list").get("li").should("not.have.class", "done");
  });
});
