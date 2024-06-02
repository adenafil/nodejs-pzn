import timers from 'timers/promises';

// console.log(new Date());
//
// const name = await timers.setTimeout(5000, 'ade');
//
// console.info(name)
//
// console.log(new Date());

for await (const startTime of timers.setInterval(1000, new Date())) {
    console.info(`Start time at ${new Date()}`);
}