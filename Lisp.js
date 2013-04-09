var readline = require("readline");

var repl  = readline.createInterface(process.stdin,process.stdout);
repl.setPrompt(">>>");

repl.prompt();

repl.on("line",function(line){
	console.log("here!");
	Analysis(line);
	repl.prompt();
	});
	
	repl.on("close",function(){
		console.log("bye!");
	
	});

var Analysis = function(line){
	var Term = [];
	var indexIn  = 0, indexOut = 0, character;
	console.log("right here!");
	while(indexIn <= line.length){
		character = line.charAt(indexIn);
		console.log("indexIN = "  + indexIn);
		console.log("indexOut = " + indexOut);
		if(character.match(/[0-9]/) || character.match("-")){
			var countIn1 = indexIn + 1;
			while(line.charAt(countIn1) != " " && countIn1 <= line.length && line.charAt(countIn1).match(/[0-9]/)){
				character = character + line.charAt(countIn1);
				countIn1++;
			}
			indexIn = countIn1;
			Term[indexOut] = character;		
			console.log(character);
			indexOut++;	
		}
		else if(character.match(/[a-z]|[A-Z]/)){
			var countIn2 = indexIn + 1; 
			while(line.charAt(countIn2) != " " && countIn2 <=line.length && line.charAt(countIn2).match(/[a-z]|[A-Z]/)) {
				character = character + line.charAt(countIn2)
				countIn2++;			
			}
			indexIn = countIn2;
			Term[indexOut] = character;
			console.log(character);
			indexOut++;
		}else if(character == " "){
			indexIn++;
			console.log("Brank");
		}
		else{
			Term[indexOut] = character; indexIn++; indexOut++;
			console.log(character);
		}
	}
}	

