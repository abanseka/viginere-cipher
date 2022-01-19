// Elements

const inputText = document.querySelector(".input__text");
const outputText = document.querySelector(".output__text");
const inputKey = document.querySelector(".key");
const encryptButton = document.querySelector(".encrypt-btn");
const decryptButton = document.querySelector(".decrypt-btn");
const compareButton = document.querySelector(".compare-btn");
const refreshButton = document.querySelector(".refresh-btn");
const ascii =
  "abcdefghijklmnopqrstuvwxyz0123456789.,;:'`\"!@#$%^&*()_--=+{}[]|/~<>|\\\t\n ";
let text, key;

// generateKey
const genKey = function (string) {
  key = string
    .split("")
    .filter((e) => e !== " ")
    .join("")
    .toLocaleLowerCase()
    .repeat(text.length)
    .slice(0, text.length);
  return key;
};

// capitalise word
function capitaliseCase(word) {
  return word[0].toUpperCase() + word.slice(1, text.length);
}

// transform text to lowerCase
function reduceCase(text) {
  return text.toLowerCase();
}

// Event listeners
encryptButton.addEventListener("click", () => {
  if (inputText.value === "" || inputKey.value === "") {
    alert("cannot be empty");
    return;
  }
  text = inputText.value;
  key = inputKey.value;

  // encrypt text
  const encrypt = function (text, key) {
    const letterPosition = [];
    text = reduceCase(text);
    key = reduceCase(key);

    // get text letter positions in alphabet
    // for each letter in the text, find it's correspinding index in the alphabet
    // do same for key then, sum them (LetterIndex + KeyIndex) and divide by entire alphabet
    // the resulting remainder will be the index of the cipher letter
    [...text].forEach((_, i) => {
      const letterIndex = ascii.indexOf(text[i]) + ascii.indexOf(key[i]);
      letterPosition.push(letterIndex % ascii.length);
    });
    return letterPosition
      .map((charPostion) => ascii.charAt(charPostion))
      .join("")
      .toLocaleUpperCase();
  };
  outputText.value = encrypt(text, genKey(key));
});

decryptButton.addEventListener("click", () => {
  text = outputText.value;
  key = inputKey.value;

  // decrypt key
  const decrypt = function (text, key) {
    const letterPosition = [];
    text = reduceCase(text);
    key = reduceCase(key);

    // get text letter positions in alphabet
    [...text].forEach((_, i) => {
      const letterIndex = ascii.indexOf(text[i]) - ascii.indexOf(key[i]);
      letterPosition.push((letterIndex + ascii.length) % ascii.length);
    });
    return capitaliseCase(
      letterPosition.map((charPostion) => ascii.charAt(charPostion)).join("")
    );
  };
  outputText.value = decrypt(text, genKey(key));
});

compareButton.addEventListener("click", () => {
  // compare by checking if (Pi + Ki) === Ci
  // Pi = index of letter in text
  // Ki = index of letter in key
  // Ci = index of cipher letter equivalent of letter in text
});

refreshButton.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  inputKey.value = "";
});
