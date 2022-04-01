// Elements

const encryptMode = document.querySelector(".encrypt");
const decryptMode = document.querySelector(".decrypt");

const plainText = document.querySelector(".plain_text");
const cipherText = document.querySelector(".cipher_text");
const inputKey = document.querySelector(".key");

const refreshButton = document.querySelector(".refresh-btn");
const decryptButton = document.querySelector(".decrypt-btn");
const copyButton = document.querySelector(".copy-btn");

const ascii = "abcdefghijklmnopqrstuvwxyz0123456789.,;:'`\"!@#$%^&*()_--=+{}[]|/~<>|\\\t\n ";
let text, key;

// disable fields
function disablefields() {
  inputKey.disabled = true;
  plainText.disabled = true;
  refreshButton.disabled = true;
  copyButton.disabled = true;
}
disablefields();
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

// clear fields
function clearfields() {
  plainText.value = cipherText.value = inputKey.value = "";
}

// enablefields
function enablefields() {
  inputKey.disabled = false;
  plainText.disabled = false;
  refreshButton.disabled = false;
  copyButton.disabled = false;
}

// Event listeners
encryptMode.addEventListener("click", () => {
  clearfields();
  enablefields();
  plainText.setAttribute("placeHolder", "text to encrypt");

  encryptMode.classList.toggle("encryptMode");
  decryptMode.classList.remove("decryptMode");

  plainText.addEventListener("input", (e) => {
    text = e.target.value;
    key = inputKey.value;

    // encrypt text
    const encrypt = function (text, key) {
      const letterPosition = [];
      text = reduceCase(text);
      key = reduceCase(key);

      [...text].forEach((_, i) => {
        const letterIndex = ascii.indexOf(text[i]) + ascii.indexOf(key[i]);
        letterPosition.push(letterIndex % ascii.length);
      });
      return letterPosition
        .map((charPostion) => ascii.charAt(charPostion))
        .join("")
        .toLocaleUpperCase();
    };
    cipherText.value = encrypt(text, genKey(key));
  });
});

decryptMode.addEventListener("click", () => {
  clearfields();
  enablefields();
  plainText.setAttribute("placeHolder", "text to decrypt");

  decryptMode.classList.toggle("decryptMode");
  encryptMode.classList.remove("encryptMode");

  plainText.addEventListener("input", () => {
    if (plainText.value === "") return;
    text = plainText.value;
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
      const ouput = letterPosition.map((charPostion) => ascii.charAt(charPostion)).join("");
      return capitaliseCase(ouput);
    };
    cipherText.value = decrypt(text, genKey(key));
  });
});

copyButton.addEventListener("click", () => {
  cipherText.select();
  navigator.clipboard.writeText(cipherText.value);
});

refreshButton.addEventListener("click", () => {
  clearfields();
  location.reload();
});
