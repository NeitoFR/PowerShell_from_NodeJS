// Dependencies
const http = require("http"),
  path = require("path"),
  cors = require("cors"),
  express = require("express"),
  bodyParser = require('body-parser'),
  app = express();

var spawn = require("child_process").spawn,
  child;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/..", "app")));

app.get("/", function(req, res) {
  res.sendFile("index.html", { root: "./app" });
});

// Quand le serveur recois une requere HTTP POST sur la route /execPowerShellScript
app.post("/execPowerShellScript", (req, res) => {
  // req.body contient toute les infos qu'envoi le client (ici le name l'age et le mail)
    var form = req.body
    
  console.log("Executing basic PowerShell script with paramters", form);
  // Lancer le script Powershell en passant les paramètre
  child = spawn("powershell.exe",["-File", path.join(__dirname, "/script", "/example.ps1"), "-name", form.name, "-age", form.age, "-mail", form.mail]);
  
  // Récupérer ce que le script execute dans la variable output
  var output = ""
  child.stdout.on("data",function(data){
      output += data
  });

  //Si il y a des erreurs on les log
  child.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });

  // Fin de l'execution du script
  child.on("exit",function(){
      console.log("Powershell Script ended");
      console.log(output);
      // on envoi au client la variable output      
      res.send(output).end();
  });

});

const httpServer = http.createServer(app);

// Le serveur écoute sur le port 5000 (peut etre changé)
httpServer.listen(5000, () => {
  console.log("http://localhost:" + 5000);
});
