function getCurrentMessage(event) {
  const accessToken = event.messageMetadata.accessToken;
  const messageId = event.messageMetadata.messageId;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  return GmailApp.getMessageById(messageId);
}


function byteFormatter(byte) {
  if (byte < 1024) return byte + "Byte";
  else if (byte < 1024 * 1024) return (byte / 1024).toFixed(1) + "KB";
  else if (byte < 1024 * 1024 * 1024) return (byte / (1024 * 1024)).toFixed(1) + "MB";
  else return (byte / (1024 * 1024 * 1024)).toFixed(1) + "GB";
}
