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

    return regex.test(text);
  },

  decodeText: (operation) => {
    let sendField = document.getElementById('main__input__text').value;
    let receiveField = document.getElementById('main__output__text');

    if (action.checkText(sendField.trim())) {
      receiveField.innerHTML = operation(sendField.trim());
    } else {
      notification.invalidDecode();
    }
  },

  copyText: (fieldId) => {
    let text = document.getElementById(fieldId);
    text.select();
    text.setSelectionRange(0, 99999);

    if(text.value != '') {
      navigator.clipboard.writeText(text.value);
      notification.copy('copy-button-output');
    }
  },
}

const notification = {
  copy: (buttonId) => {
    let copyButton = document.getElementById(buttonId);

    copyButton.style.backgroundColor = '#90EE90';
    copyButton.innerHTML = 'Copiado';

    setTimeout(function() {
      copyButton.style.backgroundColor = '#008CDB';
      copyButton.innerHTML = 'Copiar';
    }, 500);
  },

  invalidDecode: () => {
    let notifyField = document.getElementById('main__input__warning__text');
    let notifyIcon = document.getElementById('main__input__warning__icon');
    let count = 0;

    const interval = setInterval(() => {
      if(count % 2 === 0) {
        notifyField.style.color = '#FF0000';
        notifyIcon.style.backgroundColor = '#FF0000';
      } else {
        notifyField.style.color = 'transparent';
        notifyIcon.style.backgroundColor = 'transparent';
      }

      if (++count === 20) {
        clearInterval(interval);
        notifyField.style.color = '#110F0F';
        notifyIcon.style.backgroundColor = '#008CDB';
      }
    }, 100);
  },
}
