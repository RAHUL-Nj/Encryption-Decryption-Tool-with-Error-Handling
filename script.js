function applyEncryption() {
  const text = document.getElementById('text').value;
  const key = document.getElementById('key').value;
  const algorithm = document.getElementById('algorithm').value;

  if (!text || !key) {
    alert('Please enter both text and key.');
    return;
  }

  if (algorithm === 'caesar' && isNaN(key)) {
    alert('Key must be a valid number for Caesar Cipher.');
    return;
  }

  let result = '';

  switch (algorithm) {
    case 'caesar':
      result = caesarCipherEncrypt(text, parseInt(key));
      break;
    case 'substitution':
      if (!isValidSubstitutionKey(key)) {
        alert('Invalid substitution key. It must be a permutation of the alphabet.');
        return;
      }
      result = substitutionCipherEncrypt(text, key);
      break;
    default:
      alert('Invalid algorithm selection.');
      return;
  }

  displayResult(result);
}

function applyDecryption() {
  const text = document.getElementById('text').value;
  const key = document.getElementById('key').value;
  const algorithm = document.getElementById('algorithm').value;

  if (!text || !key) {
    alert('Please enter both text and key.');
    return;
  }

  if (algorithm === 'caesar' && isNaN(key)) {
    alert('Key must be a valid number for Caesar Cipher.');
    return;
  }

  let result = '';

  switch (algorithm) {
    case 'caesar':
      result = caesarCipherDecrypt(text, parseInt(key));
      break;
    case 'substitution':
      if (!isValidSubstitutionKey(key)) {
        alert('Invalid substitution key. It must be a permutation of the alphabet.');
        return;
      }
      result = substitutionCipherDecrypt(text, key);
      break;
    default:
      alert('Invalid algorithm selection.');
      return;
  }

  displayResult(result);
}

function isValidSubstitutionKey(key) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return new Set(key).size === alphabet.length && [...key].every(char => alphabet.includes(char));
}

function displayResult(result) {
  const resultTextArea = document.getElementById('result');
  resultTextArea.value = result;

  const resultContainer = document.querySelector('.result-container');
  resultContainer.classList.add('show');
}

function caesarCipherEncrypt(text, key) {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 + key) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 + key) % 26) + 97);
    } else {
      result += text[i];
    }
  }

  return result;
}

function caesarCipherDecrypt(text, key) {
  return caesarCipherEncrypt(text, -key);
}

function substitutionCipherEncrypt(text, key) {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      result += key[charCode - 65];
    } else if (charCode >= 97 && charCode <= 122) {
      result += key[charCode - 97];
    } else {
      result += text[i];
    }
  }

  return result;
}

function substitutionCipherDecrypt(text, key) {
  const reversedKey = key.split('').reverse().join('');
  return substitutionCipherEncrypt(text, reversedKey);
}
