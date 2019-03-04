// jquery.autoKana.js Library created by:
// Copyright (c) 2013 Keith Perhac @ DelfiNet (http://delfi-net.com)
//
// Based on the AutoRuby library created by:
// Copyright (c) 2005-2008 spinelz.org (http://script.spinelz.org/)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';
angular.module('autokana', [])
  .factory('AutokanaFac', function(){

    function autokanaSet(element1, element2, passedOptions) {

        var options = passedOptions || {};
        var kana_extraction_pattern = new RegExp('[^ 　ぁあ-んゔー・]', 'g');
        var kana_compacting_pattern = new RegExp('[ぁぃぅぇぉっゃゅょ]', 'g');
        var elName,
            elKana,
            active = false,
            timer = null,
            flagConvert = true,
            input,
            values,
            ignoreString,
            baseKana;
        var isLastN = false;

        elName = element1;
        elKana = element2;
        active = true;
        _stateClear();

        elName.bind('blur', _eventBlur);
        elName.bind('focus', _eventFocus);
        elName.bind('keydown', _eventKeyDown);

        function start() {
            active = true;
        };

        function stop() {
            active = false;
        };

        function toggle(event) {
            var ev = event || window.event;
            if (event) {
                var el = Event.element(event);
                if (el.checked) {
                    active = true;
                } else {
                    active = false;
                }
            } else {
                active = !active;
            }
        };

        function _checkConvert(new_values) {
            if (!flagConvert) {
                if (Math.abs(values.length - new_values.length) > 1) {
                    var tmp_values = new_values.join('').replace(kana_compacting_pattern, '').split('');
                    if (Math.abs(values.length - tmp_values.length) > 1) {
                        _stateConvert();
                    } else if (elName.val().match(/[nｎ]$/)) {
                        isLastN = true;
                    } else {
                        isLastN = false;
                    }
                } else {
                    if (values.length == input.length && values.join('') != input) {
                        if (input.match(kana_extraction_pattern)) {
                            _stateConvert();
                        }
                    } else if (elName.val().match(/[nｎ]$/)) {
                        isLastN = true;
                    } else {
                        isLastN = false;
                    }
                }
            }
        };

        function _checkValue() {
            var new_input, new_values;
            new_input = elName.val() || elName.text();
            if (new_input == '') {
                _stateClear();
                _setKana();
            } else {
                new_input = _removeString(new_input);
                if (input == new_input) {
                    return;
                } else {
                    input = new_input;
                    if (!flagConvert) {
                        new_values = new_input.replace(kana_extraction_pattern, '').split('');
                        _checkConvert(new_values);
                        _setKana(new_values);
                    }
                }
            }
        };

        function _clearInterval() {
            clearInterval(timer);
        };

        function _eventBlur(event) {
            _clearInterval();
        };
        function _eventFocus(event) {
            _stateInput();
            _setInterval();
        };
        function _eventKeyDown(event) {
            if (flagConvert) {
                _stateInput();
            }
        };
        function _isHiragana(chara) {
            return ((chara >= 12353 && chara <= 12435) || chara == 12445 || chara == 12446 || chara == 12436 /*ゔ*/);
        };
        function _removeString(new_input) {
            if (new_input.indexOf(ignoreString) !== -1) {
                return new_input.replace(ignoreString, '');
            } else {
                var i, ignoreArray, inputArray;
                ignoreArray = ignoreString.split('');
                inputArray = new_input.split('');
                for (i = 0; i < ignoreArray.length; i++) {
                    if (ignoreArray[i] == inputArray[i]) {
                        inputArray[i] = '';
                    }
                }
                return inputArray.join('');
            }
        };
        function _setInterval() {
            var self = this;
            timer = setInterval(_checkValue, 30);
        };
        function _setKana(new_values) {
            if (!flagConvert) {
                if (new_values) {
                    values = new_values;
                }
                if (active) {
                    var _val = _toKatakana(baseKana + values.join(''));
                    if (elKana.prop('tagName') === 'INPUT') {
                      elKana.val(_val);
                    } else {
                      elKana.text(_val);
                    }
                    elKana.triggerHandler('change');
                }
            }
        };
        function _stateClear() {
            baseKana = '';
            flagConvert = false;
            ignoreString = '';
            input = '';
            values = [];
        };
        function _stateInput() {
            baseKana = elKana.val() || elKana.text();
            flagConvert = false;
            ignoreString = elName.val() || elName.text();
        };
        function _stateConvert() {
            if (isLastN && elKana.val().length > 0) {
                var _val = elKana.val();
                var _new_val = _val.replace(/ヴ/g, 'ゔ');
                elKana.val(_new_val + 'ン');
            }
            isLastN = false;

            baseKana = baseKana + values.join('');
            flagConvert = true;
            values = [];
        };
        function _toKatakana(src) {
            if (options.katakana) {
                var c, i, str;
                str = new String;
                for (i = 0; i < src.length; i++) {
                    c = src.charCodeAt(i);
                    if (_isHiragana(c)) {
                        str += String.fromCharCode(c + 96);
                    } else {
                        str += src.charAt(i);
                    }
                }
                return str;
            } else {
                return src;
            }
        }
    };

    function AutokanaFac() {
      this.elems = {};
      this.options = {};
    }
    AutokanaFac.prototype.addInput = function(key, elem) {
      if (this.elems[key]) {
        autokanaSet(elem, this.elems[key], this.options[key]);
        delete this.elems[key];
        return;
      }
      this.elems[key] = elem;
    };
    AutokanaFac.prototype.addKana = function(key, elem, option) {
      if (this.elems[key]) {
        autokanaSet(this.elems[key], elem, option);
        delete this.elems[key];
        return;
      }
      this.elems[key] = elem;
      this.options[key] = option;
    };
    return new AutokanaFac();
  })
  .directive('autokanaInput', ['AutokanaFac', function(AutokanaFac) {
    return {
      restrict: 'A',
      scope:true,
      link: function(scope, elem, attrs) {
        AutokanaFac.addInput(String(attrs.autokanaInput), elem);
      }
    };
  }])
  .directive('autokanaKana', ['AutokanaFac', function(AutokanaFac) {
    return {
      restrict: 'A',
      scope:true,
      link: function(scope, elem, attrs) {
        var katakana = false;
        if ('undefined' !== typeof attrs.autokanaKatakana) {
          katakana = true;
        }
        AutokanaFac.addKana(String(attrs.autokanaKana), elem, {katakana:katakana});
      }
    };
  }]);
