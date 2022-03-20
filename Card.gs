function createOuterWrapperCard(message, messageId) {
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader()
    .setTitle("'" + message.getSubject() + "'의 첨부파일 목록")
    .setImageUrl("http://www.ggabi.co.kr/HMattachment_icon.png"));


  const attachments = message.getAttachments();
  let resultDto = JSON.parse(getAnalyzedData(messageId).getContentText())["analyzedResult"];
  if (resultDto === null) {
    resultDto = [];
  }

  for (const i in attachments) {
    const fileName = attachments[i].getName();
    const fileSize = attachments[i].getSize();
    let fileResult = "";
    
    for (const result of resultDto) {
      if (fileName == result[fileName]) {
        if (result[malicious] >= 0 && result <= 1) {
          fileResult = `악성확률: ${result[malicious]}%`;
        }
        else {
          fileResult = "분석이 불가능한 파일입니다.";
        }
      }
    }
    if (fileResult === "") {
      fileResult = "미분석된 파일입니다."
    }

    card.addSection(CardService.newCardSection()  
      .addWidget(CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.CHECK_BOX)
        .setFieldName("checkboxField")
        .addItem(`${fileName} (${byteFormatter(fileSize)})`, "checkbox" + i, false)
        .setTitle(fileResult)
      )
    );
  }

  card.addSection(CardService.newCardSection()
    .addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText("<font color='#000000'>분석하기</font>")
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setBackgroundColor("#FCE8E6")
        .setOnClickAction(CardService.newAction()
          .setFunctionName("sendAttachments")
        )
      )
    )
  );

  const peekHeader = CardService.newCardHeader()
    .setTitle("첨부파일 분석을 진행하시겠습니까?")
    .setImageUrl("http://www.ggabi.co.kr/alphabetic_logo.png");
  card.setDisplayStyle(CardService.DisplayStyle.REPLACE)
    .setPeekCardHeader(peekHeader)

  return card;
}

















