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
	
	var Term = [];//字句解析した文字列を格納する配列
	var indexIn  = 0, indexOut = 0, character;

	//入力文字列を読み込む
	while(indexIn < line.length){
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
	console.log(Term);
	MakeCons(Term,0);
}



var Cons = (function(){
	function Cons(type,car,cdr){
		this.type = type;
		this.car  = car;
		this.cdr  = cdr;
	}
	return Cons;
})();


var MakeCons = function(Term,num){
	var cons;
	MakeCons.count = num;
	console.log(MakeCons.count);
	switch(Term[MakeCons.count]){
		case '+':
		case '-':
		case '*':
		case '/':
		case '%':
		case "if":
			cons = new Cons("Operation", Term[MakeCons.count], MakeCons(Term,MakeCons.count+1));break;
		case '(':
			if(num == 0){
				cons = new Cons("car", Term[MakeCons.count],MakeCons(Term,MakeCons.count+1));break;
			}
			else{
				cons = new Cons("car", MakeCons(Term, MakeCons.count+1),MakeCons(Term,MakeCons.count+1));break;
			}
		case ')':
			cons = null;break;
		case "defun":
			cons = new Cons("defun",Term[MakeCons.count],MakeCons(Term,MakeCons.count+1));break;
		case '':
				num++;
				break;
		default:				
			var number = parseInt(Term[MakeCons.count]);
			cons = new Cons("number", number, MakeCons(Term, MakeCons.count+1));break;
	}
}
