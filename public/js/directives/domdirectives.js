'use strict';
var domutils = angular.module('sharptung.domutils');
//translate clicked directive
domutils.directive('translateClick', function() {
  console.log('in translateclick');
  return function(scope, elem, attrs) {
    elem.bind('click', function () {
      var text = angular.element(document.querySelector('#translate')).val();
      var lang = angular.element(document.querySelector('#language_list')).val();
      scope.translate({
        text: text,
        lang: lang
      });
    });
  };
});
//populate language options
domutils.directive('populateLangOpts', function() {
  console.log('in populateLangOpts');
  var languages = [
    ["Afrikaans", "af"],
    ["Albanian", "sq"],
    ["Arabic", "ar"],
    ["Armenian", "hy"],
    ["Azerbijani", "az"],
    ["Basque", "eu"],
    ["Belarusian", "be"],
    ["Bengali", "bn"],
    ["Bosnian", "bs"],
    ["Bulgarian", "bg"],
    ["Catalan", "ca"],
    ["Cebuano", "ceb"],
    ["Chinese(simp)", "zh-CN"],
    ["Chinese(trad)", "zh-TW"],
    ["Croatian", "hr"],
    ["Czech", "cs"],
    ["Danish", "da"],
    ["Dutch", "nl"],
    ["English", "en"],
    ["Esperanto", "eo"],
    ["Estonian", "et"],
    ["Filipino", "tl"],
    ["Finnish", "fi"],
    ["French", "fr"],
    ["Galician", "gl"],
    ["Georgian", "ka"],
    ["German", "de"],
    ["Greek", "el"],
    ["Gujarti", "gu"],
    ["Haitian_Creole", "ht"],
    ["Hausa", "ha"],
    ["Hebrew", "iw"],
    ["Hindi", "hi"],
    ["Hmong", "hmn"],
    ["Hungarian", "hu"],
    ["Icelandic", "is"],
    ["Igbo", "ig"],
    ["Indonesian", "id"],
    ["Irish", "ga"],
    ["Italian", "it"],
    ["Japanese", "ja"],
    ["Javanese", "jw"],
    ["Kannada", "kn"],
    ["Khmer", "km"],
    ["Korean", "ko"],
    ["Lao", "lo"],
    ["Latin", "la"],
    ["Latvian", "lv"],
    ["Lithuanian", "lt"],
    ["Macedonian", "mk"],
    ["Malay", "ms"],
    ["Maltese", "mt"],
    ["Maori", "mi"],
    ["Marathi", "mr"],
    ["Mongolian", "mn"],
    ["Nepali", "ne"],
    ["Norwegian", "no"],
    ["Persian", "fa"],
    ["Polish", "pl"],
    ["Portugese", "pt"],
    ["Punjabi", "pa"],
    ["Romanian", "ro"],
    ["Russian", "ru"],
    ["Serbian", "sr"],
    ["Slovak", "sk"],
    ["Slovenian", "sl"],
    ["Somali", "so"],
    ["Spanish", "es"],
    ["Swahili", "sw"],
    ["Sweedish", "sv"],
    ["Tamil", "ta"],
    ["Telugu", "te"],
    ["Thai", "th"],
    ["Turkish", "tr"],
    ["Ukrainian", "uk"],
    ["Urdu", "ur"],
    ["Vietnamese", "vi"],
    ["Welsh", "cy"],
    ["Yiddish", "yi"],
    ["Yoruba", "yo"],
    ["Zulu", "zu"]
  ];
  
  return {
    template: "<option data-ng-repeat='lang in lang_options' value='{{lang[1]}}'>"
            + "{{lang[0]}}"
            + "</option>",
    link: function(scope, elem, attrs) {
      scope.lang_options = languages;
    }
  };
});