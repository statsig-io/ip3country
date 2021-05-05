const ip3country = require('../src/ip3country');

async function runExhaustiveTests() {
  await ip3country.init();
  console.dir(ip3country);

  for (var ii = 1; ii < ip3country.ipRanges.length; ii++) {
    const max = ip3country.ipRanges[ii];
    const min = ip3country.ipRanges[ii - 1];
    const expected = ip3country.countryCodes[ii];

    let failed = false;
    for (var jj = min; jj < max; jj++) {
      const result = ip3country.lookupNumeric(jj);      
      failed = verify(result, expected, jj);
      if (failed) {
        break;
      }
    }

    if (failed) {
      break;
    }
  }
}

function runRandomTests() {
  ip3country.initSync();
  console.dir(ip3country);

  for (var ii = 1; ii < ip3country.ipRanges.length; ii++) {
    const max = ip3country.ipRanges[ii];
    const min = ip3country.ipRanges[ii - 1];
    const expected = ip3country.countryCodes[ii];

    let failed = false;
    verify(ip3country.lookupNumeric(min), expected);
    verify(ip3country.lookupNumeric(max - 1), expected);
    for (var jj = 0; jj < 100; jj++) {
      const index = min + Math.floor(Math.random() * (max - min));
      verify(ip3country.lookupNumeric(index), expected);
    }
    console.log('.');
  }
}

function verify(result, expected, index) {
  if (result === null) {
    result = '--';
  }
  if (expected === result) {
    return true;
  } else {
    console.log(`F: ${index}, ${result}, Expected: ${expected}`);
    return false;
  }
}

runRandomTests();
// runExhaustiveTests();
