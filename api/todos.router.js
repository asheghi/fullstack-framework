import express from 'express'
import {authenticateRequest, authGuard} from "./auth/auth.middleware.js";
import {getRepository} from "../lib/db-repository.js";
import bodyParser from "body-parser";

const app = express.Router();
app.use(bodyParser.json());

const Todos = getRepository('Todos')

app.get('/', (req, res) => {
  res.json(Todos.find());
})

app.use(authenticateRequest, authGuard);

app.post('/', (req, res) => {
  res.json(Todos.create(req.body));
})

app.delete('/:id', (req, res) => {
  res.json(Todos.deleteOne(req.params.id))
})

app.post('/:id/toggle', (req, res) => {
  const todo = Todos.findOne(req.params.id);
  res.json(Todos.updateOne(req.params.id, {done: !!!todo.done}))
})


export const TodosRouter = app;
