const object1 = [ // list emoji + bin yg benar
  {e:"🍉", bin: "organic"},
  {e:"🍍", bin: "organic"},
  {e:"🍎", bin: "organic"},
  {e:"🍌", bin: "organic"},
  {e:"✉️", bin: "recycleables"},
  {e:"📦", bin: "recycleables"},
  {e:"📰", bin: "recycleables"},
  {e:"📄", bin: "recycleables"},
  {e:"📚", bin: "recycleables"},
  {e:"🔋", bin: "anorganic"},
  {e:"🧷", bin: "anorganic"},
  {e:"🪒", bin: "anorganic"},
  {e:"🧴", bin: "anorganic"},
  /**/
];

let point = 0;
const things1 = document.getElementById("things");
const currentext = document.getElementById("currentScore");
const wrttext = document.getElementById("wrtext");

function thingsSpawn() {
  things1.innerHTML = "";
  for (let p = 0; p<3 ; p++) {  // buat spawning item 3 kali ( 3 objek)
    const r_number = object1[Math.floor(Math.random()* object1.length)]; // pilih random object dalam list
    const makeDiv = document.createElement("div");
    makeDiv.className = "things";
    makeDiv.textContent = r_number.e; // assign isi teks ke emoji yang dipilih random
    makeDiv.draggable = true; // biar bisa di drag
    makeDiv.dataset.type = r_number.bin;
    makeDiv.ondragstart = drag;
    things1.appendChild(makeDiv);// agar emoji bisa di drag dan visible
  }
}

function drop2(k) {
  k.preventDefault(); // agar bisa di drag
}

function drag(o) {
  o.dataTransfer.setData("type", o.target.dataset.type); // simpan data bin
  o.dataTransfer.setData("id" , o.target.textContent); 
}

function drop(o) {
  o.preventDefault();
  const itemType = o.dataTransfer.getData("type"); // data bin yg di drag
  const Emoji2 = o.dataTransfer.getData("id");
  const correctbin = o.currentTarget.id; // bin yg benar


if (itemType === correctbin) {
  point++
  currentext.textContent = "Score: " + point;
    wrttext.textContent = "Tempat Sampah yang benar :D" // jika tempat sampah benar
} else {
  point = Math.max(0, point - 1);
  currentext.textContent = "Score: " + point; // jika tempat sampah salah
  wrttext.textContent = "Salah tempat sampah :("
}
const a_variable = [...things1.children].find(d => d.textContent === Emoji2);// cari item yang di drag dengan cek teksnya
if (a_variable) a_variable.remove();// buang item tersebut
if (things1.children.length === 0) thingsSpawn(); // spawn ulang item (jika tdk ada emoji lg)

}

thingsSpawn();