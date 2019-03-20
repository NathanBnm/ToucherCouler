var x, y, xCible, yCible, coord, coordCible, dim;

function initJeu(taille) {

    zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "<div id=\"grille\"></div>";
    grille = document.getElementById("grille");
    dialog = document.getElementById("dialog");

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

            grille.innerHTML += "<a id=" + coord + " class=\"case\" value=" + coord + " onclick=\"verifierGagnant('" + coordonnees + "');\"></a>";
        }
    }

    /* Dimensions de la zone de jeu */
    dim = taille * 28 + taille * 1;
    zoneJeu.style.width = dim + "px";
    zoneJeu.style.height = dim + "px";
}

function cibleAleatoire(taille) {
    xCible = getRandomInt(1, taille);
    yCible = getRandomInt(1, taille);
    coordCible = xCible + "x" + yCible;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function verifier(x, y, xCible, yCible) {
    var distance;

    if (x == xCible && y == yCible) {
        distance = 0;
    }
    else {
        distance = getCalculIndication(x, y, xCible, yCible);
    }
    return distance;
}

function verifierGagnant(coordonnees) {
    var x = coordonnees.charAt(0);
    var y = coordonnees.charAt(2);
    var xCible = coordonnees.charAt(4);
    var yCible = coordonnees.charAt(6);

    var coord = x + "x" + y;
    var cible = document.getElementById(coord);
    cible.classList.add("active");

    distance = verifier(x, y, xCible, yCible);
    if(distance == 0){
        dialog.innerHTML = "<p>Touché !</p>";
        //Fin de partie
    } else if (distance == 1){
        dialog.innerHTML = "<p>Sauve qui peut ! Vous êtes à " + distance + " case du sous-marin !</p>";
    } else if (distance <= 8 && distance != 1){
        dialog.innerHTML = "<p>Sauve qui peut ! Vous êtes à " + distance + " cases du sous-marin !</p>";
    } else if (distance > 8){
        dialog.innerHTML = "<p>A l'eau !</p>";
    } else {
        //Erreur
    }
}

function getCalculIndication(x, y, xCible, yCible) {
    return (Math.abs(Math.abs(xCible - x) + (Math.abs(yCible - y))));
}