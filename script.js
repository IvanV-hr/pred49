const polja = [...document.querySelectorAll(".polje")];
const novaIgraBtn = document.querySelector("#novaIgra");
const poruka = document.querySelector("#poruka");

function omoguciPolja(omoguci) {
  polja.forEach((polje) => (polje.disabled = !omoguci));
}

function bljesni(polje) {
  polje.classList.add("active");
  setTimeout(() => polje.classList.remove("active"), 500);
}

//let krug = 1;
let aktivnaPolja = [];
let sljedeciOdabir = 0;

novaIgraBtn.addEventListener("click", () => {
  krug = 1;
  aktivnaPolja = [];
  sljedeciOdabir = 0;

  noviKrug();
});

function noviKrug() {
  aktivnaPolja.push(polja[Math.floor(Math.random() * polja.length)]);
  sljedeciOdabir = 0;
  prikaziNiz();
}

function prikaziNiz() {
  omoguciPolja(false);
  poruka.textContent = "Zapamtite redosljed.";
  let indeks = 0;
  const interval = setInterval(() => {
    if (indeks < aktivnaPolja.length) {
      bljesni(aktivnaPolja[indeks]);
      indeks++;
    } else {
      clearInterval(interval);
      poruka.textContent = "Ponovi niz.";
      omoguciPolja(true);
    }
  }, 700);
}

function odaberiPolje(e) {
  const polje = e.currentTarget;
  bljesni(polje);

  if (polje !== aktivnaPolja[sljedeciOdabir]) {
    poruka.textContent = "Pogresan resoljed. Pokusajte ponovo.";
    omoguciPolja(false);
    return;
  }

  sljedeciOdabir++;

  if (sljedeciOdabir < aktivnaPolja.length) return;

  //krug++;

  setTimeout(noviKrug, 1000);
}

polja.forEach((polje) => polje.addEventListener("click", odaberiPolje));
