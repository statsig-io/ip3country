# ip3country

This is a no-dependency, super lite IP to 2-letter Country code Lookup. We chose this name because ip2country and anything similar was taken already.

When you pass '123.45.67.8', you get back 'KR'.

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
map.lookupStr('123.45.67.8');

// Lookup using numeric ip
console.log(map.lookupNumeric(2066563848));
```
