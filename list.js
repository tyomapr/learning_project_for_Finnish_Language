// =======================
// WORD COLLECTIONS (STATE)
// =======================

function createWordObjects(list){
return list.map(word => ({
word: word,
checked: false
}));
}

const wordGroups = {
red: createWordObjects([...red_nouns, ...red_verbs, ...red_adj, ...red_phrase]),
blue: createWordObjects([...blue_nouns, ...blue_verbs, ...blue_adj, ...blue_phrases]),
black: createWordObjects([...black_nouns, ...black_verbs, ...black_adj, ...black_phrases])
};


// =======================
// RENDER LIST
// =======================

function renderList(color){

const container = document.getElementById(color + "_list");
container.innerHTML = "";

wordGroups[color].forEach((item, index) => {

const li = document.createElement("li");

li.innerHTML = `
<label>
<input type="checkbox" data-index="${index}" ${item.checked ? "checked" : ""}>
<span class="word">${item.word}</span>
</label>
`;

container.appendChild(li);

});

// attach listeners AFTER render
const checkboxes = container.querySelectorAll("input[type='checkbox']");

checkboxes.forEach(cb => {

cb.addEventListener("change", function(){

const index = parseInt(this.dataset.index);
const item = wordGroups[color][index];

// remove from current position
wordGroups[color].splice(index, 1);

if(this.checked){
item.checked = true;

// 🔥 NEW CHECKED → GO TO VERY TOP
wordGroups[color].unshift(item);

}else{
item.checked = false;

// 🔥 UNCHECKED → GO AFTER LAST CHECKED
const firstUncheckedIndex = wordGroups[color].findIndex(w => !w.checked);

if(firstUncheckedIndex === -1){
// all are checked → goes to end
wordGroups[color].push(item);
}else{
wordGroups[color].splice(firstUncheckedIndex, 0, item);
}

}

// re-render
renderList(color);

});

});

}


// =======================
// SHUFFLE (keeps logic)
// =======================

function shuffleArray(array){
for(let i = array.length - 1; i > 0; i--){
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

function shuffle(color){

// shuffle only unchecked words (optional smart behavior)
const checked = wordGroups[color].filter(w => w.checked);
const unchecked = wordGroups[color].filter(w => !w.checked);

shuffleArray(unchecked);

wordGroups[color] = [...checked, ...unchecked];

renderList(color);
}


// =======================
// INITIAL LOAD
// =======================

renderList("red");
renderList("blue");
renderList("black");