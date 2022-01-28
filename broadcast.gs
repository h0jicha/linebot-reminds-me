const CHANNEL_ACCESS_TOKEN = ScriptProperties.getProperty('LINE_TOKEN')
const SHEET_MESSAGES = ScriptProperties.getProperty('SHEET_MESSAGES')

const ss = SpreadsheetApp.getActiveSpreadsheet()
const sheet = ss.getSheetByName(SHEET_MESSAGES)

function loadMessage() {
  //  let row = Math.floor(Math.random() * sheet.getLastRow()) + 1
  let row = 1
  let unit = sheet.getRange(row, 1).getValue().toString()
  let message = ""

  let rand = Math.random() * 200
  for (let i = 0; i < rand; i++) {
    message = message.concat(unit)
  }

  return message
}

function broadcast() {
  let text = loadMessage()
  console.log(text)
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/broadcast', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      messages: [
        {
            type: 'text',
            text: text
        },
      ]
    }),
  });
}
