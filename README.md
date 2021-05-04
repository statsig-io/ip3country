# ip3country

This is a no-dependency, super small, IP to 2-letter [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) lookup library. There are already several libraries available, but none met our requirements for binary size and speed.

The database used in this project is compacted from IP2Location (https://lite.ip2location.com/database/ip-country). Their DB1.LITE edition is provided under CCA, with the attribution below:

---

**NOTE**

This site or product includes IP2Location LITE data available from <a href="https://lite.ip2location.com">https://lite.ip2location.com</a>.

---

## Usage

```js
// Setup
const CountryLookup = require('CountryLookup');

const map = new CountryLookup();
await map.init();

// Lookup using ip4 str
map.lookupStr('123.45.67.8'); // 'KR'.

// Lookup using numeric ip
console.log(map.lookupNumeric(2066563848));
```

## Name

All variantes of "ip2country" were already taken in npm, so we decided to step it up.
