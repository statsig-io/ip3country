const ip3country = require("../src/ip3country");
const fs = require('fs');

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
      failed = !verify(result, expected, jj);
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
  ip3country.init();
  console.dir(ip3country);

  let failed = false;
  for (var ii = 1; ii < ip3country.ipRanges.length; ii++) {
    const max = ip3country.ipRanges[ii];
    const min = ip3country.ipRanges[ii - 1];
    const expected = ip3country.countryCodes[ii];

    failed |= !verify(ip3country.lookupNumeric(min), expected);
    failed |= !verify(ip3country.lookupNumeric(max - 1), expected);
    for (var jj = 0; jj < 100; jj++) {
      const index = min + Math.floor(Math.random() * (max - min));
      failed |= !verify(ip3country.lookupNumeric(index), expected);
    }
  }

  console.log(
    failed ? "---Random tests failed---" : "---Random tests passed---"
  );
}

const lookupTable = {
  "1.1.1.1": "US",
  "2.2.2.2": "FR",
  "3.3.3.3": "US",
  "4.4.4.4": "US",
  "5.5.5.5": "DE",
  "6.6.6.6": "US",
  "7.7.7.7": "US",
  "8.8.8.8": "US",
  "9.9.9.9": "US",
  "11.11.11.11": "US",
  "12.12.12.12": "US",
  "13.13.13.13": "US",
  "14.14.14.14": "JP",
  "15.15.15.15": "US",
  "16.16.16.16": "US",
  "17.17.17.17": "US",
  "18.18.18.18": "US",
  "19.19.19.19": "US",
  "20.20.20.20": "US",
  "21.21.21.21": "US",
  "22.22.22.22": "US",
  "23.23.23.23": "US",
  "24.24.24.24": "US",
  "25.25.25.25": "GB",
  "26.26.26.26": "US",
  "27.27.27.27": "CN",
  "28.28.28.28": "US",
  "29.29.29.29": "US",
  "30.30.30.30": "US",
  "31.31.31.31": "MD",
  "41.41.41.41": "EG",
  "42.42.42.42": "KR",
  "45.45.45.45": "CA",
  "46.46.46.46": "RU",
  "49.49.49.49": "TH",
  "101.101.101.101": "TW",
  "110.110.110.110": "CN",
  "111.111.111.111": "JP",
  "112.112.112.112": "CN",
  "150.150.150.150": "KR",
  "200.200.200.200": "BR",
  "202.202.202.202": "CN",
  "45.85.95.65": "CH",
  "58.96.74.25": "AU",
  "88.99.77.66": "DE",
  "25.67.94.211": "GB",
  "27.67.94.211": "VN",
  "27.62.93.211": "IN",
};

function runLookupTests() {
  ip3country.init();
  let failed = false;
  for (let [k, v] of Object.entries(lookupTable)) {
    failed |= !verify(ip3country.lookupStr(k), v, '*');
    console.log(k);
  }
  console.log(
    failed ? "---Lookup tests failed---" : "---Lookup tests passed---"
  );
}

function verify(result, expected, index) {
  if (result === null) {
    result = "--";
  }
  if (expected === result) {
    return true;
  } else {
    console.log(`F: ${index}, ${result}, Expected: ${expected}`);
    return false;
  }
}

runLookupTests();
runRandomTests();
// runExhaustiveTests();
