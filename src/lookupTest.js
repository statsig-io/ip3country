const CountryLookup = require('./CountryLookup');

async function runExhaustiveTests() {
  const lookup = new CountryLookup();
  await lookup.init();
  console.dir(lookup);

  for (var ii = 1; ii < lookup.ipRanges.length; ii++) {
    const max = lookup.ipRanges[ii];
    const min = lookup.ipRanges[ii - 1];
    const expected = lookup.countryCodes[ii];

    let failed = false;
    for (var jj = min; jj < max; jj++) {
      const result = lookup.lookupNumeric(jj);      
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

async function runRandomTests() {
  const lookup = new CountryLookup();
  await lookup.init();
  console.dir(lookup);

  for (var ii = 1; ii < lookup.ipRanges.length; ii++) {
    const max = lookup.ipRanges[ii];
    const min = lookup.ipRanges[ii - 1];
    const expected = lookup.countryCodes[ii];

    let failed = false;
    verify(lookup.lookupNumeric(min), expected);
    verify(lookup.lookupNumeric(max - 1), expected);
    for (var jj = 0; jj < 100; jj++) {
      const index = min + Math.floor(Math.random() * (max - min));
      verify(lookup.lookupNumeric(index), expected);
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
