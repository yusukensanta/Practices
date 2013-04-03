var Stack = function(){
	this.array = [];
	this.i = 0;
	this.h = 1;
	this.push = function(x){	
		this.array[this.i] = x;
		this.i++;	
	}	
	this.pop = function(){
		var j = this.array.length - this.h;
		this.h++;
		return this.array[j];
	}
}
function main(){
	var s = new Stack();
	s.push(1);
	s.push(2);
	s.push(9);
	s.push(2);
	
	console.log(s.pop());
	console.log(s.pop());
	console.log(s.pop());
	console.log(s.pop());
}
main();		
