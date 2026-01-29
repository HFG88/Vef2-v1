import fs from "node:fs/promises";
import { CATEGORIES, parseLine } from "./lib/parse.js";
import {
  generateIndexHtml,
  generateQuestionCategoryHtml,
  generateQuestionHtml,
  generateListHtml,
} from "./lib/html.js";

const MAX_QUESTIONS_PER_CATEGORY = 100;

async function main() {
  // Búa til dist möppu ef ekki til
  const distPath = "./dist";
  await fs.mkdir(distPath);

  // Sækja spurningarnar
  const content = await fs.readFile("./questions.csv", "utf-8");

  // Brjóta þær niður í línur
  const lines = content.split("\n");

  // Parsa hverja línu fyrir sig í spurningar object
  const questions = lines.map(parseLine);

  // Ítra í gegnum öll category og búa til HTML síðu fyrir þær
  for (const [categoryNumber, categoryName] of Object.entries(CATEGORIES)) {
    const filtered = questions
      .filter(
        (q) => q && q.category?.number === categoryNumber && q.quality === "3",
      )
      .slice(0, MAX_QUESTIONS_PER_CATEGORY);

    if (filtered.length === 0) continue;

    const questionsHtml = filtered.map(generateQuestionHtml).join("\n");

    const output = generateQuestionCategoryHtml(categoryName, questionsHtml);

    const path = `./dist/${categoryName.toLowerCase()}.html`;

    await fs.writeFile(path, output, "utf-8");
  }
  const listHtml = generateListHtml(CATEGORIES);
  const indexHtml = generateIndexHtml(listHtml);

  await fs.writeFile("./dist/index.html", indexHtml, "utf-8");
}

main().catch((error) => {
  console.error("error generating", error);
});
