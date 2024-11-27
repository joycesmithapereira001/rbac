

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Sample Users Data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
];

// Sample Roles Data
const roles = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'User', permissions: ['read'] },
];

// Sample Permissions Data
const permissions = [
  { id: 1, name: 'read', description: 'Can read data' },
  { id: 2, name: 'write', description: 'Can write data' },
];

// Routes to get data
app.get('/users', (req, res) => res.json(users));
app.get('/roles', (req, res) => res.json(roles));
app.get('/permissions', (req, res) => res.json(permissions));

// CRUD Operations for Users

// Create a new user
app.post('/users', (req, res) => {
  const { name, email, role, status } = req.body;

  // Basic validation to ensure required fields are provided
  if (!name || !email || !role || !status) {
    return res.status(400).send('Missing required fields: name, email, role, and status');
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).send('User with this email already exists');
  }

  // Generate new ID (based on existing users length)
  const newId = users.length ? users[users.length - 1].id + 1 : 1;

  // Create the new user object
  const newUser = { id: newId, name, email, role, status };

  // Add the new user to the array
  users.push(newUser);

  // Respond with the newly added user
  res.status(201).json(newUser);
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  user.status = req.body.status || user.status;

  res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Server listens on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
