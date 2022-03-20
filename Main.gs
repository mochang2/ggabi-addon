function main(e) {
  const message = getCurrentMessage(e);
  const card = createOuterWrapperCard(message, e.gmail.messageId);
  return [card.build()];
}