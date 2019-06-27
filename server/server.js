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

app.post("/execPowerShellScript", (req, res) => {
    var form = req.body
    
  console.log("Executing basic script with paramters", form);
  child = spawn("powershell.exe",["-File", path.join(__dirname, "/script", "/example.ps1"), "-name", form.name, "-age", form.age, "-mail", form.mail]);
  var output = ""
  child.stdout.on("data",function(data){
      output += data
  });
  child.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });
  child.on("exit",function(){
      console.log("Powershell Script ended");
      console.log(output);      
      res.send(output).end();
  });

});

const httpServer = http.createServer(app);

httpServer.listen(5000, () => {
  console.log("http://localhost:" + 5000);
});
