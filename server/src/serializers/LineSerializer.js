class LineSerializer {
  static getDetails(line) {
    const allowedAttributes = ["id", "line"];

    let serializedLine = {};
    for (let attribute of allowedAttributes) {
      serializedLine[attribute] = line[attribute];
    }
    return serializedLine;
  }
}

export default LineSerializer;
