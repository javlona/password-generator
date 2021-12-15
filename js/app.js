const rangInput = document.querySelector('#rangInput')
const copyIcon = document.querySelector('.copy-icon')
const generateIcon = document.querySelector('.generate-icon')
const copied = document.querySelector('.copied')
const copiedSound = new Audio('/sound/copied-sound.m4a')
const passwordOutput = document.querySelector('#passwordOutput')
const generateButton = document.querySelector('#generateButton')
const addNumbers = document.querySelector('#addNumbers')
const addSymbol = document.querySelector('#addSymbol')
const addUppercase = document.querySelector('#addUppercase')
const addLowercase = document.querySelector('#addLowercase')

let passwordLength = 6;
let generatedPassword;

// show live range slider numbers on DOM
window.addEventListener('input', () => {
    let rangeSlider = document.getElementById('rangeSlider');
    rangInput.innerHTML = rangeSlider.value
    passwordOutput.value.length = rangeSlider.value
})

// play copy sound and show copied
copyIcon.addEventListener('click', () => {
    copied.classList.add('active')
    // remove class after 1s
    setTimeout(() => {
        copied.classList.remove('active')
    }, 1000)
    copiedSound.play()
})

// crypto random number generator
function cryptoRandomNum(){
    return self.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
}

// functions that return single lowercase, uppercase, number and symbol
class Random {
    static lower(){
        return String.fromCharCode(Math.floor(cryptoRandomNum() * 26) + 97)
    }

    static upper(){
        return String.fromCharCode(Math.floor(cryptoRandomNum() * 26) + 65)
    }

    static numbers(){
        return String.fromCharCode(Math.floor(cryptoRandomNum() * 10) + 48)
    }

    static symbol(){
        const symbols = "!@#$%^&*()_+-={}?.,<>:;'"
        symbols[Math.floor(cryptoRandomNum() * symbols.length)]
    }
}


