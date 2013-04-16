var readline = require("readline");

var repl  = readline.createInterface(process.stdin,process.stdout);
repl.setPrompt(">>>");

repl.prompt();

repl.on("line",function(line) {
		analyze(line);
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
var analyze = function(line) {

	var Term = [];//字句解析した文字列を格納する配列
	var indexIn  = 0, indexOut = 0, character;

	//入力文字列を読み込み、字句解析を実行
	while(indexIn < line.length) {
		character = line.charAt(indexIn);

		//関数化したほうがよい↓
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
			Term[indexOut] = character; 
			indexIn++; 
			indexOut++;
		}
	}
	console.log(Term);
	console.log(calcCons(makeCons(Term,0)));
	//	console.log(makeCons(Term,0));
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
var makeCons = function(Term,num) {
	var cons;
	makeCons.count = num;
	console.log(makeCons.count);
	chara = Term[makeCons.count]
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
				cons = new Cons("Operation", chara, makeCons(Term,makeCons.count+1));break;
			case '(':
				if(num == 0) {
					cons = new Cons("car", makeCons(Term,makeCons.count+1),null);break;
				} else {
					cons = new Cons("car", makeCons(Term, makeCons.count+1)
							,makeCons(Term,makeCons.count+1));
					break;
				}
			case ')':
				cons = null;
				break;
			case "setq":
				cons = new Cons("setq",chara,makeCons(Term,makeCons.count+1)); break;
			case "defun":
				cons = new Cons("defun",chara,makeCons(Term,makeCons.count+1));	break;
			default:
				var number = parseInt(chara);
				if(isNaN(number)) {
					cons = new Cons("Letter", chara , makeCons(Term,makeCons.count+1));break;
				} else {
					cons = new Cons("Number", number, makeCons(Term, makeCons.count+1));break;

				}
		}
	return cons;
}

var variable = {}; //変数定義用
var func     = {}; //関数定義用
var args     = []; //引数格納用
var funcTable = {};
var charList = []; //変数名及び引数名の一時保存用
var funcList = []; //関数名の一時保存用

//Consの中身を計算
var calcCons = function(cons) {
	switch(cons.type) {
		case "Number":
			return cons.car;break;
		case "Letter":
			var i = 0,j  = 0;
			var signal   = null;
			var max      = chooseLargerNum(charList.length,funcList.length);
			while(i < max) {
				if(cons.car == charList[i]) {
					signal = "Reserved as a Variable";break;
				}
				else if(cons.car == funcList[i]) {
					signal = "Reserved as a Func";break;
				}
				i++;
			}

			if(signal == "Reserved as a Variable") {

				return variable[cons.car];break;

			} else if(signal == "Reserved as a Func") {
				console.log("Return value = " + substitute(cons.cdr, cons.car, 0));

				if(substitute(cons.cdr, cons.car, 0) == "Success") {
					return calcCons(func[cons.car]);
					break;
				} else {
					return "***Fail to  Substite***";
				}

			} else {
				return cons.car;break;
			}
		case "Operation":
			switch(cons.car) {
				case '+':
					return calcCons(cons.cdr) + calcCons(cons.cdr.cdr); break;
				case '-':
					return calcCons(cons.cdr) - calcCons(cons.cdr.cdr); break;
				case '/':
					return calcCons(cons.cdr) / calcCons(cons.cdr.cdr); break;
				case '*':
					return calcCons(cons.cdr) * calcCons(cons.cdr.cdr); break;
				case '%':
					return calcCons(cons.cdr) % calcCons(cons.cdr.cdr); break;
				case '<':
					if(calcCons(cons.cdr) < calcCons(cons.cdr.cdr)){
						return "T"; 
					} else {
						return "Nil";
					} 
				case '>':
					if(calcCons(cons.cdr) > calcCons(cons.cdr.cdr)) {
						return "T";
					} else {
						return "Nil";
					}
				case '=':
					if(calcCons(cons.cdr) = calcCons(cons.cdr.cdr)) {
						return "T"; 
					} else {
						return "Nil"; 
					}
				case "if":
					if(calcCons(cons.cdr.car) != "Nil") {
						return calcCons(cons.cdr.cdr);
					} else {
						return calcCons(cons.cdr.cdr.cdr);
					}
			}

		case "car":
			return calcCons(cons.car); break;
		case "setq":
			var c = calcCons(cons.cdr);
			charList.push(c);
			variable[c] = calcCons(cons.cdr.cdr); break;
		case "defun":
			var funcName = calcCons(cons.cdr);
			funcList.push(funcName);
			console.log("here");

			func[funcName] = cons.cdr.cdr.cdr;
			var countChar = 0;
			argsInput(cons.cdr.cdr);
			console.log(args.length);
			console.log(args[0]);
			funcTable[funcName] = new Func(funcName, args);break;
			console.log(funcTable);
	}
	function chooseLargerNum(a, b) {
		if(a > b){
			return a;
		} else {
			return b;
		}
	}

	function argsInput(cons) {
		var tempChar    = calcCons(cons);
		args[countChar] = tempChar;
		charList.push(tempChar);
		countChar++;
//		console.log(args);
		if(cons.type == "car") {
			if(cons.car.cdr != null) { 
				argsInput(cons.car.cdr);
			}
		} else {
			if(cons.cdr != null) {
				argsInput(cons.cdr);
			}
		}
	}

	function substitute(cons, funcName, countInput) {
		var tempNum  = calcCons(cons);
		substitute.countNum = countInput;
//		console.log("character which we see is " + funcTable[funcName].args[substitute.countNum]);
		variable[funcTable[funcName].args[substitute.countNum]] = tempNum;
//		console.log("counter = " + substitute.countNum + " Then args's length = " + args.length);
		
		if(cons.cdr != null) {
			substitute.countNum++;
			return substitute(cons.cdr, funcName, substitute.countNum);
		} else {
			substitute.countNum++;
//			console.log("counter = " + substitute.countNum + " Then args's length = " + args.length);
			
			if(substitute.countNum == funcTable[funcName].args.length) {
				return "Success";
			} else {
				return "Failure";
			}
		}	
	}
}
//analyze("( if ( < 3 2) 2 3)");
analyze("( defun fib(l m  n ) (+ n (+ l m )))");
//analyze("( n)");
//analyze("( defun fib(n) (if(<n 3) 1 (+ (fib(-n 1))(fib(-n 2))))");
