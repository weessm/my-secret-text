handleEncrypt = () => {
  action.decodeText(action.encryptText);
}

handleDecrypt = () => {
  action.decodeText(action.decryptText);
}

handleCopyOutput = () => {
  action.copyText('main__output__text');
}

const action = {
  encryptText: (text) => {
    const encryptKey = {
      'e': 'enter',
      'i': 'imes',
      'a': 'ai',
      'o': 'ober',
      'u': 'ufat'
    };

    const encryptText = text.split('').map(char => encryptKey[char] || char).join('');

    return encryptText;
  },

  decryptText: (text) => {
    const decryptKey = {
      'enter': 'e',
      'imes': 'i',
      'ai': 'a',
      'ober': 'o',
      'ufat': 'u'
    };

    const regex = new RegExp(Object.keys(decryptKey).join('|'), 'g');

    const decryptText = text.replace(regex, (match) => decryptKey[match]);

    return decryptText;
  },

  checkText: (text) => {
    const regex = /^[a-z\s]+$/;

    return regex.test(text)
  },

  decodeText: (operation) => {
    let sendField = document.getElementById('main__input__text').value;
    let receiveField = document.getElementById('main__output__text');

    if (action.checkText(sendField)) {
      receiveField.innerHTML = operation(sendField);
    }
  },

  copyText: (fieldId) => {
    let text = document.getElementById(fieldId);
    text.select();
    text.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(text.value);
  },
}
