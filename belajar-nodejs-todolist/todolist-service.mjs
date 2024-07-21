export class TodolistService {
    todolist = ["Ade", "Nafil", "Firmansah"];

    getJsonTodoList() {
        return JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todolist.map((value, index) => {
                return {
                    id: index,
                    todo: value,
                }
            }),
        });
    }

    getTodoList(req, res) {
        res.write(this.getJsonTodoList());
        res.end();
    }

    createTodo(req, res) {
        req.on('data', (data) => {
            const body = JSON.parse(data.toString());
            thi            res.write(this.getJsonTodoList());
            res.end();
            s.todolist.push(body.todo);
        })
    }

    updateTodo(req, res) {
        req.on('data', (data) => {
            const body = JSON.parse(data.toString());

            if (this.todolist[body.id]) {
                this.todolist[body.id] = body.todo;
            }

            res.write(this.getJsonTodoList());
            res.end();
        })
    };

    deleteTodo(req, res) {
        req.on('data', (data) => {
            const body = JSON.parse(data.toString());

            if (this.todolist[body.id]) {
                this.todolist.splice(body.id, 1);
            }

            res.write(this.getJsonTodoList());
            res.end();
        })
    }
}