var quicksort = function (array,leftnum,rightnum){
	this.rightarray = [];
	this.leftarray  = [];
	var indexleft   = leftnum;
	var indexright  = rightnum;
	var pivot;

	pivot = (leftnum+rightnum)/2

	while(indexleft > indexright){
		while(array[indexleft]<pivot)indexleft++;
		while(array[indexright]>pivot)indexright--;
	
		exchange(array[indexleft], array[indexright]);
	}
	if(leftnum < indexright) quicksort(array,leftnum,indexright);
	if(indexleft < rightnum) quicksort(array,indexleft,rightnum);
	
	return array;
}

function exchange(left, right){
	var change;
	
	change = left;
	left   = right;
	right  = change;
}

var array = [2,5,6,7,9,1,1,2,4,8];
quicksort(array,0,array.length);

for(var index = 0; index< array.length; index++){
	console.log(array[index]);
}
