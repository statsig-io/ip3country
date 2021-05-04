# ip3country

This is a no-dependency, super light, IP to 2-letter [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) lookup. We chose to name it ip3country because all variants of "ip to country" were already taken, though they didn't meet our requirements for binary size and/or speed.

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
