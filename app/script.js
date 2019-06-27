$(function() {
  console.log("jQuery Ready");
  var form = {};
  // Cette fonction s'execute a chaque fois qu'on clique sur le bouton
  $("#btn").click(() => {
    console.log("Button clicked");
    // On récupère le contenu des cases du formulaire
    form = {
      name: $("input[name=name]").val(),
      age: $("input[name=age]").val(),
      mail: $("input[name=mail]").val()
    };
    console.log(form);
    // On envoi une requere HTTP POST au serveur sur la route /execPowerShellScript, avec la variable form qui contient toutes les infos du formulaire
    axios
      .post("/execPowerShellScript", form)
      // Et on log la reponse (qui doit contenir l'output du script PowerShell executé)
      .then(function(response) {
        console.log(response.data);
      })
      // Si y a des erreurs on les log
      .catch(function(error) {
        console.log(error);
      });
  });
});
