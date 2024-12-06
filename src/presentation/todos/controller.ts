import { Request, Response } from "express";

const todos = [
  { id: 1, text: "text 11", completedAt: new Date() },
  { id: 2, text: "text 22", completedAt: null },
  { id: 3, text: "text 33", completedAt: new Date() },
  { id: 4, text: "text 44", completedAt: new Date() },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
    return;
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: `TODO with id ${id} not found.` });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found.` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: "Text propery is required." });
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };

    todos.push(newTodo);

    res.send(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: `TODO with id ${id} not found.` });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.status(404).json({ error: `Todo with id ${id} not found.` });
      return;
    }

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ error: `TODO with id ${id} not found.` });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      res.status(404).json({ error: `TODO with id ${id} not found.` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.json(todo);
  };
}
