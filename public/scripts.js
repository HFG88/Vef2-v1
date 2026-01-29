const correctElement = document.querySelector(".counter .correct");
const incorrectElement = document.querySelector(".counter .incorrect");

if (!correctElement || !incorrectElement) {
  console.error("unable to find elements");
}

function questionAnswerHandler(e) {
  const button = e.target.closest(".button-correct, .button-incorrect");
  if (!button) return;

  const parentQuestion = button.closest(".question");
  if (!parentQuestion) return;

  // 🚫 Prevent double answering
  if (parentQuestion.dataset.answered === "true") return;

  parentQuestion.dataset.answered = "true";

  const isCorrect = button.classList.contains("button-correct");

  const counterEl = isCorrect ? correctElement : incorrectElement;
  const current = Number.parseInt(counterEl.textContent ?? "0", 10) || 0;
  counterEl.textContent = String(current + 1);
  
  button.classList.add(isCorrect ? "correct-color" : "wrong-color");

  // ⭐ Disable BOTH buttons in THIS question
  const questionButtons = parentQuestion.querySelectorAll(
    ".button-correct, .button-incorrect"
  );

  questionButtons.forEach((btn) => {
    btn.disabled = true;
  });
}


const buttons = document.querySelectorAll(".button-correct, .button-incorrect");

for (const button of buttons) {
  button.addEventListener("click", questionAnswerHandler);
}

export function setupArrowToggleAll() {
  document.querySelectorAll(".question").forEach((question) => {
    const arrow = question.querySelector(".arrow-buttons");
    const answer = question.querySelector(".answer");
    const up = question.querySelector(".up-arrow");
    const down = question.querySelector(".down-arrow");

    arrow.addEventListener("click", () => {
      answer.classList.toggle("hidden");
      up.classList.toggle("hidden");
      down.classList.toggle("hidden");
    });
  });
}

setupArrowToggleAll();
