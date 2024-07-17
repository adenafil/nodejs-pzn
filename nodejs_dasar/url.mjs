import {URL} from 'url';

const host = new URL('https://creativehub.biz.id/?category=1')

host.searchParams.append('page', 52)

console.info(host.toString());
console.info(host.protocol);
console.info(host.host);
console.info(host.pathname);
console.info(host.searchParams);