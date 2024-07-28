import {UserRepository} from "../src/user-repository.js";
import {UserService} from "../src/user-service.js";

const repository = new UserRepository();
const service = new UserService(repository);

test("test mock class findById", () => {
    const user = {
        id: 1,
        name: "Ade"
    };
    const findByIdMock = jest.spyOn(repository, "findById");
    findByIdMock.mockReturnValue(user);

    expect(service.findById(1)).toEqual(user);
    expect(repository.findById).toHaveBeenCalled();
    expect(findByIdMock).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalledWith(1);
    expect(findByIdMock).toHaveBeenCalledWith(1);
})

it.failing("test mock partial findAll", () => {
    const users = service.findAll();
})