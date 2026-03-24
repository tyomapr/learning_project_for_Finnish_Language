// ============================================================================
// HELPERS
// ============================================================================

function createWordObjects(list) {
  return list.map(word => ({
    word: word,
    checked: false
  }));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ============================================================================
// STATE - WORD LISTS
// ============================================================================

const wordGroups = {
  red: createWordObjects([
    ...red_nouns,
    ...red_verbs,
    ...red_adj,
    ...red_phrase
  ]),
  blue: createWordObjects([
    ...blue_nouns,
    ...blue_verbs,
    ...blue_adj,
    ...blue_phrases
  ]),
  black: createWordObjects([
    ...black_nouns,
    ...black_verbs,
    ...black_adj,
    ...black_phrases
  ])
};

// ============================================================================
// STATE - GRAMMAR STRUCTURES
// ============================================================================

const grammarStructures = [
  {
    title: "KPT (Consonant Gradation)",
    items: createWordObjects([
      "kk → k", "pp → p", "tt → t", "nt → nn", "nk → ng",
      "mp → mm", "lt → ll", "rt → rr", "t → d", "k → Ø",
      "k → v", "p → v", "lki → lje", "rki → rje"
    ])
  },
  {
    title: "Comparison & Cases",
    items: createWordObjects([
      "pieni / pienempi / pienin",
      "pienelle / pienemmälle / pienimmälle"
    ])
  },
  {
    title: "Verb Forms (Infinitives & Participles)",
    items: createWordObjects([
      "lukea", "lukien", "lukiessa", "lukemassa", "lukemaan",
      "lukemasta", "lukemalla", "lukematta", "lukeminen",
      "lukemaisillaan", "lukeva", "lukenut", "lukeneen",
      "luettu", "lukema", "lukematon"
    ])
  },
  {
    title: "Imperative",
    items: createWordObjects([
      "lue", "älä lue", "lukekoon", "lukekaamme", "lukekaa", "luettakoon"
    ])
  },
  {
    title: "Potential Mood",
    items: createWordObjects([
      "lukenee", "lienen", "lienet", "lienemme", "lienette", "lienevät", "en liene"
    ])
  }
];

// ============================================================================
// RENDER - WORD LISTS
// ============================================================================

function renderList(color) {
  const container = document.getElementById(color + "_list");
  if (!container) return;

  container.innerHTML = "";

  wordGroups[color].forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" data-color="${color}" data-index="${index}" ${item.checked ? "checked" : ""}>
        <span class="word">${item.word}</span>
      </label>
    `;
    container.appendChild(li);
  });

  attachWordEvents();
}

// ============================================================================
// EVENTS - WORD LISTS
// ============================================================================

function attachWordEvents() {
  const checkboxes = document.querySelectorAll("ul input[type='checkbox']");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", function () {
      const color = this.dataset.color;
      const index = parseInt(this.dataset.index);
      const list = wordGroups[color];
      const item = list[index];

      // Remove item from current position
      list.splice(index, 1);

      if (this.checked) {
        item.checked = true;
        // Find last checked item and add after it
        let lastCheckedIndex = -1;
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i].checked) {
            lastCheckedIndex = i;
            break;
          }
        }
        if (lastCheckedIndex === -1) {
          list.unshift(item);
        } else {
          list.splice(lastCheckedIndex + 1, 0, item);
        }
      } else {
        item.checked = false;
        // Find first unchecked item and add there
        const firstUncheckedIndex = list.findIndex(w => !w.checked);
        if (firstUncheckedIndex === -1) {
          list.push(item);
        } else {
          list.splice(firstUncheckedIndex, 0, item);
        }
      }

      renderList(color);
    });
  });
}

// ============================================================================
// SHUFFLE
// ============================================================================

function shuffle(color) {
  const checked = wordGroups[color].filter(w => w.checked);
  const unchecked = wordGroups[color].filter(w => !w.checked);

  shuffleArray(unchecked);
  wordGroups[color] = [...checked, ...unchecked];

  renderList(color);
}

// ============================================================================
// RENDER - GRAMMAR
// ============================================================================

function renderGrammar() {
  const container = document.getElementById("grammar_container");
  if (!container) return;

  container.innerHTML = "";

  grammarStructures.forEach((section, sIndex) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.style.marginBottom = "30px";

    const sectionTitle = document.createElement("h3");
    sectionTitle.innerText = section.title;
    sectionDiv.appendChild(sectionTitle);

    section.items.forEach((item, iIndex) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `
        <input type="checkbox" data-section="${sIndex}" data-index="${iIndex}" ${item.checked ? "checked" : ""}>
        <span>${item.word}</span>
      `;
      sectionDiv.appendChild(row);
    });

    container.appendChild(sectionDiv);
  });

  attachGrammarEvents();
}

// ============================================================================
// EVENTS - GRAMMAR
// ============================================================================

function attachGrammarEvents() {
  const checkboxes = document.querySelectorAll("#grammar_container input[type='checkbox']");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", function () {
      const sectionIndex = parseInt(this.dataset.section);
      const itemIndex = parseInt(this.dataset.index);
      const section = grammarStructures[sectionIndex];
      const item = section.items[itemIndex];

      // Remove item from current position
      section.items.splice(itemIndex, 1);

      if (this.checked) {
        item.checked = true;
        // Find last checked item and add after it
        let lastCheckedIndex = -1;
        for (let i = section.items.length - 1; i >= 0; i--) {
          if (section.items[i].checked) {
            lastCheckedIndex = i;
            break;
          }
        }
        if (lastCheckedIndex === -1) {
          section.items.unshift(item);
        } else {
          section.items.splice(lastCheckedIndex + 1, 0, item);
        }
      } else {
        item.checked = false;
        // Find first unchecked item and add there
        const firstUncheckedIndex = section.items.findIndex(w => !w.checked);
        if (firstUncheckedIndex === -1) {
          section.items.push(item);
        } else {
          section.items.splice(firstUncheckedIndex, 0, item);
        }
      }

      renderGrammar();
    });
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

renderList("red");
renderList("blue");
renderList("black");
renderGrammar();