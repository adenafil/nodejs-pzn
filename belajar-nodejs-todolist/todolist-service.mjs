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
}