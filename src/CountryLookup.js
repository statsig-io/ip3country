const fs = require('fs/promises');
const path = require('path');

class CountryLookup {
  constructor() {
  }

  /*
   The binary is packed as follows:
   c1.c2.c3.....**: Country code look up table, terminated by **
   
   n1.c: if n is < 240, c is country code index
   242.n2.n3.c: if n >= 240 but < 65536. n2 being lower order byte
   243.n2.n3.n4.c: if n >= 65536. n2 being lower order byte
  */   
  async init() {
    const buffer = await fs.readFile(path.resolve(__dirname, '../bin/ip_supalite.bin'));
    
    this.countryCodes = [];
    this.ipRanges = [];
    this.countryTable = [];

    let index = 0;
    while (index < buffer.length) {
      const c1 = buffer[index++];
      const c2 = buffer[index++];
      this.countryTable.push('' + String.fromCharCode(c1) + String.fromCharCode(c2));
      if (String.fromCharCode(c1) === '*' ) {
        break;
      }
    }

    let lastEndRange = 0;
    while (index < buffer.length) {
      let count = 0;
      const n1 = buffer[index++];
      if (n1 < 240) {
        count = n1;
      } else if (n1 == 242) {
        const n2 = buffer[index++];
        const n3 = buffer[index++];
        count = n2 | n3 << 8;
      } else if (n1 == 243) {
        const n2 = buffer[index++];
        const n3 = buffer[index++];
        const n4 = buffer[index++];
        count = n2 | n3 << 8 | n4 << 16;
      }

      lastEndRange += count * 256;
      const cc = buffer[index++];
      this.ipRanges.push(lastEndRange);
      this.countryCodes.push(this.countryTable[cc]);
    }
  }

  lookupStr(ipaddrstr) {
    const components = ipaddrstr.split('.');
    if (components.length !== 4) {
      return null;
    }

    const ipNumber = parseInt(components[0]) * Math.pow(256, 3) + 
      (parseInt(components[1]) << 16) + 
      (parseInt(components[2]) << 8) +
      parseInt(components[3]);
    return this.lookupNumeric(ipNumber);
  }

  lookupNumeric(ipNumber) {
    if (!this.countryCodes) {
      throw new Error('Please call init first');
    }

    const index = this.binarySearch(ipNumber, 0, this.ipRanges.length - 1);    
    const cc = this.countryCodes[index];
    return (cc === '--' ? null : cc);
  }

  binarySearch(value, min, max) {
    if (max === min) {
      return min;
    }

    const mid = Math.floor((min + max) / 2);
    if (this.ipRanges[mid] <= value) {
      return this.binarySearch(value, mid + 1, max);
    } else {
      return this.binarySearch(value, min, mid)
    }
  }
}

module.exports = CountryLookup;