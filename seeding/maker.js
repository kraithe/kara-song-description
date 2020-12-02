import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1
  },
  wordsPerSentence: {
    max: 10,
    min: 3
  }
});

let makeEntry = (id) => {
  let newEntry = {
    songId: id,
    bandId: Math.floor(Math.random() * 100),
    baneName: lorem.generateWords(Math.floor(Math.random() * 5)),
    description: lorem.generateParagraphs(1);
  };
  return newEntry;
}

let makeBatch = (size) => {
  let result = [];
  for (var i = 1; i <= recordCount; i++) {
    let entry = makeEntry(i);
    result.push(entry);
  }
  return result;
}

module.exports.makeEntry = makeEntry;
module.exports.makeBatch = makeBatch;