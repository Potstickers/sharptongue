'use strict';
angular.module('sharptung.system').directive('translateclick', function() {
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
//populate select box with lang options directive
angular.module('sharptung.system').directive('populateLangOpts', function() {
  
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
    link: function(scope, elem, attrs) {
      var cur_str = "";
      for(var i = 0; i <languages.length; i++) {
        cur_str += "<option value='"+ languages[i][1]+"'>" + languages[i][0] + "</option>";
      }
      elem.html(cur_str);
    }
  };
});
//flashcard directive
angular.module('sharptung.system').directive('flashcards', function(){
  //view this singleton that tracks flashcards state
  //eg: current card, prev card, next card, flipped, un flipped, etc.
  return {
    templateUrl: 'ng flavored markup template',//path to templateUrl for flashcards. the parent container should have this directive in attr.
    link: function(scope, elem, attrs) {
      //things in this area
      //vars for tracking state, initialize state
      var cur_idx = 0;
      var next_idx = 1;
      var prev_idx = 999; //init in initailization function elsewhere
      
      //elem will be the container for the returned html; ng will plug it.
      //some accessory functions for keeping track of state and attached to cards, next(), prev()
      //change scope values to reflect in template
      //maybe something like:
      /* the scope object
        {
          entries: [the words],
          imgs: [the img urls],
          translateUrl: [bunch of preconstructed google api calls for each card]
          
        }
      */
    }
  };
});