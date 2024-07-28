import {UserRepository} from "../src/user-repository.js";
import {UserService} from "../src/user-service.js";

jest.mock("../src/user-repository.js");

const repository = new UserRepository();
const service = new UserService(repository);

test("test mock user save", () => {
    const user = {
        id: 1,
        name: "Ade"
    };

    service.save(user);

    expect(repository.save).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalledWith(user);
});

test("test mock user findById", () => {
    const user = {
        id: 1,
        name: "Ade"
    };
    repository.findById.mockReturnValue(user);
    expect(repository.findById(1)).toEqual(user);
    expect(repository.findById).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalledWith(1);
});

test("test mock user findAll", () => {
    const users = [
        {id:1, name: "Ade"},
        {id:2, name: "Ade"},
    ];
    repository.findAll.mockReturnValue(users);
    expect(repository.findAll()).toEqual(users);
    expect(repository.findAll).toHaveBeenCalled();
});