var x, y, xCible, yCible, coord, coordCible, dim;

initJeu(5);

function initJeu(taille) {

    const zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "<div id=\"grille\"></div>";
    const grille = document.getElementById("grille");

    cibleAleatoire(taille);
    initGrille(taille, zoneJeu, grille);

}

function initGrille(taille, zoneJeu, grille) {

    let i, j;


    /* On génère la grille */
    for (i = 0; i <= taille - 1; i++) {
        for (j = 0; j <= taille - 1; j++) {
            x = (i + 1);
            y = (j + 1);
            coord = x + "x" + y;
            coordonnees = coord + "-" + coordCible

            grille.innerHTML += "<div id=" + coord + " class=\"case\" value=" + coord + " onclick=\"test('" + coordonnees + "');\"></div>";
        }
    }

    /* Dimensions de la zone de jeu */
    dim = taille * 40 + taille * 1;
    zoneJeu.style.width = dim + "px";
    zoneJeu.style.height = dim + "px";
}

function test(coordonnees) {
    console.log(coordonnees);
}

function cibleAleatoire(taille) {
    xCible = getRandomInt(1, taille);
    yCible = getRandomInt(1, taille);
    coordCible = xCible + "x" + yCible;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function verifier(coordonnees) {
    console.log(coordonnees);

    var x = coordonnees.charAt(0);
    var y = coordonnees.charAt(2);
    var xCible = coordonnees.charAt(4);
    var yCible = coordonnees.charAt(6);

    var distance;

    if (x == xCible && y == yCible) {
        distance = 0;
        console.log("Touché");
    }
    else {
        distance = getCalculIndication(x, y, xCible, yCible);
    }
    console.log(distance);
    return distance;
}

function gagner(coord, coordCible) {
    if (verifier(coord, coordCible) == -1) {
        Alert("gagner !");
    }
    else {
        Alert("La distance est de : " + verifier(coord, coordCible));
    }
}

function getCalculIndication(x, y, xCible, yCible) {
    return (Math.abs(Math.abs(xCible - x - 1) - (Math.abs(yCible - y))));
}