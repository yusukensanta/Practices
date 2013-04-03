var Stack = function(){
	this.array = [];
	this.StackTop = 0;
	this.push = function(x){	
		this.array[this.StackTop] = x;
		this.StackTop++;	
	}	
	this.pop = function(){
		this.StackTop--;
		return this.array[this.StackTop];
	}
}
function main(){
	var s = new Stack();
	s.push(1);
	s.push(2);
	s.push(3);
	s.push(4);
	console.log(s.pop());
	console.log(s.pop());
	console.log(s.pop());
	console.log(s.pop());
	s.push(2);
	console.log(s.pop());
	s.push(9);
	console.log(s.pop());
	s.push(2);
	console.log(s.pop());
	
}
main();		
