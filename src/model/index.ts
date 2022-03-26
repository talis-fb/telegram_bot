import {google} from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
// import { sheets } from 'googleapis/build/src/apis/sheets';
// import axios from 'axios'
require('dotenv').config()

const auth = new GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const Spreadsheet = async () => {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;//this is unique id of google sheet
    const client = await auth.getClient()
    const sheet = google.sheets({version:"v4", auth: client})
    const model = sheet.spreadsheets.values

    interface paramsWrite {
        range: string,
        valueInputOption: 'INPUT_VALUE_OPTION_UNSPECIFIED' | 'RAW' | 'USER_ENTERED'
        resource: any
    }
    interface paramsRead {
        range: string,
        majorDimension: 'DIMENSION_UNSPECIFIED' | 'ROWS' | 'COLUMNS'
    }

    return {
        values: {
            get: (props:paramsRead) => model.get({ spreadsheetId, ...props }),
            update: (props:paramsWrite) => model.update({ spreadsheetId, ...props }),
            append: (props:paramsWrite) => model.append({ spreadsheetId, ...props })
        }
    }
}

export { Spreadsheet }
