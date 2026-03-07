function generate(list,id){

const word=list[Math.floor(Math.random()*list.length)];

document.getElementById(id).innerText=word;

}

function clearBox(color){

document.getElementById(color+"_noun").innerText="";
document.getElementById(color+"_verb").innerText="";
document.getElementById(color+"_adj").innerText="";
document.getElementById(color+"_phrase").innerText="";

}


/* HARD */

const red_nouns=[
"Yhteiskunta",
"Vakaumus",
"Läpimurto",
"Seuraamus"
];

const red_verbs=[
"Ilmentyä",
"Puntaroida",
"Vääristellä",
"Horjuttaa"
];

const red_adj=[
"Epäluuloinen",
"Perusteeton",
"Uraauurtava",
"Äärimmäinen"
];

const red_phrases=[
"Työntää kapuloita rattaisiin",
"Mennä konkurssiin",
"Sopimuksen puitteissa",
"Saada asiat kuntoon"
];


/* MEDIUM */

const blue_nouns=[
"Susi",
"Parveke",
"Kirsikka",
"Risteys"
];

const blue_verbs=[
"Haukottaa",
"Ripustaa",
"Kuoria",
"Napata"
];

const blue_adj=[
"Kuormittava",
"Tyylikäs",
"Joustava"
];

const blue_phrases=[
"Enimmäkseen",
"Ikään kuin",
"Jonkin ajan kuluttua"
];


/* EASY */

const black_nouns=[
"Talo",
"Koira",
"Kissa",
"Auto"
];

const black_verbs=[
"Syödä",
"Juoda",
"Nukkua",
"Juosta"
];

const black_adj=[
"Iso",
"Pieni",
"Nopea"
];

const black_phrases=[
"Hyvää päivää",
"Kiitos paljon"
];