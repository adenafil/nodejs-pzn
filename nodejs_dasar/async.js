function samplePromise() {
    return Promise.resolve("Ade");
}

async function run() {
    const name = await samplePromise("ade");
    console.info(name);
}

run()
