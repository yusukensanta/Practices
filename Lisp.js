var readline = require("readline");

var repl  = readline.createInterface(process.stdin,process.stdout);
repl.setPrompt(">>>");

repl.prompt();

repl.on("line",function(line){
	console.log("here!");
	L_Analysis(line);
	repl.prompt();
	});
	
	repl.on("close",function(){
		console.log("bye!");
	
	});

var L_Analysis = function(line){
	var Term = [];
	var indexIn  = 0, indexOut = 0, character;
	console.log("right here!");
	while(line.charAt(indexIn) > line.charAt(line.length)){
		character = line.charAt(indexIn);
		
		if(character.match(/[0-9]/) || character.match("-")){	
			while(line.charAt(indexIn++) != " "){
				character = character + line.charAt(indexIn);	
			}
			Term[indexOut] = character;		
			console.log("Number");
			indexOut++;				
		}
		else if(character.match(/[a-z]/) || character.match(/[A-Z]/)){
			while(line.charAt(indexIn++) != " "){
				character = character + line.charAt(indexIn)			
			}
			Term[indexOut] = character;
			console.log("Character");
			indexOut++;
		}else if(character == " "){
			indexIn++;
			console.log("Brank");
		}
		else{
			Term[indexOut] = character; indexIn++; indexOut++;
			console.log("Symbol");
		}
	}
}	
