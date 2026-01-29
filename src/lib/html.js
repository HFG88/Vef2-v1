export function generateIndexHtml(categoryList) {
  return /* HTML */ ` <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="scripts.js" type="module"></script>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <header>
        <h1 class="header-title">Spurningaleikur!</h1>
        <p>Velkomin velkomin! Veldu flokk til að svara spurningum í:</p>
      </header>

      <main>
        <ul class="category-list questions">
          ${categoryList}
        </ul>
      </main>
    </body>
  </html>`;
}

export function generateQuestionHtml(q) {
  return /* HTML */ `
    <section class="question" data-answered="false">
      <div class="question-info">
        <div class="question-header">
          <h3>${q.question}</h3>
        </div>

        <section class="answer-wrapper">
          <div class="arrow-buttons" role="button" aria-label="Sýna/fela svar">
            <img
              class="up-arrow hidden"
              src="./svg/up-arrow.svg"
              alt="Fela svar"
            />
            <img
              class="down-arrow"
              src="./svg/down-arrow.svg"
              alt="Sýna svar"
            />
          </div>
          <p class="answer hidden">${q.answer}</p>
        </section>

        <div class="buttons">
          <button type="button" class="button button-correct">Rétt 🫡</button>
          <button type="button" class="button button-incorrect">
            Rangt 🥹
          </button>
        </div>
      </div>
    </section>
  `;
}

export function generateQuestionCategoryHtml(title, questionsHtml) {
  return /* HTML */ `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="scripts.js" type="module"></script>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <header>
          <h1 class="header-title">Spurningaleikur!</h1>
          <p><a href="index.html">Til baka</a></p>

          <div class="counter ui">
            <div class="score-counter">
              <div class="score score-correct">
                <span>Correct:</span>
                <div class="correct">0</div>
              </div>

              <div class="score score-incorrect">
                <span>Incorrect:</span>
                <div class="incorrect">0</div>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div class="questions">
            <h2>${title}</h2>
            ${questionsHtml}
          </div>
        </main>
      </body>
    </html>
  `;
}

function generateListItemHtml(categoryName) {
  return /* HTML */ `
    <li class="question">
      <a href="${categoryName}.html">${categoryName}</a>
    </li>
  `;
}

export function generateListHtml(categories) {
  return Object.values(categories)
    .map((name) => generateListItemHtml(name.toLowerCase()))
    .join("\n");
}
