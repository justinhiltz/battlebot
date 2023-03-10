class WordSerializer {
  static getDetails(word) {
    const allowedAttributes = ["id", "word"];

    let serializedWord = {};
    for (let attribute of allowedAttributes) {
      serializedWord[attribute] = word[attribute];
    }
    return serializedWord;
  }
}

export default WordSerializer;
