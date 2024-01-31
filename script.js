handleEncrypt = () => {
  action.decodeText(action.encryptText);
}

handleDecrypt = () => {
  action.decodeText(action.decryptText);
}

handleCopyInput = () => {
  action.copyText('textarea__input', 'textbox__input__copy');
}

handleCopyOutput = () => {
  action.copyText('textarea__output', 'textbox__output__copy');
}

handleClearInput = () => {
  action.clearText('textarea__input');
}

handleClearOutput = () => {
  action.clearText('textarea__output');
}

handleConvertToValidText = () => {
  action.convertToValidText('textarea__input');
}

const action = {
  convertToValidText: (fieldId) => {
    let textarea = document.getElementById(fieldId);
    textarea.value = textarea.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\u005F]/g, '').replace(/[^\w\s]/g, '');
  },

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
    const regex = /^[a-z\d\s]+$/;

    return regex.test(text);
  },

  decodeText: (operation) => {
    let sendField = document.getElementById('textarea__input').value;
    let receiveField = document.getElementById('textarea__output');

    if (action.checkText(sendField.trim())) {
      receiveField.value = operation(sendField.trim());
    } else {
      notification.invalidDecode();
    }
  },

  copyText: (fieldId, buttonId) => {
    const text = document.getElementById(fieldId);

    if(text.value != '') {
      text.select();
      text.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(text.value);
      notification.copy(buttonId);
    }
  },

  clearText: (fieldId) => {
    const textarea = document.getElementById(fieldId);

    textarea.value = '';

    if(textarea.id.includes('input')) {
      textarea.focus();
    }
  },
}

const notification = {
  copy: (buttonId) => {
    let copyButton = document.getElementById(buttonId);

    const originalTextColor = '#F6F5AE';
    const originalText = 'Copiar';
    const alertColor = '#16b13a';
    const alertText = 'Copiado';

    copyButton.innerHTML = alertText;
    copyButton.style.border = `2px solid ${alertColor}`;

    setTimeout(function() {
      copyButton.innerHTML = originalText;
      copyButton.style.border = `2px solid ${originalTextColor}`;
    }, 500);
  },

  invalidDecode: () => {
    let notifyField = document.querySelector('.textbox__warning__text');
    let notifyIcon = document.querySelector('.textbox__warning__icon');
    let count = 0;

    const originalTextColor = '#F6F5AE';
    const originalBackgroundColor = '#1A1423';
    const alertColor = '#FF0000';

    const interval = setInterval(() => {
      if(count % 2 === 0) {
        notifyField.style.color = alertColor;
        notifyIcon.style.backgroundColor = alertColor;
      } else {
        notifyField.style.color = originalTextColor;
        notifyIcon.style.backgroundColor = originalBackgroundColor;
      }

      if (++count === 20) {
        clearInterval(interval);
        notifyField.style.color = originalTextColor;
        notifyIcon.style.backgroundColor = originalBackgroundColor;
      }
    }, 100);
  },
}
