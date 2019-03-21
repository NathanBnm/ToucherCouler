//Gérer les erreurs
//Empêcher la génération d'autres grilles
//Difficulté élevée (déplacement)

var x, y, xCible, yCible, coord, coordCible, dim;

function initJeu(taille) {

    zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "<div id=\"grille\"></div>";
    grille = document.getElementById("grille");
    info = document.getElementById("info");

    cibleAleatoire(taille);
    initGrille(taille);
    info.innerHTML = "<span class=\"bold\">Prêt à tirer ?</span> <br> Trouvez le sous-marin !";
}

function initGrille(taille) {

    let i, j;

    /* On génère la grille */
    for (i = 0; i <= taille - 1; i++) {
        for (j = 0; j <= taille - 1; j++) {
            x = (i + 1);
            y = (j + 1);

            coord = x + "x" + y;

            grille.innerHTML += "<a id=" + coord + " class=\"case\" onclick=\"verifierCoord(" + x + "," + y + ");\"></a>";
        }
    }

    /* Dimensions de la zone de jeu */
    dim = taille * 30 + taille * 1;
    zoneJeu.style.width = dim + "px";
    zoneJeu.style.height = dim + "px";
}


function cibleAleatoire(taille) {
    xCible = getRandomInt(1, taille);
    yCible = getRandomInt(1, taille);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function verifierDistance(x, y, xCible, yCible) {
    var distance;

    if (x == xCible && y == yCible) {
        distance = 0;
    }
    else {
        distance = getCalculIndication(x, y, xCible, yCible);
    }
    return distance;
}

function getCalculIndication(x, y, xCible, yCible) {
    return (Math.abs(Math.abs(xCible - x) + (Math.abs(yCible - y))));
}

function verifierCoord(x, y) {
    coord = x + "x" + y;

    var cible = document.getElementById(coord);

    distance = verifierDistance(x, y, xCible, yCible);

    if (distance == 0) {
        info.innerHTML = "<span class=\"bold\">Touché !</span> <br> Vous avez gagné la partie";
        cible.classList.add("active-red");
        if (tips.checked == true) {
            cible.innerHTML = "<span class=\"number\">X</span>";
        }
        //Fin de partie
    } else if (distance <= 8) {
        if (distance == 1) {
            info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Vous êtes à <span class=\"bold\">" + distance + "</span> case du sous-marin !";
        } else {
            info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Vous êtes à <span class=\"bold\">" + distance + "</span> cases du sous-marin !";
        }
        cible.classList.add("active-orange");
        if (tips.checked == true) {
            cible.innerHTML = "<span class=\"number\">" + distance + "</span>";
        }
    } else if (distance > 8) {
        info.innerHTML = "<span class=\"bold\">A l'eau !</span>";
        cible.classList.add("active-blue");
    } else {
        //Erreur
    }
}