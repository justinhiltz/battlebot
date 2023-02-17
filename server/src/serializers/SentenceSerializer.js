class SentenceSerializer {
  static getDetails(sentence) {
    const allowedAttributes = ["id", "completeSentence"];

    let serializedSentence = {};
    for (let attribute of allowedAttributes) {
      serializedSentence[attribute] = sentence[attribute];
    }
    return serializedSentence;
  }
}

export default SentenceSerializer;
