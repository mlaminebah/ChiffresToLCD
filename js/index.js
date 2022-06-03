
  /**
   * 
   * @param {*} nombre : correspondant à l'ensemble des chiffres à afficher
   * @returns une liste de chiffres composant le nombre
   */
   const numberToChiffres = (nombre) => {
    const numberToString = nombre.toString ().split ('');
    const ma = numberToString.map (digi => parseInt (digi));
    return ma;   
  }
  
  //fonctions pour éteindre une ou plusieurs leds
  var bas = (i,j,chiffre) => {chiffre [i][j] = ' '};
  var basColonne = (j,chiffre) => {
    for (let i = 0; i < chiffre .length; i ++)
      bas (i,j,chiffre);
  }
  /**
   * 
   * @param {*} ch : un chiffre
   * @returns : une matrice avec des leds on (avec 1 => '|' , 0 => '__' ) et off => '2' en fonction du chiffre reçu
   */
  var allumeLeds = (ch) => {
    let chiffre = [[' ','__',' '],['|','__','|'],['|','__','|']];//répresentation du digit 8
    //en fonction du chiffre on éteind quelques leds
    switch (ch) {
        case 0: bas (0,2,chiffre);bas (1,1,chiffre); break;
        case 1: basColonne (0,chiffre); basColonne (1,chiffre); break;
        case 2: bas (1,0,chiffre); bas (2,2,chiffre); break;
        case 3: basColonne (0,chiffre); break;
        case 4: bas(0,1,chiffre);bas (2,0,chiffre);bas (2,1,chiffre); break;
        case 5: bas (1,2,chiffre); bas (2,0,chiffre); break;
        case 6: bas (1,2,chiffre); break;
        case 7: basColonne (0,chiffre); bas (1,1,chiffre); bas (2,1,chiffre); break;
        case 8: break;
        case 9: bas (2,0,chiffre);
            break;
    }
    return chiffre;
  };
  /**
   * 
   * @param {*} lcd une matrice correspondant à l'affichage LCD d'un digit
   * @returns une balise span avec un tableau d'affichage des leds
   */
  var span_Tab = (lcd) => {
    let span = document.createElement ('span');//création d'un span
    let tab = document.createElement ('table');//Création d'un tableau
  
    for (let i = 0; i < lcd.length; i ++) {
      var tr = document.createElement('tr');//création d'une ligne
      for (let j = 0; j < lcd[i].length; j ++) {
        let td = document.createElement ('td');//création d'une colonne
        let txt = document.createTextNode (lcd[i][j]);//' ' , '__','|'
        td.appendChild (txt);//ajout de '&nbsp' ou '|','__' au td
        tr.appendChild (td);//ajout du td au tr
      }
      tab.appendChild (tr);//ajout de la ligne au tableau
    }
  
    span.appendChild (tab);//ajout du tableau au span 
    return span;
  };
  
  /**
   * Réaction suite à un évènement click
   */
  document.getElementById("valider").onclick = () => {
    const digits = document.getElementById("digits").value;
    let digitsLCD = document.getElementById("digitsLCD");
    digitsLCD.innerHTML = "";
    const chiffres = numberToChiffres(digits);//Tableau de digits
    chiffres.map ((d) => {digitsLCD.appendChild (span_Tab(allumeLeds(d)))});
      
  }
  
  