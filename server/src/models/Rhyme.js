let got;
async function getGot() {
  if (!got) {
    got = await import("got");
  }
  return got;
}

class Rhyme {
  static async getRhyme(word = "") {
    const got = await getGot();
    try {
      const response = await got.default(`https://api.datamuse.com/words?&rel_rhy=${word}`);
      return JSON.parse(response.body);
    } catch (error) {
      console.error(error.response.body);
      return error;
    }
  }
}

module.exports = Rhyme;
