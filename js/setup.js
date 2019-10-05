'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  var getRandom = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var generateWizards = function () {
    var wizards = [];

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizards.push({
        name: WIZARD_NAMES[Math.round(getRandom(0, WIZARD_NAMES.length))] + ' ' + WIZARD_SURNAME[Math.round(getRandom(0, WIZARD_SURNAME.length))],
        coatColor: COAT_COLORS[Math.round(getRandom(0, COAT_COLORS.length))],
        eyesColor: EYES_COLORS[Math.round(getRandom(0, EYES_COLORS.length))]
      });
    }

    return wizards;
  };

  var renderWizard = function (template, wizard) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var getSimilarWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(similarWizardTemplate, wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  getSimilarWizards(generateWizards());

  var KeyboardKey = {
    ENTER: 'Enter',
    ESC: 'Esc',
    ESCAPE_IE: 'Escape'
  };

  var isEscKey = function (evt) {
    return evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE;
  };

  var isEnterKey = function (evt) {
    return evt.key === KeyboardKey.ENTER;
  };

  // /////////////////////////////////////////////////////////////////
  /* Обработка пользовательских взаимодействий*/
  // ////////////////////////////////////////////////////////////////

  // Блок управления открытием и закрытием модального окна
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  setup.addEventListener('change', function () {
    return document.activeElement === userNameInput
      ? document.removeEventListener('keydown', onPopupEscPress)
      : document.addEventListener('keydown', onPopupEscPress);
  });

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (isEscKey(evt) && !(document.activeElement === userNameInput)) {
      closePopup();
      evt.stopPropagation();
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });


  setupClose.addEventListener('keydown', function (evt) {
    if (isEscKey(evt)) {
      closePopup();
    }
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из двух символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  // Блок управления внешним видом волшебника

  var setupPlayer = document.querySelector('.setup-player');
  var setupWizard = setupPlayer.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatInput = setupPlayer.querySelector('[name=coat-color]');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = setupPlayer.querySelector('[name=eyes-color]');
  var fireballContainer = document.querySelector('.setup-fireball-wrap');
  var fireballInput = fireballContainer.querySelector('[name=fireball-color]');

  var setFillProperty = function (array) {
    return function (element, input) {
      element.style.fill = getRandomArrayElement(array);
      input.value = element.style.fill;
    };
  };

  var setBackgroundProperty = function (array) {
    return function (element, input) {
      element.style.backgroundColor = getRandomArrayElement(array);
      input.value = element.style.backgroundColor;
    };
  };

  var setCoatColor = setFillProperty(COAT_COLORS);
  var setEyesColor = setFillProperty(EYES_COLORS);
  var setFireballColor = setBackgroundProperty(FIREBALL_COLORS);

  wizardCoat.addEventListener('click', function () {
    setCoatColor(wizardCoat, wizardCoatInput);
  });

  wizardEyes.addEventListener('click', function () {
    setEyesColor(wizardEyes, wizardEyesInput);
  });

  fireballContainer.addEventListener('click', function () {
    setFireballColor(fireballContainer, fireballInput);
  });

})();
