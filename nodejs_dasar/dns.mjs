import dns from 'dns/promises';

const address = await dns.lookup('www.creativehub.biz.id')
console.table(address);

