import util from 'util';

const firstName = 'ade';
const lastName = 'nafil';

console.log(util.format("Hello %s %s", firstName, lastName));

const person = {
    firstName: 'ade',
    lastName: 'nafil',
}

console.info(util.format("Hello %j", person));