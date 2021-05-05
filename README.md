# ip3country

This is a zero-dependency, super small, IP address to 2-letter [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) lookup library. There are already several libraries available, but none met our requirements for binary size and speed.

This project in its entirety is <450KB, compared to most alternatives out there that are north of 40MB (but they provide a lot more features).

The database used in this project is compacted from [IP2Location](https://lite.ip2location.com/database/ip-country). Their DB1.LITE edition is provided under CCA, with the attribution below:

---

**NOTE**

This site or product includes IP2Location LITE data available from <a href="https://lite.ip2location.com">https://lite.ip2location.com</a>.

---

## Usage

```js
// Setup
const ip3country = require("ip3country");

await ip3country.init();

// Or if you want sync
// ip3country.initSync();

// Lookup using ip4 str
ip3country.lookupStr("123.45.67.8"); // 'KR'.

// Lookup using numeric ip
console.log(ip3country.lookupNumeric(2066563848));
```

## Accuracy

`ip3country`'s accuracy is dependent on IP2Location LITE's accuracy. In our experience, for country lookups, it is accurate enough for most applications.

IP2Location publishes accuracy reports here: https://www.ip2location.com/data-accuracy

There's also this third party report available: https://www.cl.cam.ac.uk/~nz247/publications/JSAC2011-Geolocation.pdf

## Name

All variants of "ip2country" were already taken in npm, so we decided to step it up.
