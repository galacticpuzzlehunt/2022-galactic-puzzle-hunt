var d = {};
var row_map = null;
var $dict = null;

function normalize(word) {
    return word.toLowerCase();
}

var main_function = function () {
   // Read dictionary contents into a script-accessible format `d`.
    for (const wd in default_translations) {
        d[wd] = default_translations[wd];
    }
    fill_dictionary();
};

$(document).ready(main_function);

function dict_row(wepp) {
    var tr = $("<tr>");
    tr.append($("<td class='dict-word'>").text(wepp));
    tr.append($("<td class='dict-translation'>").text(d[wepp] || ""));
    return tr;
}

// Idempotent
function fill_dictionary() {
    $dict = $("#dictionary");
    $dict.find("tr:gt(0)").remove();
    let words = {};
    for (let wd in d)
        words[wd] = d[wd];

    let words_array = Object.keys(words);
    words_array.sort();
    var tbody = $("tbody", $dict);
    for (var i = 0; i < words_array.length; ++i) {
        tbody.append(dict_row(words_array[i]));
    }

    // Uses fuse.js
    var table_rows = $("tbody > tr", $dict).map(function (i, v) {
        var $td = $('td', this);
        return {
            'puflantu': $td.eq(0).text(),
            'english': $td.eq(1).text(),
            'row': this
        };
    }).get();
    row_map = {};
    for (var i = 0; i < table_rows.length; i++)
        row_map[table_rows[i]['puflantu']] = table_rows[i]['row'];
    var options = {
        keys: [
            {name: 'puflantu', weight: 0.6},
            {name: 'english', weight: 0.4}],
        id: 'puflantu',
        threshold: 0.4,
    };
    dictionary = new Fuse(table_rows, options);

    $(".fuzzy-search", $dict).keyup(function () {
        $("tbody > tr", $dict).remove();
        var searchQuery = $(this).val();
        var tds;
        if (searchQuery.match(/^\s*$/)) {
            // Search query is whitespace only. Instead of querying Fuse (which
            // returns all rows that match that whitespace string i.e.
            // untranslated Puflantu), just show all rows
            tds = Object.values(row_map);
        } else {
            var matchedRows = dictionary.search(searchQuery);
            tds = matchedRows.map(function (w) {return row_map[w];});
        }
        $("tbody:last-child", $dict).append(tds);
    });
}



// Idempotent
function translate_words(div) {
    $('.translateable', div || document.body).each(function (i) {
        var word = $(this).attr('data-word');
        var norm_word = normalize(word);
        var translation = d[norm_word] || "";
        var pretty_translation = translation;
        if (word == word.toUpperCase())
            pretty_translation = translation.toUpperCase();
        else if (
                (word.toLowerCase() != word) &&
                (word.toLowerCase() == word.charAt(0).toLowerCase() + word.slice(1))
        )
            pretty_translation = translation.charAt(0).toUpperCase() + translation.slice(1);
        $('.translation', this).text(pretty_translation);
        $('.translation-input', this).attr('value', translation);
    });
}

function update_dictionary_entry(word, translation) {
    d[word] = translation;

    if ($dict && row_map) {
        var visible_row = $('tbody > tr', $dict).filter(function () {
            return $('.dict-word', this).text() == word;
        });
        if (visible_row.length > 0)
            $('.dict-translation', visible_row.eq(0)).text(translation);
        if (word in row_map) {
            var row = row_map[word];
            $('.dict-translation', row).text(translation);
            row_map[word] = row;
            // Don't bother adding the new translation to the search function
        }
    }
}

const RELATED_WORDS_COUNT = 3
function get_related_words(target_word) {
    // Ignore casing
    var target_word = normalize(target_word);
    var all_words = Object.keys(d);

    var scores = {};
    for (var i = 0; i < all_words.length; i++) {
        if (all_words[i] == target_word) {
            continue;
        }
        var score = 1.0 - levenshtein_distance(all_words[i], target_word) / target_word.length - 0.2;

        // Negative scores are not worth showing
        if (score >= 0) {
            scores[all_words[i]] = score;
        }
    }

    all_words = Object.keys(scores);
    // Sort highest scores first
    all_words.sort(function (a, b) {
        var sa = scores[a], sb = scores[b];
        if (sa < sb) return 1;
        if (sa > sb) return -1;
        return 0;
    });

    var result = [];
    if (default_translations[target_word] && default_translations[target_word] != d[target_word]) {
        result.push([target_word, default_translations[target_word]]);
    }
    Array.prototype.push.apply(
        result,
        all_words.slice(0, RELATED_WORDS_COUNT - result.length).map(wd => [wd, d[wd]]));
    return result;
}


/* ============ EXTERNAL CODE COPIED HERE FOR CONVENIENCE ==============
 *
 * Copyright (c) 2011 Andrei Mackenzie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Compute the edit distance between the two given strings
function levenshtein_distance(a, b){
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1.5, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};
