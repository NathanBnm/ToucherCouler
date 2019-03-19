var coord, coordCible;

functionitPlatean (n){
    var Jeu = document.getElementById("jeu");
    Jeu.innerHTML = "<div id=\"grid\"></div>";
    var Grid = document.getElementById("grid");

    var xCible = getRandomInt(1, n);
    var yCible = getRandomInt(1, n);
    coordCible = xCible + "x" + yCible;

    for (var i = 0; i <= n - 1; i++) {
        for (var j = 0; j <= n - 1; j++) {
            var x = (i + 1);
            var y = (j + 1);
            coord = x + "x" + y;
            Grid.innerHTML += "<button id=" + coord + " value=" + coord + " onclick=\"test('" + coord + ", " + coordCible + "');\"></button>";
        }
    }
    var taille = n * 40 + n * 1;
    Jeu.style.width = taille + "px";
    Jeu.style.height = taille + "px";
}

function test(coord, coordCible){
    console.log(coord, coordCible);
}

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function verifier(coord, coordCible) 
{
    console.log(coord);
    var x = coord.charAt(0);
    var y = coord.charAt(2);

    var xCible = coord.charAt(0);
    var yCible = coord.charAt(2);

    var distance;
    if (x == xCible && y == yCible)
    {
        distance = -1;
    }
    else 
    {
        distance = getCalculIndication();
    }
    return distance;
}

function gagner()
{
    if(Verification()==-1)
    {
        Alert("gagner !");
    }
    else 
    {
        Alert("La distance est de : "+getCalculIndication());
    }
}

function getCalculIndication()
{
    return (Math.abs(Math.abs(xOrdinateur-getCoordonneeUtilisateurX())-1)-(Math.abs(yOrdinateur-getCoordonneeUtilisateurY())-1));
}