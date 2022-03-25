//capture the dom
const poids = document.getElementById("poids");
const taille = document.getElementById("taille");
const resultat = document.getElementById("resultat");
const info = document.getElementById("info");
const lblP = document.getElementById("lbl-poids");
const lblT = document.getElementById("lbl-taille");
const tableau = document.querySelector(".interpretation-imc");

poids.value = "";
taille.value = "";

const messageRegNombreP = document.querySelector(".errorP");
const messageRegNombreT = document.querySelector(".errorT");


const bilanImc = function (imcT) {
    if (imcT < 16.5) {
        tableau.rows[1].classList.add("surbrillance");
        return "Dénutrition ou anorexie";
    } else if (imcT < 18.5) {
        tableau.rows[2].classList.add("surbrillance");
        return "Maigreur";

    } else if (imcT < 25) {
        tableau.rows[3].classList.add("surbrillance");
        return "Corpulence normale";

    } else if (imcT < 30) {
        tableau.rows[4].classList.add("surbrillance");
        return "Surpoids";

    } else if (imcT < 35) {
        tableau.rows[5].classList.add("surbrillance");
        return "Obesité modèrée";

    } else if (imcT < 40) {
        tableau.rows[6].classList.add("surbrillance");
        return "Obesité sévère";

    } else {
        tableau.rows[7].classList.add("surbrillance");
        return "Obesité morbide ou massive";
    }
};

const poidsMax = function (p, t) {
    let pMax = (25 * ((t * t) / 10000)).toFixed(0);
    let pMin = (18.5 * ((t * t) / 10000)).toFixed(0);
    return `Pour ${t}cm la norme est entre ${pMin} et ${pMax}kg`;
}

poids.addEventListener("input", function () {
    lblP.innerText = "Poids";
    poids.classList.remove("styleErreur");
    messageRegNombreP.style.display = "none";
    calculImc();
    if (testOnlyNombre(poids.value) && poids.value.length > 0) {
        messageRegNombreP.style.display = "inline";
        poids.classList.add("styleErreur");
    }
});

taille.addEventListener("input", function () {
    lblT.innerText = "Taille";
    taille.classList.remove("styleErreur");
    messageRegNombreT.style.display = "none";
    calculImc();
    if (testOnlyNombre(taille.value) && taille.value.length > 0) {
        messageRegNombreT.style.display = "inline";
        taille.classList.add("styleErreur");
    }
});


function calculImc() {
    for (let row of tableau.rows) {
        row.classList.remove("surbrillance");
    }
    if (!testOnlyNombre(poids.value) && !testOnlyNombre(taille.value) && poids.value.length > 1 && taille.value.length > 1) {
        let imc = (poids.value / (Math.pow(taille.value / 100, 2))).toFixed(2);
        info.innerText = `IMC: ${imc} | ${bilanImc(imc)} \n` + poidsMax(poids.value, taille.value);
    } else {
        info.innerText = "";
    }
}

function testOnlyNombre(nombre) {
    let regExNombre = /[^0-9]/;
    return regExNombre.test(nombre);
}