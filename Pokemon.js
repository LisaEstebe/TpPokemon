function getpokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  // -- option pour faire la req AJAX -> ici req GET
  let fetchOptions = { method: "GET" };
  // -- faire la req AJAX vers le serveur pour récuperer les films
  // -- req HTTP vers le serveur et attente (en asynchrone) de la réponse
  fetch(url, fetchOptions)
    .then((response) => {
      // -- réponse au sens du protocole HTTP
      return response.json(); // -- extraire les données au format JSON
    })
    .then((dataJSON) => {
      // dataJSON = les données renvoyées au format JSON
      console.log(dataJSON);
      let pokemons = dataJSON.results; // les films sont le tableau "results"

      //ranger par ordre alphabétique
      pokemons.sort((p1, p2) => {
        return p1.name < p2.name;
      });

      let resHTML = ""; // variable pour contenir le html généré
      // boucle sur le tableau des films
      for (let p of pokemons) {
        resHTML =
          resHTML + '<option value="' + p.url + '">' + p.name + "</option>";
      }
      // insérer le HTML dans la liste <ul></ul> du fichier index.html
      document.getElementById("liste").innerHTML = resHTML;
    })
    .catch((error) => {
      // gestion des erreurs
      console.log(error);
    });
}
getpokemon();

document.getElementById("liste").addEventListener("change", getInfosPokemon);

function getInfosPokemon(event) {
  const url = event.target.value;
  // console.log(url);
  // -- option pour faire la req AJAX -> ici req GET
  let fetchOptions = { method: "GET" };
  // -- faire la req AJAX vers le serveur pour récuperer les films
  // -- req HTTP vers le serveur et attente (en asynchrone) de la réponse
  fetch(url, fetchOptions)
    .then((response) => {
      // -- réponse au sens du protocole HTTP
      return response.json(); // -- extraire les données au format JSON
    })
    .then((dataJSON) => {
      // dataJSON = les données renvoyées au format JSON
      console.log(dataJSON);
      let infos = dataJSON; // les films sont le tableau "results"

      let resHTML = ""; // variable pour contenir le html généré
      // boucle sur le tableau des films
      resHTML =
        "Le Pokemon " +
        infos.name +
        " mesure " +
        infos.height +
        "cm et pèse " +
        infos.weight +
        "kg" +
        '<img src="' +
        infos.sprites.front_default +
        '"/>';
      // insérer le HTML dans la liste <ul></ul> du fichier index.html
      document.getElementById("details").innerHTML = resHTML;
    })
    .catch((error) => {
      // gestion des erreurs
      console.log(error);
    });
}
