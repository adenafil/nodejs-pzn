import {getBalance} from "../src/async.js";

test("mock async function", async () => {
    const from = jest.fn().mockResolvedValueOnce(1000);
    await expect(getBalance("Ade", from)).resolves
        .toEqual({name: "Ade", balance: 1000});

    expect(from.mock.calls.length).toBe(1);
    await expect(from.mock.results[0].value).resolves.toBe(1000);
});

it.failing("mock async function rejected",async () => {
    const from = jest.fn().mockRejectedValueOnce(new Error("Ups"));
    await getBalance("Ade", from);
})

it("mock async function matchers",async () => {
    const from = jest.fn();
    // from.mockRejectedValueOnce(new Error("Ups"))
    // expect(() => getBalance("Ade", from)).rejects.toThrow("Ups");

    from.mockRejectedValueOnce("Rejected")
    await expect(() => getBalance("Ade", from)).rejects.toBe("Rejected");

})