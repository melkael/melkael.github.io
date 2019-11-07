let num1 = '';
let num2 = '';
let currentNum = ''
let operator = '';
let total = '';

function handleNumber(num) {
    if (operator === '') {
        num1 += num;
    	displayNum(num1);
    } else {
        num2 += num;
    	displayNum(num2);
    }
}

function handleOperator(oper) {
    if (operator === '') {
        operator = oper;
    } else {
        handleTotal();
        operator = oper;
    }
}

function handleTotal() {
    switch (operator) {
        case '+':
            total = +num1 + +num2;
            num1 = total
	        num2 = ''
	        operator = ''
	        displayNum(total);
            break;
        case '-':
            total = +num1 - +num2;
            num1 = total
	        num2 = ''
	        operator = ''
	        displayNum(total);
            break;
        case '/':
            total = +num1 / +num2;
            num1 = total
	        num2 = ''
	        operator = ''
	        displayNum(total);
            break;
        case 'x':
            total = +num1 * +num2;
            num1 = total
	        num2 = ''
	        operator = ''
	        displayNum(total);
            break;
        case '=':
            displayNum(total);
            break
    }
}

function displayNum(num) {
    $('.calc-result-input').html(num);
    console.log(num)
}

$(".calc-btn-nb").click(function(){
	handleNumber(this.innerHTML);
    console.log(total)
})

$(".calc-btn-op").click(function(){
	handleOperator(this.innerHTML);
})

// reset the values when the calculator is closed

$("#closer-calculator").click(function(){
    num1 = '';
    num2 = '';
    currentNum = '';
    operator = '';
    total = '';
    displayNum('<br>');
})

$(".calc-clear").click(function(){
    num1 = '';
    num2 = '';
    currentNum = '';
    operator = '';
    total = '';
    displayNum('<br>');
})