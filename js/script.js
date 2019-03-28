var x, y, xCible, yCible, coord, coordCible, dim, niveau, taille, cpt;

function initJeu(t, n) {
    zoneJeu = document.getElementById("zoneJeu");
    zoneJeu.innerHTML = "<div id=\"grille\"></div>";
    grille = document.getElementById("grille");
    info = document.getElementById("info");
    compteur = document.getElementById("cpt");

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

    if(musicswitch.checked) {
        music();
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
        if(sound.checked) {
            bomb();
        }
        info.innerHTML = "<span class=\"bold\">Touché-Coulé !</span> <br> Vous avez gagné la partie";
        cible.classList.add("active-red");
        cible.innerHTML = "<span class=\"number\">X</span>";
        victoire();
    } else if (distance <= 8) {
        if(sound.checked) {
            alarm();
        }
        if (niveau == 1) {
            bougerSousMarin();
            if(distance == 1) {
                info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Le sous-marin s'est déplacé !<br> Vous étiez à <span class=\"bold\">" + distance + "</span> case du sous-marin ! ";
            } else {
                info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Le sous-marin s'est déplacé !<br> Vous étiez à <span class=\"bold\">" + distance + "</span> cases du sous-marin ! ";
            }
        }
        else {
            if(distance == 1) {
                info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Vous êtes à <span class=\"bold\">" + distance + "</span> case du sous-marin !";
            } else {
                info.innerHTML = "<span class=\"bold\">Sauve qui peut !</span> <br> Vous êtes à <span class=\"bold\">" + distance + "</span> cases du sous-marin !";
            }
            if (tips.checked) {
                cible.innerHTML = "<span class=\"number\">" + distance + "</span>";
            }
        }
        cible.classList.remove('active-blue');
        cible.classList.remove('active-test');
        cible.classList.add("active-orange");
    } else if (distance > 8) {
        if(sound.checked) {
            splash();
        }
        info.innerHTML = "<span class=\"bold\">A l'eau !</span>";
        cible.classList.remove('active-orange');
        cible.classList.remove('active-test');
        cible.classList.add("active-blue");
    } else {
        erreur();
    }

    cpt++;

    if(cpt == 1) {
        compteur.innerHTML = "<span class=\"bold\">" + cpt + "</span> Tir";
    } else {
        compteur.innerHTML = "<span class=\"bold\">" + cpt + "</span> Tirs";
    }
}

function bougerSousMarin() {
    var stockX = xCible;
    var stockY = yCible;
    do {
        cibleAleatoire(taille);
    }
    while (getCalculIndication(stockX, stockY, xCible, yCible) >= 4);
    //while (getCalculIndication(stockX, stockY, xCible, yCible) >= 8);

    let i, j;
    //Si le sous-marin se déplace on efface les anciennes couleurs
    for (i = 0; i <= taille - 1; i++) {
        for (j = 0; j <= taille - 1; j++) {
            x = (i + 1);
            y = (j + 1);

            coord = x + "x" + y;

            var cible = document.getElementById(coord);
            
            cible.classList.remove('active-orange');
            cible.classList.remove('active-blue');
            //cible.classList.remove('active-test');
        }
    }

    //Prototype : Affiche la zone dans laquelle le sous-marin a pu se déplacer sauf coins
    for (i = stockX - 4; i <= stockX + 4; i++) {
        for (j = stockY - 4; j <= stockY + 4; j++) {
            x = (i);
            y = (j);

            if(x > 0 && x <= 15 && y > 0 && y <= 15) {
                coord = x + "x" + y;
                console.log("OK", x, y);

                var cible = document.getElementById(coord);
                
                //cible.classList.add('active-test');
            }
        }
    }
}

function muteunmute() {
    var music = document.getElementById("music");
    if(music.duration > 0 && !music.paused) {
        if(music.muted == false) {
            music.muted = true;
        } else {
            music.muted = false;
        }
    } else {
        music.play();
    }
}

function music() {
    var music = document.getElementById("music");
    music.play();
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
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'Super ! Nouvelle partie',
        confirmButtonColor: '#2980b9',
        showCloseButton: true,
        onClose: resetGrille(),
        customClass: {
            popup: 'animated bounce'
        },
        backdrop: `
            rgba(0, 0, 123, .2)
            url("/img/confettisbis.gif")
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
            rgba(0, 0, 123, 0.2)
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
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Oui je suis sûr !',
        cancelButtonText: 'Finalement, non !',
        confirmButtonColor: '#2980b9',
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