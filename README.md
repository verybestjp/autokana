angular-autokana
========

AngularJS Plugin for automatically rendering Furigana for inputed Japanese Text.

日本語入力に対するフリガナを自動的に別フィールドに記入するAngularJSプラグイン

Requires
-------------------------------------------------

* AngularJS

Description
-------------------------------------------------

Attaches a keydown listener to the input element, and transfers the inputted kana characters to another input element.
This allows Japanese users to automatically input the furigana for their name without needing to input data twice. Because the furigana box is filled out in real time, corrections can be made by the user afterwards.

Originally created by harisenbon jquery.autokana.js: https://github.com/harisenbon/autokana

input要素にキーダウンリスナーをバインドして、入力された文字をフリガナとしてもう一つのinput要素に自動的に入力する。

jQuery用のautokanaをAngularJSプラグインに変換しました。jQuery用は以下を参照してください：
https://github.com/harisenbon/autokana

Usage
-------------------------------------------------

* Pass the each autokana-input and autokana-kana attribute to to text input tag:
  * ``<input type="text" autokana-input>`` : for KANJI input tag
  * ``<input type="text" autokana-kana>`` : for HIRAGANA input tag

* Optionally, pass the autokana-katakana attribute to HIRAGANA input tag automatically convert the furigana to full-width katakana
  * ``<input type="text" autokana-kana autokana-katakana>``

* autokana-inputとautokana-kana属性をtext inputタグに設定します。
  * ``<input type="text" autokana-input>`` : for 漢字 input tag
  * ``<input type="text" autokana-kana>`` : for ひらがな input tag
* autokana-katakana属性をひらがなinput tagに設定した場合、カタカナに変換されます。
  * ``<input type="text" autokana-kana autokana-katakana>``

Issues
-------------------------------------------------

* Kana will be removed from the furigana field if deleted from the original input field, but kanji that are deleted from the input field will not be reflected in the furigana field
* For obvious reasons, getting the Furigana of copy/pasted text is not supported
* English characters are not currently supported

* 入力欄から文字を削除した場合、カナはフリガナのフィールドからも削除されますが、入力された文字が漢字だった場合は、文字を削除しても、この通りに反映されない
* keydownを利用しているので、コピペされたテキストは非対応
* ローマ字は非対応
