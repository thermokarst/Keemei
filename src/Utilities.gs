function isSheetEmpty_(sheet) {
  return sheet.getLastRow() == 0 && sheet.getLastColumn() == 0;
};

// modified from http://stackoverflow.com/a/4579228/3776794
function startsWith_(str, substr) {
  return str.lastIndexOf(substr, 0) === 0;
};

// modified from http://stackoverflow.com/a/8241071/3776794
function getA1Notation_(position) {
  var column = position.column - 1;

  var ordA = "A".charCodeAt(0);
  var ordZ = "Z".charCodeAt(0);
  var len = ordZ - ordA + 1;

  var a1 = "";
  while (column >= 0) {
    a1 = String.fromCharCode(column % len + ordA) + a1;
    column = Math.floor(column / len) - 1;
  }

  return Utilities.formatString("%s%d", a1, position.row);
};
