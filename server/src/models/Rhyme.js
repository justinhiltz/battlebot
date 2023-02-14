import got from "got";

class Rhyme {
  static async getRhyme(word) {
    try {
      const response = await got(`https://api.datamuse.com/words?ml=${word}&rel_rhy=${word}`);
      return JSON.parse(response.body);
    } catch (error) {
      console.error(error.response.body);
      return error;
    }
  }
}

export default Rhyme;
