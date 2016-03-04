import {test} from 'ava';
var parseStringTags = require('./parse-string-tags');

var vectors = [
  ['', []],
  ['The quick brown fox', []],
  ['The quick brown [fox] jumped over the lazy [dog]', ['fox', 'dog'], 'The quick brown  jumped over the lazy '],
  ['[The] quick brown fox', ['the'], ' quick brown fox'],
  ['[The quick brown fox]', ['the quick brown fox'], ''],
  ['The lazy [dog', []],
  ['The lazy] dog', []],
  ['The [Quick] Brown [Fox]', ['quick', 'fox'], 'The  Brown '],
  ['The [lazy] [LAZY] lazy dog', ['lazy'], 'The   lazy dog'],
  ['The [quick][BROWN][fox]', ['quick', 'brown', 'fox'], 'The '],
  ['The [quick][quick] fox', ['quick'], 'The  fox'],
  ['The quick [] brown fox', [], 'The quick  brown fox'],
  ['The [quick [brown] fox]', ['brown'], 'The [quick  fox]']
];

test(t => {
  for (let [string, expectedTags, expectedString] of vectors) {
    let output = parseStringTags(string);
    t.same(expectedTags, output.tags);
    if (expectedString === undefined) {
      t.same(string, output.string);
    } else {
      t.same(expectedString, output.string);
    }
  }
});
