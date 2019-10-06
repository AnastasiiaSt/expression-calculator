function expressionCalculator(expr) {
	if (expr.search("/0") !== -1 || expr.search("/ 0") !== -1) {
		 throw "TypeError: Division by zero.";
	}

	let op = 0;
	let cl = 0;
	for (let char of expr) {
		if (char === "(") {
		op = op + 1;
		}
		if (char === ")") {
		cl = cl + 1;
		}
	}

	if (op !== cl ) {
		throw "ExpressionError: Brackets must be paired";
	} 

	let numArr = expr.match(/[0-9]+/g);
	let operArr = expr.match(/[(,),\-,+,*,/]/g);

	let mathematics = {
		'+': function (x, y) { return y + x },
		'-': function (x, y) { return y - x },
		'*': function (x, y) { return y * x },
		'/': function (x, y) { return y / x }
	}

	let priorities = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
	};

	let numStack = [];
	let operStack = [];

	let j = 0;
	let i = 0;

	while (operArr[j] === "(") {
		operStack.push(operArr[j]);
		j = j + 1;
	}

	numStack.push(numArr[i]);
	operStack.push(operArr[j]);

	j = j + 1;
	i = i + 1;

	let num;
	do {
		if (i < numArr.length) {numStack.push(numArr[i])};
		while (operArr[j] === "(") {
		operStack.push(operArr[j]);
		j = j + 1;
		}

	// end of parentheses
		while (operArr[j] === ")") {

			operArr[j] = operStack.pop();

    
			if (operStack[operStack.length - 1] === "(") {
				numStack.push(mathematics[operArr[j]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
			} else {
				while (operStack[operStack.length - 1] !== "(") {
					if (priorities[operArr[j]] >= priorities[operStack[operStack.length - 1]]) {
				numStack.push(mathematics[operArr[j]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
				operArr[j] = operStack.pop();
					} else {
				num = numStack.pop();
				numStack.push(mathematics[operStack[operStack.length - 1]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
				numStack.push(num);
				operStack.pop();    
					}
			}
				numStack.push(mathematics[operArr[j]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
			}

			operStack.pop(); 

			j = j + 1;

		} 
 
	// end of the string
		if (numArr.length - 1 === i) {
			operArr[j] = operStack.pop();
			if (numStack.length === 2) {
				numStack.push(mathematics[operArr[j]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
			} else {
				while (numStack.length > 2) {
				 if (priorities[operArr[j]] >= priorities[operStack[operStack.length - 1]]) {
				numStack.push(mathematics[operArr[j]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
				operArr[j] = operStack.pop();
				} else {
					 num = numStack.pop();
					 numStack.push(mathematics[operStack[operStack.length - 1]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
					 numStack.push(num);
					 operStack.pop();
				}
			}
				numStack.push(mathematics[operArr[j]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
			}

	// in-string/in-parentheses calculation
		} else {
			while (priorities[operArr[j]] <= priorities[operStack[operStack.length - 1]]) {
				numStack.push(mathematics[operStack[operStack.length - 1]](parseFloat(numStack.pop()), parseFloat(numStack.pop())));
				operStack.pop();
			}
			operStack.push(operArr[j]);
		}

			j = j + 1;
			i = i + 1;

	} while (i <= numArr.length - 1)

	let result = Number(numStack)
	return result;

}

module.exports = {
    expressionCalculator
}