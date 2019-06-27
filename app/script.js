function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

$(function() {
  console.log("jQuery Ready");
  var form = {};
  $("#btn").click(() => {
    console.log("Button clicked");
    form = {
      name: $("input[name=name]").val(),
      age: $("input[name=age]").val(),
      mail: $("input[name=mail]").val()
    };
    console.log(form);
    axios
      .post("/execPowerShellScript", form)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});
