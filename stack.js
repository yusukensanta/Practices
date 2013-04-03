var Stack = function(){
	this.array = new Array();
	this.push = function(x){	
		this.array.push(x);	
	}	
	this.pop = function(){
		return this.array.pop();
	}
}

var s = new Stack(){
	s.push(1);
	s.push(2);
	
	alert(s.pop());
	alert(s.pop());
}
		
