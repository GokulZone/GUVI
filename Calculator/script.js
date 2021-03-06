const container = document.createElement("div");
container.setAttribute("class", "container");
container.innerHTML = `
<div class="output">
<div previous class="datapreviousOutput"></div>
<div current class="datacurrentOutput"></div>
</div>
<button clear class="spanOne">AC</button>
<button delete>DEL</button>
<button operation>%</button>
<button operation>/</button>
<button number>1</button>
<button number>2</button>
<button number>3</button>
<button operation>*</button>
<button number>4</button>
<button number>5</button>
<button number>6</button>
<button operation>-</button>
<button number>7</button>
<button number>8</button>
<button number>9</button>
<button operation>+</button>
<button number>.</button>
<button number>0</button>
<button equals class="spanTwo">=</button>`
document.body.appendChild(container);



class Calculator {
    constructor(previousElement, currentElement) {
      this.previousElement = previousElement
      this.currentElement = currentElement
      this.clear()
  }

  clear() {
    this.currentOutput = ''
    this.previousOutput = ''
    this.operation = undefined
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1)

}

appendNumber(number) {
    if (number === '.' && this.currentOutput.includes('.')) return
    this.currentOutput = this.currentOutput.toString() + number.toString()
}

chooseOperation(operation) {
    if (this.currentOutput === '') return
    if (this.previousOutput !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOutput = this.currentOutput
    this.currentOutput = ''
}

compute() {
    let computation
    const prev = parseFloat(this.previousOutput)
    const current = parseFloat(this.currentOutput)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      case '%':
        computation = prev % current
        break
      default:
        return
    }
    this.currentOutput = computation
    this.operation = undefined
    this.previousOutput = ''
}


getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentElement.innerText = this.getDisplayNumber(this.currentOutput)
    if (this.operation != null) {
      this.previousElement.innerText =
        `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
    } else {
      this.previousElement.innerText = ''
    }
  }

}


const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const equalsButton = document.querySelector('[equals]');
const deleteButton = document.querySelector('[delete]');
const clearButton = document.querySelector('[clear]');
const previousElement = document.querySelector('[previous]');
const currentElement = document.querySelector('[current]');

const calculator = new Calculator(previousElement, currentElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })