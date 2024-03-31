// 数字
// 記号

class Number {
    constructor(number = '0', previousNumber = null) {
        this.previousNumber = previousNumber
        this.number = number;
    }

    add() {
        let number = parseInt(this.number);
        let previousNumber = parseInt(this.previousNumber);
        let total = previousNumber + number;
        this.number = String(total);
    }

    sub() {
        let number = parseInt(this.number);
        let previousNumber = parseInt(this.previousNumber);
        let total = previousNumber - number;
        this.number = String(total);
    }

    multiply() {
        let number = parseInt(this.number);
        let previousNumber = parseInt(this.previousNumber);
        let total = previousNumber * number;
        this.number = String(total);
    }

    divide() {
        let number = parseInt(this.number);
        let previousNumber = parseInt(this.previousNumber);
        let total = previousNumber / number;
        this.number = String(total);
    }

    reset() {
        this.number = '0';
        this.setScreen();
    }

    addstring(number) {
        this.number += number;
        this.setScreen();
    }

    substring() {
        if (this.number.length === 1) {
            this.number = 0;
        } else {
            this.number = this.number.slice(0, -1);
        }
        this.setScreen();
    }

    set(number) {
        this.number = number;
        this.setScreen();
    }

    setScreen() {
        document.querySelector('.screen').innerText = this.number;
    }

    get() {
        return this.number;
    }

    setPreviousNumber() {
        this.previousNumber = this.number; // 入れ替える
        this.number = '0';
    }

    calc(symb) {
        if (!symb) return;
        switch(symb) {
            case '+':
                this.add();
                break;
            case '−':
                this.sub();
                break;
            case '×':
                this.multiply();
                break;
            case '÷':
                this.divide();
                break;
        }
    }
}

class Symb {
    constructor(symbol) {
        this.symbol = symbol;
    }

    reset() {
        this.symbol = null;
    }

    set(symbol) {
        this.symbol = symbol;
    }

    get() {
        return this.symbol;
    }   
}

const screen = document.querySelector('.screen');
const calcButtons = document.querySelector('.calc-buttons');
let number = new Number();
let symb = new Symb();

function buttonClick(value) {
    if(isNaN(value)){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            number.reset();
            symb.reset();
            break;
        case '=':
            number.calc(symb.get());
            number.setScreen();
            symb.reset();
            break;
        case '←':
            number.substring();
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            number.setPreviousNumber();
    }
    symb.set(symbol);
}

function handleNumber(value) {
    if (number.get() == '0') {
        number.set(value);
    } else {
        number.addstring(value);
    }
}

calcButtons.addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});
