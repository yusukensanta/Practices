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
	console.log(useCons(Term,1));
	
}

/*
var useCons = function(list,count){
	if(list[count] == '('){
		new Cons(new Cons(useCons(list[], count)) ,new Cons(useCons(list[], count)));
		count++;
		}
	else{
		new Cons(list[count], new Cons(useCons(list[count++],count));
		}
	}
}*/
		

var Cons = (function(){
	function Cons(type,car,cdr){
		this.type = type;
		this.car  = car;
		this.cdr  = cdr;
	}
	return Cons;
})();

//各種演算
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
		case '<':
			result = T; break;
		case '=':
			result = Nil; break;
	}
	return result;
}

//変数定義
var setq = function (variable, value){
	variable = value;
}

var defun = function(func,arg,express){
	var func = function(arg);
}
