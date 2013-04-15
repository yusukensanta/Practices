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

//字句解析を実行する関数
var Analysis = function(line){
	
	var Term = [];//字句解析した文字列を格納する配列
	var indexIn  = 0, indexOut = 0, character;

	//入力文字列を読み込み、字句解析を実行
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
	console.log(CalcCons(MakeCons(Term,0)));
}



var Cons = (function(){
	function Cons(type,car,cdr){
		this.type = type;
		this.car  = car;
		this.cdr  = cdr;
	}
	return Cons;
})();


//Cons Cellの生成
var MakeCons = function(Term,num){
	var cons;
	MakeCons.count = num;
	console.log(MakeCons.count);
	chara = Term[MakeCons.count]
	switch(chara){
		case '+':
		case '-':
		case '*':
		case '/':
		case '%':
		case '<':
		case '>':
		case '=':
		case "if":
			cons = new Cons("Operation", chara, MakeCons(Term,MakeCons.count+1));break;
		case '(':
			if(num == 0){
				cons = new Cons("car", MakeCons(Term,MakeCons.count+1),null);break;
			}
			else{
				cons = new Cons("car", MakeCons(Term, MakeCons.count+1),MakeCons(Term,MakeCons.count+1));break;
			}
		case ')':
			cons = null;break;
		case "setq":
			cons = new Cons("setq",chara,MakeCons(Term,MakeCons.count+1)); break;
		case "defun":
			cons = new Cons("defun",chara,MakeCons(Term,MakeCons.count+1));break;
		default:
			var number = parseInt(chara);
			if(isNaN(number)){
				cons = new Cons("Letter", chara , MakeCons(Term,MakeCons.count+1));break;
			}else{
				cons = new Cons("Number", number, MakeCons(Term, MakeCons.count+1));break;
		}
	}
	return cons;
}


var variable = {}; //変数定義用
var memoryOfchar = []; //変数名の一時保存用
var memoryOffunc = []; //関数名の一時保存用


//Consの中身を計算
var CalcCons = function(cons){
	switch(cons.type){
		case "Number":
			return cons.car;break;
		case "Letter":
			var i = 0,j = 0;
			var signal = null;
			while(i < memoryOfchar.length){
				if(cons.car == memoryOfchar[i]){
					signal = "Reserved as a Variable";break;
				}
				i++;
			}
			while(j < memoryOffunc.length){
				if(cons.car == memoryOffunc[j]){
					signal = "Reserved as a Func";break;
				}
				j++;
			}
			
			if(signal == "Reserved as a Variable"){

				return variable[cons.car];break;

			}else if(signal == "Reserved as a Func"){
				break;
			}else{
				return cons.car;break;
			}
		case "Operation":
			switch(cons.car){
				case '+':
					return CalcCons(cons.cdr) + CalcCons(cons.cdr.cdr); break;
				case '-':
					return CalcCons(cons.cdr) - CalcCons(cons.cdr.cdr); break;
				case '/':
					return CalcCons(cons.cdr) / CalcCons(cons.cdr.cdr); break;
				case '*':
					return CalcCons(cons.cdr) * CalcCons(cons.cdr.cdr); break;
				case '%':
					return CalcCons(cons.cdr) % CalcCons(cons.cdr.cdr); break;
				case '<':
					if (CalcCons(cons.cdr) < CalcCons(cons.cdr.cdr)){
						return "T";
					}else{
						return "Nil";
					}
				case '>':
					if(CalcCons(cons.cdr) > CalcCons(cons.cdr.cdr)){
						return "T";
					}else{
						return "Nil";
					}
				case '=':
					if(CalcCons(cons.cdr) = CalcCons(cons.cdr.cdr)){
						return "T";
					}else{
						return "Nil";
					}
				case "if":
					if(CalcCons(cons.cdr.car)!="Nil"){
						return CalcCons(cons.cdr.cdr);
					}else{
						return CalcCons(cons.cdr.cdr.cdr);
					}
				}
		case "car":
			return CalcCons(cons.car); break;
		case "setq":
			var tempchar = CalcCons(cons.cdr);
			console.log(tempchar);
			memoryOfchar.push(tempchar);
			variable[tempchar] = CalcCons(cons.cdr.cdr);
		case "defun":
			var tempFunc = CalcCons(cons.cdr);
			memoryOffunc.push(tempFunc);
			//deFun(tempFunc, cons.cdr.cdr, cons.cdr.cdr.cdr); break;
	}
}


