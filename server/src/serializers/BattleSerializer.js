class BattleSerializer {
  static getDetails(battle) {
    const allowedAttributes = ["id", "title", "userId", "username", "verses"];

    let serializedBattle = {};
    for (let attribute of allowedAttributes) {
      serializedBattle[attribute] = battle[attribute];
    }
    return serializedBattle;
  }
}

export default BattleSerializer;
