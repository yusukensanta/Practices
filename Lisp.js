var readline = require("readline");

var repl  = readline.createInterface(process.stdin,process.stdout);
repl.setPrompt(">>>");

repl.prompt();

repl.on("line",function(line) {
		Analyze(line);
		repl.prompt();
		});

repl.on("close",function() {
		console.log("bye!");

		});
var Func = (function() {
		function Func(name,args) {
		this.name = name;
		this.args = args;
		}
		return Func;
		})();

//字句解析を実行する関数
var Analyze = function(line) {

	var Term = [];//字句解析した文字列を格納する配列
	var indexIn  = 0, indexOut = 0, character;

	//入力文字列を読み込み、字句解析を実行
	while(indexIn < line.length) {
		character = line.charAt(indexIn);
		if(character.match(/[0-9]/) || character.match("-")) {
			var countIn1 = indexIn + 1;
			while(line.charAt(countIn1) != " " && countIn1 <= line.length && line.charAt(countIn1).match(/[0-9]/)){
				character = character + line.charAt(countIn1);
				countIn1++;
			}
			indexIn = countIn1;
			Term[indexOut] = character;		
			indexOut++;	
		}
		else if(character.match(/[a-zA-Z]/)) {
			var countIn2 = indexIn + 1; 
			while(line.charAt(countIn2) != " " && countIn2 <=line.length && line.charAt(countIn2).match(/[a-zA-Z]/)) {
				character = character + line.charAt(countIn2)
					countIn2++;			
			}
			indexIn = countIn2;
			Term[indexOut] = character;
			indexOut++;
		} else if(character == " ") {
			indexIn++;
		} else {	
			Term[indexOut] = character; indexIn++; indexOut++;
		}
	}
	console.log(Term);
	console.log(CalcCons(MakeCons(Term,0)));
	//	console.log(MakeCons(Term,0));
}



var Cons = (function() {
		function Cons(type,car,cdr) {
		this.type = type;
		this.car  = car;
		this.cdr  = cdr;
		}
		return Cons;
		})();


//Cons Cellの生成
var MakeCons = function(Term,num) {
	var cons;
	MakeCons.count = num;
	console.log(MakeCons.count);
	chara = Term[MakeCons.count]
		switch(chara) {
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
				if(num == 0) {
					cons = new Cons("car", MakeCons(Term,MakeCons.count+1),null);break;
				} else {
					cons = new Cons("car", MakeCons(Term, MakeCons.count+1),MakeCons(Term,MakeCons.count+1));break;
				}
			case ')':
				cons = null;break;
			case "setq":
				cons = new Cons("setq",chara,MakeCons(Term,MakeCons.count+1)); break;
			case "defun":
				cons = new Cons("defun",chara,MakeCons(Term,MakeCons.count+1));	break;
			default:
				var number = parseInt(chara);
				if(isNaN(number)) {
					cons = new Cons("Letter", chara , MakeCons(Term,MakeCons.count+1));break;
				} else {
					cons = new Cons("Number", number, MakeCons(Term, MakeCons.count+1));break;

				}
		}
	return cons;
}


var variable = {}; //変数定義用
var func     = {}; //関数定義用
var args     = []; //引数格納用
var funcTable = {};
var listOfchar = []; //変数名及び引数名の一時保存用
var listOffunc = []; //関数名の一時保存用

//Consの中身を計算
var CalcCons = function(cons) {
	switch(cons.type) {
		case "Number":
			return cons.car;break;
		case "Letter":
			var i = 0,j  = 0;
			var signal   = null;
			var max      = ChooseLarger(listOfchar.length,listOffunc.length);
			while(i < max) {
				if(cons.car == listOfchar[i]) {
					signal = "Reserved as a Variable";break;
				}
				else if(cons.car == listOffunc[i]) {
					signal = "Reserved as a Func";break;
				}
				i++;
			}

			if(signal == "Reserved as a Variable") {

				return variable[cons.car];break;

			} else if(signal == "Reserved as a Func") {
				if(Substitute(cons.cdr,cons.car,0) == "Success"){
					return CalcCons(func[cons.car]);
					break;
				} else {
                                   	return "Error at Substitution";
				}

			} else {
				return cons.car;break;
			}
		case "Operation":
			switch(cons.car) {
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
					if(CalcCons(cons.cdr) < CalcCons(cons.cdr.cdr)){
						return "T"; 
					} else {
						return "Nil";
					} 
				case '>':
					if(CalcCons(cons.cdr) > CalcCons(cons.cdr.cdr)) {
						return "T";
					} else {
						return "Nil";
					}
				case '=':
					if(CalcCons(cons.cdr) = CalcCons(cons.cdr.cdr)) {
						return "T"; 
					} else {
						return "Nil"; 
						}
				case "if":
					if(CalcCons(cons.cdr.car) != "Nil") {
						return CalcCons(cons.cdr.cdr);
					} else {
						return CalcCons(cons.cdr.cdr.cdr);
					}
				}
			
		case "car":
			return CalcCons(cons.car); break;
		case "setq":
			var c = CalcCons(cons.cdr);
			listOfchar.push(c);
			variable[c] = CalcCons(cons.cdr.cdr); break;
		case "defun":
			var nameOfFunc = CalcCons(cons.cdr);
			listOffunc.push(nameOfFunc);
			console.log("here");

			func[nameOfFunc] = cons.cdr.cdr.cdr;
			var counter = 0;
			argsInput(cons.cdr.cdr);
			console.log(args.length)
			console.log(args[0]);
			funcTable[nameOfFunc] = new Func(nameOfFunc, args);break;
			console.log(funcTable);
	}
	function ChooseLarger(a, b) {
		if(a > b){
			return a;
		} else {
			return b;
		}
	}

	function argsInput(cons) {
		var tempChar  = CalcCons(cons);
		args[counter] = tempChar;
		listOfchar    = tempChar;
		counter++;
		console.log(args);
		if(counter == 1) {
			if(cons.car.cdr != null) { 
				var cons1 = cons.car.cdr;
				argsInput(cons1);
			}
		} else {
			if(cons.cdr != null) {
				var cons2 = cons.cdr;
				argsInput(cons2);
			}
		}
	}

	function Substitute(cons,nameOfFunc,counter) {
		var tempNum  = CalcCons(cons);
		variable[funcTable[nameOfFunc].args[counter]] = tempNum;
		console.log("Substituted is "+ tempNum + " and Character is " + funcTable[nameOfFunc].args[counter]);
		counter++;
		if(cons.cdr != null) {
 			Substitute(cons.cdr, nameOfFunc, counter);
		}
		if(counter + 1 < args.length || counter + 1 > args.length) {
			return "Error";
		} else {
			return "Success";
		}
	}
}
//Analysis("( if ( < 3 2) 2 3)");
Analyze("( defun fib(l m n ) (+ n( + l   m)))");
//Analysis("( n)");
//Analyze("( defun fib(n) (if(<n 3) 1 (+ (fib(-n 1))(fib(-n 2))))");
