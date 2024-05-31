function samplePromise() {
    return Promise.resolve("Ade");
}

const name = await samplePromise("ade");
console.info(name);

