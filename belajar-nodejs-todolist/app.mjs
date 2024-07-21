import http from 'http';
import {TodolistService} from './todolist-service.mjs';

const service = new TodolistService();
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        service.getTodoList(req, res);
    } else if (req.method === 'POST') {
        service.createTodo(req, res);
    } else if (req.method === 'PUT') {
        service.updateTodo(req, res);
    }
})

server.listen(3000);