const fs = require('fs/promises');

class CountryLookup {
  constructor(pathToBinFile) {
    this.pathToBinFile = pathToBinFile;
  }

  /*
   The binary is packed as follows:
   c1 = country code character 1
   c2 = country code character 2

   n.c1.c2: if n is < 240
   242.n2.n3.c1.c2: if n >= 240 but < 65536. n2 being lower order byte
   243.n2.n3.n4.c1.c2: if n >= 65536. n2 being lower order byte
  */   
  async init() {
    const buffer = await fs.readFile(this.pathToBinFile);
    
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

    const ipNumber = parseInt(components[0]) << 24 + 
      parseInt(components[1]) << 16 + 
      parseInt(components[2]) << 8 +
      parseInt(components[3]);

    return lookupNumeric(ipNumber);
  }

  lookupNumeric(ipNumber) {
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