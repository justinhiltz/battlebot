class VerseSerializer {
  static getDetails(verse) {
    const allowedAttributes = ["id", "sentence1", "sentence2"];

    let serializedVerse = {};
    for (let attribute of allowedAttributes) {
      serializedVerse[attribute] = verse[attribute];
    }
    return serializedVerse;
  }
}

export default VerseSerializer;
