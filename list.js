// =======================
// WORD COLLECTIONS
// =======================

const wordGroups = {
red: [...red_nouns, ...red_verbs, ...red_adj, ...red_phrase],
blue: [...blue_nouns, ...blue_verbs, ...blue_adj, ...blue_phrases],
black: [...black_nouns, ...black_verbs, ...black_adj, ...black_phrases]
};


// =======================
// SHUFFLE FUNCTION
// =======================

function shuffleArray(array){
for(let i = array.length - 1; i > 0; i--){
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}


// =======================
// RENDER LIST
// =======================

function renderList(color){

const container = document.getElementById(color + "_list");
container.innerHTML = "";

wordGroups[color].forEach(word => {

const li = document.createElement("li");

li.innerHTML = `
<label>
<input type="checkbox">
<span class="word">${word}</span>
</label>
`;

container.appendChild(li);

});

}


// =======================
// SHUFFLE HANDLER
// =======================

function shuffle(color){
wordGroups[color] = shuffleArray(wordGroups[color]);
renderList(color);
}


// =======================
// INITIAL LOAD
// =======================

renderList("red");
renderList("blue");
renderList("black");