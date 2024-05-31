import dns from 'dns/promises';

const address = await dns.lookup('www.instagram.com')
console.table(address);

