const { splitPattern, composeFromPattern, composeCorpus } = require('../src');
const corpusPattern = require('./corpus-pattern.json');
const corpusComposed = require('./corpus-composed.json');

describe('Pattern', () => {
  describe('splitPattern', () => {
    it('should generate array of options for cartesian product', () => {
      const input =
        'I [am having|have] a [problem|question] that I have to [solve|investigate]';
      const actual = splitPattern(input);
      const expected = [
        ['I '],
        ['am having', 'have'],
        [' a '],
        ['problem', 'question'],
        [' that I have to '],
        ['solve', 'investigate'],
      ];
      expect(actual).toEqual(expected);
    });
  });
  describe('composeFromPattern', () => {
    it('Should generate all the strings from a pattern', () => {
      const input =
        'I [am having|have] a [problem|question] that I have to [solve|investigate]';
      const actual = composeFromPattern(input);
      const expected = [
        'I am having a problem that I have to solve',
        'I am having a problem that I have to investigate',
        'I am having a question that I have to solve',
        'I am having a question that I have to investigate',
        'I have a problem that I have to solve',
        'I have a problem that I have to investigate',
        'I have a question that I have to solve',
        'I have a question that I have to investigate',
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe('composeCorpus', () => {
    it('Should compose a corpus that contains patterns', () => {
      const actual = composeCorpus(corpusPattern);
      expect(actual).toEqual(corpusComposed);
    });
  });
});
