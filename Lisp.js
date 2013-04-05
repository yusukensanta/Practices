var readline = require("readline");

var repl  = readline.createInterface(process.stdin,process.stdout);
repl.setPrompt(">>>");

repl.prompt();

repl.on("line",function(line){
	L_Analysis(line);
	repl.prompt();
	});
	
	repl.on("close",function(){
		console.log("bye!");
	
	});

var L_Analysis = function(line){
	var Term[];
	var n = 0;
	while(line.charAt[n] != null){
		Term[n] == line.charAt[n];	
		n++;
}	
	
