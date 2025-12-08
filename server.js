const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

let todos = [];

// Serve main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "todolist.html"));
});

// Get todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add todo
app.post('/add-item', (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: Date.now(),
    text
  };
  todos.push(newTodo);
  res.json({ todos });
});

// Delete todo
app.delete('/delete-item/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.json({ todos });
});

// Edit todo
app.put('/edit-item/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  todos = todos.map(todo =>
    todo.id == id ? { ...todo, text } : todo
  );

  res.json({ todos });
});

// Render requires PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
