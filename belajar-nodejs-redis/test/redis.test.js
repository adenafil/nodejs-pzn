import Redis from "ioredis";

describe("belajar nodejs redis", () => {

    let redis = null;

    beforeEach(async () => {
        redis = new Redis({
            host: 'localhost',
            port: "6379",
            db: 0
        })
    })

    afterEach(async () => {
        await redis.quit();
    })

    it("should can ping", async () => {
        const pong = await redis.ping();
        expect(pong).toBe("PONG");
    })

    it("should support string", async () => {
        await redis.setex("name", 2, "Ade");
        let name = await redis.get("name");
        expect(name).toBe("Ade");

        // sleep in 3 sec
        await new Promise(resolve => setTimeout(resolve, 3000));
        name = await redis.get("name");
        expect(name).toBeNull();

    })

    it("should support list", async () => {
        await redis.rpush("names", "ade");
        await redis.rpush("names", "nafil");
        await redis.rpush("names", "firmansah");

        expect(await redis.llen("names")).toBe(3);

        const names = await redis.lrange("names", 0, -1);
        expect(names).toEqual(["ade", "nafil", "firmansah"]);
        expect(await redis.lpop("names")).toBe("ade");
        expect(await redis.rpop("names")).toBe("firmansah");
        expect(await redis.llen("names")).toBe(1);

        redis.del("names");
    })
})