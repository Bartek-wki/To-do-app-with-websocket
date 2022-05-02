const express = require('express');
const cors = require('cors')
const socket = require('socket.io');
const db = require('./db');

const app = express();

app.use(cors());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  io.to(socket.id).emit('update', db.tasks);
  socket.on('addTask', (task) => {
    db.tasks.push(task);
    socket.broadcast.emit('update', db.tasks)
  })
  socket.on('removeTask', (id) => {
    for (const task of db.tasks) {
      if (task.id === id) {
        const indexOf = db.tasks.indexOf(task);
        db.tasks.splice(indexOf, 1);
      }
    }
    socket.broadcast.emit('update', db.tasks)
  })
  socket.on('editTask', (editTask) => {
    db.tasks = db.tasks.map(task => (task.id === editTask.id ? { ...task, ...editTask } : task));
    socket.broadcast.emit('update', db.tasks)
  })
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log('I\'ve added a listener on message event \n');
});