'use strict';
angular.module('sharptung.system').directive('populateLangOpts', function() {
  console.log('asfsafsa');
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
    scope: {lang_options: languages}
    /*link: function(scope, elem, attrs) {
      scope.lang_options = languages;
      for(var i = 0; i <languages.length; i++) {
        cur_str += "<option value='"+ languages[i][1]+"'>" + languages[i][0] + "</option>";
      }
      elem.html(cur_str);
    }*/
  };
});