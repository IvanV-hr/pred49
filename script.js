const polja = [...document.querySelectorAll(".polje")];
const novaIgraBtn = document.querySelector("#novaIgra");
const poruka = document.querySelector("#poruka");
const ploca = document.querySelector("#game");
const pocetniBrojPolja = polja.length;

function omoguciPolja(omoguci) {
  polja.forEach((polje) => (polje.disabled = !omoguci));
}

function bljesni(polje) {
  polje.classList.add("active");
  setTimeout(() => polje.classList.remove("active"), 500);
}

let krug = 1;
let aktivnaPolja = [];
let sljedeciOdabir = 0;

novaIgraBtn.addEventListener("click", () => {
  krug = 1;
  aktivnaPolja = [];
  sljedeciOdabir = 0;
  novaIgraBtn.disabled = true;

  while (polja.length > pocetniBrojPolja) {
    polja.pop().remove();
  }

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
    poruka.textContent = "Pogresan redosljed. Pokusajte ponovo.";
    novaIgraBtn.disabled = false;
    omoguciPolja(false);
    return;
  }

  sljedeciOdabir++;

  if (sljedeciOdabir < aktivnaPolja.length) return;

  omoguciPolja(false);

  if (krug === 5) {
    poruka.textContent = "Dosli ste do novoga levela.";
    dodajPolja();
    aktivnaPolja = [];
    sljedeciOdabir = 0;
    krug = 1;
  } else {
    krug++;
  }

  setTimeout(noviKrug, 1000);
}

polja.forEach((polje) => polje.addEventListener("click", odaberiPolje));
// 1. zadatak - implementiraj novi level,
// nakon 5. kruga dodaj jos tri polja

// 2. zadatak - prikazi 5 najboljih rezultata
// spremi ih u localStorage

function dodajPolja() {
  for (let i = 0; i < 3; i++) {
    const polje = document.createElement("button");
    polje.className = "gumb polje";
    polje.disabled = true;
    polje.textContent = "Polje " + (polja.length + 1);
    polje.addEventListener("click", odaberiPolje);
    ploca.append(polje);
    polja.push(polje);
  }
}
