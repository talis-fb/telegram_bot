import { google, sheets_v4 } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
require('dotenv').config()

const auth = new GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const Spreadsheet = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID //this is unique id of google sheet
  const client = await auth.getClient()
  const sheet = google.sheets({ version: 'v4', auth: client })
  const model = sheet.spreadsheets.values

  return {
    get: (
      range: string,
      optins: sheets_v4.Params$Resource$Spreadsheets$Values$Get
    ) => model.get({ spreadsheetId, range, ...optins }),
    update: (
      range: string,
      optins: sheets_v4.Params$Resource$Spreadsheets$Values$Update
    ) => model.update({ spreadsheetId, range, ...optins }),
    append: (
      range: string,
      optins: sheets_v4.Params$Resource$Spreadsheets$Values$Append
    ) => model.append({ spreadsheetId, range, ...optins }),
  }
}

export { Spreadsheet }
