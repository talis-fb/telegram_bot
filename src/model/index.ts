import {google} from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
// import axios from 'axios'
require('dotenv').config()


const auth = new GoogleAuth({
    keyFile: '../../credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

async function append_to_sheet(table, values){
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;//this is unique id of google sheet

    const client = await auth.getClient()
    const sheet = google.sheets({version:"v4", auth: client})

    const outro_responde = (await sheet.spreadsheets.values.append({
        spreadsheetId,
        range: table,
        valueInputOption: 'RAW',
        resource: { values }
    }, (err,data) => {
        console.log(err ? 'erro' : 'append....')
        console.log(err || data)
    }))//.data
}
// append_to_sheet([ ['ola mundoooooooooo'] ])
