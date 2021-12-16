const rangInput = document.querySelector('#rangInput')
const copyIcon = document.querySelector('.copy-icon')
const generateIcon = document.querySelector('.generate-icon')
const copied = document.querySelector('.copied')
const copiedSound = new Audio('/sound/copied-sound.m4a')
const passwordOutput = document.querySelector('#passwordOutput')
const generateBtn = document.querySelector('#generateButton')
const addNumbers = document.querySelector('#addNumbers')
const addSymbols = document.querySelector('#addSymbols')
const addUppercase = document.querySelector('#addUppercase')
const addLowercase = document.querySelector('#addLowercase')

// show live range slider numbers on DOM
window.addEventListener('input', () => {
    let rangeSlider = document.getElementById('rangeSlider');
    rangInput.innerHTML = rangeSlider.value
})

// copy password to the clipboard with the sound and show "copied" text
copyIcon.addEventListener('click', () => {
    if (passwordOutput.innerHTML.trim() === "") return;

    copied.classList.add('active')
    // remove class after 1sec
    setTimeout(() => {
        copied.classList.remove('active')
    }, 1000)

    // copy password to the clipboard
    navigator.clipboard.writeText(passwordOutput.innerText)
    
    // play sound
    copiedSound.play()
})

// crypto random number generator
function cryptoRandomNum() {
    return self.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
}

// functions that return single lowercase, uppercase, number and symbol
class Random {
    static lower() {
        return String.fromCharCode(Math.floor(cryptoRandomNum() * 26) + 97)
    }

    static upper() {
        return String.fromCharCode(Math.floor(cryptoRandomNum() * 26) + 65)
    }

    static numbers() {
        return String.fromCharCode(Math.floor(cryptoRandomNum() * 10) + 48)
    }

    static symbols() {
        const chars = "!@#$%^&*()_+-={}?.,<>:;'`"
        return chars[Math.floor(cryptoRandomNum() * chars.length)]
    }
}

// at least on checkbox must be checked
function checkboxState() {
    let checked = [addNumbers, addSymbols, addLowercase, addUppercase].filter(elem => elem.checked)
    checked.forEach(elem => {
        
        (checked.length === 1) ? elem.disabled = true : elem.disabled = false
    })
}

// disable if only on checkbox left
[addNumbers, addSymbols, addLowercase, addUppercase].forEach(e => {
    e.addEventListener('click', checkboxState)
})

// get state of checkboxes and run generator
function genPassFinal() {
    const passwordLength = rangeSlider.value;
    const lower = addLowercase.checked;
    const upper = addUppercase.checked;
    const symbols = addSymbols.checked;
    const numbers = addNumbers.checked;

    passwordOutput.innerHTML = generatePassword(passwordLength, lower, upper, symbols, numbers)
}

// Fisher-Yates array shuffle algorithm
function shuffleArray(arr) {
    let currentIndex = arr.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

// main function that generates password
function generatePassword(len, lower, upper, symbols, numbers) {

    let password = []

    //check what checkboxes are true and get them in an array
    let types = [{lower}, {upper}, {symbols}, {numbers}].filter(val => Object.values(val)[0])

    for (let i = 0; i < len; i++) {
        types.forEach(key => {
            let func = Object.keys(key)[0]
            password.push(Random[func]())
        })
    }

    shuffleArray(password)

    //let startCut = Math.floor(cryptoRandomNum() * (password.length - len))
    return password.join("").substring(0, len)
}

// run generator on icon and button
[generateBtn, generateIcon].forEach(e => {
    e.addEventListener('click', genPassFinal)
})

// run generator on enter
window.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') genPassFinal()
})

// run generator on page load
window.addEventListener("load", genPassFinal)