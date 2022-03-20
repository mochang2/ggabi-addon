function sendAttachments(e) {
  const message = getCurrentMessage(e);
  const attachments = message.getAttachments();
  const formInputs = e.commonEventObject.formInputs;
  var fileNames = [];
  var files = [];

  if (formInputs !== undefined) {
    for (const v of formInputs["checkboxField"].stringInputs.value) {
      const attachment = attachments[parseInt(v.charAt(v.length - 1))];
      fileNames.push(attachment.getName());
      files.push(attachment);
    }

    const formData = {
      'userName': Session.getActiveUser().getEmail().split("@")[0],
      'mailId': e.gmail.messageId,
      'fileNames': fileNames,
      'files': files
    };
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(formData),
      'headers':{
        'charset': 'UTF-8'
      },
      'muteHttpExceptions': true
    };
    let response = UrlFetchApp.fetch("http://35.200.67.44:8080/api/analyze", options);
    response = JSON.parse(response.getContentText());

    if (response["error"] === undefined){
      return createOuterWrapperCard(message, e.gmail.messageId).build();
    }
    console.log("Error occurs");
    console.log(response["error"]);
  }
  else {
    console.log("Nothing is selected");
  }
}


function getAnalyzedData(messageId) {
  const formData = {
    'userName': Session.getActiveUser().getEmail().split("@")[0],
    'mailId': messageId,
  };
  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(formData),
    'muteHttpExceptions': true
  };

  return UrlFetchApp.fetch("http://35.200.67.44:8080/api/analyzed", options);
}
