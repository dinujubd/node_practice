const dns = require('dns');

dns.lookup('prothomalo.com', (_, address) => console.log(address))
dns.reverse('23.45.232.26', (_, hostnames) => console.log(hostnames))
dns.resolve('prothomalo.com', 'A', (_, address) => console.log(address))
dns.resolveMx('prothomalo.com', 'A', (_, address) => console.log(address))