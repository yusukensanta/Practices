var readline = require("readline");

var repl  = readline.createInterface(process.stdin,process.stdout);
repl.setPrompt(">>>");

repl.prompt();

repl.on("line",function(line){
	Analysis(line);
	repl.prompt();
	});
	
	repl.on("close",function(){
		console.log("bye!");
	
	});

var Analysis = function(line){
	var Term = [];
	var indexIn  = 0, indexOut = 0, character;
	while(indexIn <= line.length){
		character = line.charAt(indexIn);
		if(character.match(/[0-9]/) || character.match("-")){
			var countIn1 = indexIn + 1;
			while(line.charAt(countIn1) != " " && countIn1 <= line.length && line.charAt(countIn1).match(/[0-9]/)){
				character = character + line.charAt(countIn1);
				countIn1++;
			}
			indexIn = countIn1;
			Term[indexOut] = character;		
			indexOut++;	
		}
		else if(character.match(/[a-zA-Z]/)){
			var countIn2 = indexIn + 1; 
			while(line.charAt(countIn2) != " " && countIn2 <=line.length && line.charAt(countIn2).match(/[a-zA-Z]/)) {
				character = character + line.charAt(countIn2)
				countIn2++;			
			}
			indexIn = countIn2;
			Term[indexOut] = character;
			indexOut++;
		}else if(character == " "){
			indexIn++;
		}
		else{
			Term[indexOut] = character; indexIn++; indexOut++;
		}
	}
	S_Analysis(Term);
}	

var S_Analysis = function(Term){
	var Index = 0;
	var Calculate = [];

	while(Index <= Term.length){
		if(Term[Index] == ')'){
			var InNum = 0;
		 	BackIndex = Index - 1;
			while(Term[BackIndex] != '('){
				Calculate[InNum] = Term[BackIndex];
				InNum++;
				BackIndex--;
			}
			Term.splice(BackIndex + 1, (Index - BackIndex));
			Term[BackIndex] = Calc(Calculate[2],Calculate[1],Calculate[0]);
		Index = -1;
		}
	Index++;
	}
	console.log(Term[0]);
}

var Calc = function (operater, number1, number2){
	var num1 = parseInt(number1);
	var num2 = parseInt(number2);
	var result;
	switch (operater){
		case '+':
			result = num1 + num2; break;
		case '-':
			result = num1 - num2; break;
		case '*':
			result = num1 * num2; break;
		case '/':
			result = num1 / num2; break;
		case '%':
			result = num1 % num2; break;
	}
	return result;
}
