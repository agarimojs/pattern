const { cartesian } = require('@agarimo/cartesian');

function splitPattern(str) {
  let isInBrackets = false;
  let currentStr = '';
  const result = [];
  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    if (isInBrackets) {
      if (c === ']') {
        isInBrackets = false;
        if (currentStr) {
          result.push(currentStr.split('|'));
          currentStr = '';
        }
      } else {
        currentStr += c;
      }
    } else if (c === '[') {
      isInBrackets = true;
      if (currentStr) {
        result.push([currentStr]);
        currentStr = '';
      }
    } else {
      currentStr += c;
    }
  }
  if (currentStr !== '') {
    result.push([currentStr]);
  }
  return result;
}

function composeFromPattern(str) {
  const tokens = splitPattern(str);
  return cartesian(tokens).map((x) => x.join(''));
}

function composeCorpus(corpus) {
  const result = { ...corpus };
  result.data = [];
  corpus.data.forEach((item) => {
    const newItem = { ...item };
    ['utterances', 'tests', 'answers'].forEach((name) => {
      if (item[name]) {
        newItem[name] = [];
        item[name].forEach((str) => {
          const list = composeFromPattern(str);
          list.forEach((composed) => {
            newItem[name].push(composed);
          });
        });
      }
    });
    result.data.push(newItem);
  });
  return result;
}

module.exports = {
  splitPattern,
  composeFromPattern,
  composeCorpus,
};
