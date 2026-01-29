/*
1 	Nei 	Flokkanúmer
2 	Já 	    Undirflokkur ef til staðar
3 	Nei 	Erfiðleikastig: 1: Létt, 2: Meðal, 3: Erfið
4 	Já 	    Gæðastig: 1: Slöpp, 2: Góð, 3: Ágæt
5 	Nei 	Spurningin
6 	Nei 	Svarið
*/
/*
    1 	Almenn kunnátta
    2 	Náttúra og vísindi
    3 	Bókmenntir og listir
    4 	Saga
    5 	Landafræði
    6 	Skemmtun og afþreying
    7 	Íþróttir og tómstundir
*/
export const CATEGORIES = {
  1: "Almenn kunnátta",
  2: "Náttúra og vísindi",
  3: "Bókmenntir og listir",
  4: "Saga",
  5: "Landafræði",
  6: "Skemmtun og afþreying",
  7: "Íþróttir og tómstundir",
};

/**
 * 
 * @param {String} number 
 * @returns 
 */
export function getCategory(number) {
  const name = CATEGORIES[number];

  if (name === undefined) {
    return null;
  }

  return {
    number: number,
    name,
  };
}

/**
 *
 * @param {string} line
 * @returns
 */
export function parseLine(line) {
  const split = line.split(",");

  if (split.length !== 6) {
    return null;
  }

  const category = getCategory(split[0]);
  const subCategory = split[1];
  const difficulty = split[2];
  const quality = split[3];
  const question = split[4];
  const answer = split[5];

  const q = {
    category,
    subCategory,
    difficulty,
    quality,
    question,
    answer,
  };

  return q;
}
