//Gérer les erreurs
//Empêcher la génération d'autres grilles
//Difficulté élevée (déplacement)

var x, y, xCible, yCible, coord, coordCible, dim, niveau, taille;

function initJeu(t, n) {

    zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "<div id=\"grille\"></div>";
    grille = document.getElementById("grille");
    info = document.getElementById("info");

    niveau = n;
    taille = t;

    cibleAleatoire();
    initGrille();
    info.innerHTML = "<span class=\"bold\">Prêt à tirer ?</span> <br> Trouvez le sous-marin !";
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
        info.innerHTML = "<span class=\"bold\">Touché !</span> <br> Vous avez gagné la partie";
        cible.classList.add("active-red");
        cible.innerHTML = "<span class=\"number\">X</span>";
        victoire();
    } else if (distance <= 8) {
        if (niveau == 1) {
            bougerSousMarin();
            info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Le Sous-marin a bougé !<br> Vous étiez à <span class=\"bold\">" + distance + "</span> case du sous-marin ! ";
        }
        else {
            info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Vous êtes à <span class=\"bold\">" + distance + "</span> case(s) du sous-marin !";
            if (tips.checked) {
                cible.innerHTML = "<span class=\"number\">" + distance + "</span>";
            }
        }
        cible.classList.add("active-orange");
    } else if (distance > 8) {
        info.innerHTML = "<span class=\"bold\">A l'eau !</span>";
        cible.classList.add("active-blue");
    } else {
        //Erreur
    }

}

function bougerSousMarin() {
    var stockX = xCible;
    var stockY = yCible;
    do {
        cibleAleatoire(taille);
    }
    while (getCalculIndication(stockX, stockY, xCible, yCible) >= 8)
}

function victoire() {
    Swal.fire({
        title: 'Bravo ! Vous avez gagné ! 🎉',
        animation: false,
        customClass: {
          popup: 'animated tada'
        },
        backdrop: `
            rgba(0,0,123,0.4)
            url("/img/confettis.gif")
        `
      })
}

function SurDeVous(){
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
          swalButtons.fire(
            'Opération effectuée !'
          )
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalButtons.fire(
            'Très bien, on ne change rien !'
          )
        }
      })
}