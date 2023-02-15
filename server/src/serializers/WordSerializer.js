class WordSerializer {
  static getSummary(word) {
    const allowedAttributes = ["word"];

    let serializedWord = {};
    for (let attribute of allowedAttributes) {
      serializedWord[attribute] = word[attribute];
    }
    return serializedWord;
  }
}

export default WordSerializer;
