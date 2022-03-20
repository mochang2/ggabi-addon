function buildHomepage() {
  const card = CardService.newCardBuilder();

  const section = CardService.newCardSection()
    .addWidget(CardService.newDivider())
    .addWidget(CardService.newImage()
      .setOnClickAction(
        CardService.newAction()
        .setFunctionName(
          "openGGabiWebService")
        )
      .setImageUrl("http://www.ggabi.co.kr/Logo_Calligraphy.png")
      .setAltText("깨비 메일 이미지"))
    .addWidget(CardService.newDivider())

    .addWidget(CardService.newTextParagraph()  // body section
      .setText("<b>GGabi add-on</b>은 사용자 gmail에 있는 첨부파일에 대해서 분석합니다."))
    .addWidget(CardService.newTextParagraph()
      .setText("분석을 원하시면 첨부파일이 있다면 체크박스에 선택 후, <font color='#ea9999'><i>제출하기</i></font> 버튼을 누르시면 됩니다."))
    .addWidget(CardService.newTextParagraph()
      .setText("분석 결과로 나오는 확률은 해당 첨부파일이 악성일 확률을 나타냅니다."))
    .addWidget(CardService.newTextParagraph()
      .setText("자세한 사용법을 알고 싶으신 분은 아래 링크로 이동하여 사용법을 확인하실 수 있습니다.<br><br><a href='https://cuddly-answer-9f4.notion.site/95c9a3884fb94c4b8e466a87e6778e16'>GGabi description</a>"));


  card.addSection(section);

  return [card.build()];
}


function openGGabiWebService() {
  return CardService.newActionResponseBuilder()
    .setOpenLink(CardService.newOpenLink()
      .setUrl("https://www.ggabi.co.kr")
      .setOpenAs(CardService.OpenAs.FULL_SIZE)
      .setOnClose(CardService.OnClose.NOTHING))
        .build();
}
