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
    });

    it("should support set data structure", async () => {
        await redis.sadd("names", "ade");
        await redis.sadd("names", "ade");
        await redis.sadd("names", "ade");
        await redis.sadd("names", "nafil");
        await redis.sadd("names", "nafil");
        await redis.sadd("names", "nafil");
        await redis.sadd("names", "firmansah");
        await redis.sadd("names", "firmansah");
        await redis.sadd("names", "firmansah");

        expect(await redis.scard("names")).toBe(3);
        const names = await redis.smembers("names");
        expect(names).toEqual(["ade", "nafil", "firmansah"]);

        await redis.del("names");
    });

    it("should support sorted set", async () => {
        await redis.zadd("names", 100, "ade")
        await redis.zadd("names", 85, "nafil")
        await redis.zadd("names", 95, "firmansah")

        expect(await redis.zcard("names")).toBe(3);
        const names = await redis.zrange("names", 0, -1);
        expect(names).toEqual(["nafil", "firmansah", "ade"]);

        expect(await redis.zpopmax("names")).toEqual(["ade", "100"]);
        expect(await redis.zpopmin("names")).toEqual(["nafil", "85"]);
        expect(await redis.zpopmax("names")).toEqual(["firmansah", "95"]);

        await redis.del("names");

    });

    it("should support hash", async () => {
        await redis.hset("user:1", {
            "id": "1",
            "name": "ade",
            "email": "ade@example.com"
        });

        const user = await redis.hgetall("user:1");

        expect(user).toEqual({
            "id": "1",
            "name": "ade",
            "email": "ade@example.com"
        });

        await redis.del("user:1");
    });

    it("should support geo point", async () => {
        await redis.geoadd("sellers", 112.32647942087574, -7.1040403794892155,"Toko A");
        await redis.geoadd("sellers", 112.2595314912293,-7.0907533893871975, "Toko B");


        const distance = await redis.geodist("sellers", "Toko A", "Toko B", "KM");
        expect(distance).toBe("7.5357");

        const result = await redis.geosearch("sellers", "fromlonlat",112.34295891125026, -7.065711482107327, "byradius", 10, "KM");
        expect(result).toEqual(["Toko B", "Toko A"])
    })
})