
var x, y, xCible, yCible, coord, coordCible, dim, niveau, taille, cpt;
function initJeu(t, n) {
    zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "<div id=\"grille\"></div>";
    grille = document.getElementById("grille");
    info = document.getElementById("info");

    cpt = 0;
    niveau = n;
    taille = t;

    cibleAleatoire();

    if (taille == 8 || taille == 10 || taille == 15) {
        initGrille();
    } else {
        erreur();
    }

    if (niveau == 1) {
        tips.setAttribute("disabled", true);
        tips.checked = false;
    } else {
        tips.removeAttribute("disabled");
    }

    info.innerHTML = "<span class=\"bold\">Prêt à tirer ?</span> <br> Trouvez le sous-marin !";
}

function resetGrille() {
    initJeu(taille, niveau);
}

function initGrille() {

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


function cibleAleatoire() {
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
        bomb();
        info.innerHTML = "<span class=\"bold\">Touché-Coulé !</span> <br> Vous avez gagné la partie";
        cible.classList.add("active-red");
        cible.innerHTML = "<span class=\"number\">X</span>";
        victoire();
    } else if (distance <= 8) {
        alarm();
        if (niveau == 1) {
            bougerSousMarin();
            info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Le sous-marin s'est déplacé !<br> Vous étiez à <span class=\"bold\">" + distance + "</span> case du sous-marin ! ";
        }
        else {
            info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Vous êtes à <span class=\"bold\">" + distance + "</span> case(s) du sous-marin !";
            if (tips.checked) {
                cible.innerHTML = "<span class=\"number\">" + distance + "</span>";
            }
        }
        cible.classList.add("active-orange");
    } else if (distance > 8) {
        splash();
        info.innerHTML = "<span class=\"bold\">A l'eau !</span>";
        cible.classList.add("active-blue");
    } else {
        erreur();
    }

    cpt++;
}

function bougerSousMarin() {
    var stockX = xCible;
    var stockY = yCible;
    do {
        cibleAleatoire(taille);
    }
    while (getCalculIndication(stockX, stockY, xCible, yCible) >= 8)
}

function bomb() {
    var bomb = document.getElementById("bomb");
    bomb.play();
}

function alarm() {
    var alarm = document.getElementById("alarm");
    alarm.play();
}

function splash() {
    var splash = document.getElementById("splash");
    splash.play();
}

function victoire() {
    Swal.fire({
        title: 'Bravo !',
        text: 'Vous avez gagné en ' + (cpt + 1) + ' coup(s) ! 🎉',
        animation: false,
        customClass: {
            popup: 'animated tada'
        },
        backdrop: `
            rgba(0,0,123,0.4)
            url("/img/confettis.gif")
        `
    }).then((result) => {
        if (result.value) {
            resetGrille();
        }
    })
}

function erreur() {
    Swal.fire({
        title: 'Erreur !',
        text: 'Une erreur est survenue',
        backdrop: `
            rgba(0,0,123,0.4)
        `
    }).then((result) => {
        if (result.value) {
            window.location.reload();
        }
    })
}

function surDeVous() {
    const swalButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true,
    })

    swalButtons.fire({
        title: 'Êtes vous sûr de vous ?',
        text: "Si vous appuyez, la partie va redémarrer !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui je suis sûr !',
        cancelButtonText: 'Finalement, non !',
        reverseButtons: true,
    }).then((result) => {
        if (result.value) {
            resetGrille();
        } else {
            if (tips.checked) {
                tips.checked = false;
            } else {
                tips.checked = true;
            }
        }
    })
}