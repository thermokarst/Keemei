function validateHeader_(sheet, state, requiredHeaders) {
  var headerRange = getHeaderRange_(sheet);
  var headerLocations = getValueToPositionsMapping_(headerRange);

  markMissingValues_(headerRange, state, requiredHeaders, "columns");
  markDuplicates_(headerRange, state, "Duplicate column");

  // #SampleID is an invalid column header name, so we'll only check header names
  // if they aren't required headers. Assume the required header names are valid.
  //
  // TODO: improve reporting of invalid header names, include description
  markInvalidCells_(headerRange, state, /[a-z][a-z0-9_]*$/ig, Status.WARNING,
                    Status.ERROR, "column header name", null, requiredHeaders);

  // TODO: refactor this validator
  for (var header in headerLocations) {
    if (headerLocations.hasOwnProperty(header)) {
      var locations = headerLocations[header];

      if (requiredHeaders.hasOwnProperty(header)) {
        var requiredLocation = requiredHeaders[header];

        for (var i = 0; i < locations.length; i++) {
          var location = locations[i];

          if (location.column != requiredLocation[0]) {
            var message = "Misplaced column; must be the " + requiredLocation[1] + " column";
            updateState_(state, location, Status.ERROR, message);
          }
        }
      }
    }
  }
};
