

function register(userinfo) {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iEJvVtHib_9yqWsfye0x7zAZqtaM4yGF-Io2r1QwuYA/edit?gid=0#gid=0")
  var ws = ss.getSheetByName("users");

  ws.appendRow([userinfo.username, userinfo.password]);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}


function modifyImageLinks() {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iEJvVtHib_9yqWsfye0x7zAZqtaM4yGF-Io2r1QwuYA/edit?usp=sharing");
  var ws = ss.getSheetByName("employee");
  var data = ws.getRange("A2:A" + ws.getLastRow()).getValues(); // Assuming the image links are in column A

  for (var i = 0; i < data.length; i++) {
    var link = data[i][0];
    if (link && link.startsWith("https://drive.google.com/file/d/")) {
      var exportViewLink = modifyToExportView(link);
      if (exportViewLink) {
        ws.getRange(i + 2, 1).setValue(exportViewLink); // Column 1 corresponds to column A
      } else {
        Logger.log('Failed to modify link: ' + link);
      }
    } else {
      Logger.log('Skipped non-URL entry: ' + link);
    }
  }
}


//Modify interviewers_details PDF file format
function modifyResumeLinks() {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iEJvVtHib_9yqWsfye0x7zAZqtaM4yGF-Io2r1QwuYA/edit?usp=sharing");
  var ws = ss.getSheetByName("interviewers_details");
  var data = ws.getRange("H2:H" + ws.getLastRow()).getValues(); // Assuming the Resume links are in column H

  for (var i = 0; i < data.length; i++) {
    var link = data[i][0];
    if (link && link.startsWith("https://drive.google.com/file/d/")) {
      var exportViewLink = modifyToExportView(link);
      if (exportViewLink) {
        ws.getRange(i + 2, 8).setValue(exportViewLink); // Column 8 corresponds to column H
      } else {
        Logger.log('Failed to modify link: ' + link);
      }
    } else {
      Logger.log('Skipped non-URL entry: ' + link);
    }
  }
}

//Modify any google drive links to Export View
function modifyToExportView(link) {
  var fileId = "";
  var regex = /\/d\/(.*?)\/view/;
  var matches = link.match(regex);
  if (matches && matches[1]) {
    fileId = matches[1];
    return "https://drive.google.com/uc?export=view&id=" + fileId;
  } else {
    Logger.log('No match found for link: ' + link);
    return null;
  }
}


