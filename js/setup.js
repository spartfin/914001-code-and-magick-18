'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNT = 4;

  userDialog.classList.remove('hidden');

  var getRandom = function (min, max) {
    return Math.random() * (max - min) + min;
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

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  getSimilarWizards(generateWizards());

})();
