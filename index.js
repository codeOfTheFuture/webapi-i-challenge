const express = require('express');
const db = require('./data/db');

const app = express();

app.use(express.json());

// Get All Users
app.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Get a single user by id
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: 'The user with the specified ID does not exist.',
          });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Add a user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  db.update(id, updatedUser)
    .then(user => {
      user ? res.json(user) : res.status(404).json({ error: 'incorrect id' });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id).then(user => {
    user ? res.json(user) : res.status(404).json({ error: 'incorrect id' });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
