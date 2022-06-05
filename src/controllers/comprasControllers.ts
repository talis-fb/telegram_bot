import { Spreadsheet } from '../model'
import { purchase, trade, newPurchase } from '../types'

const SpreadsheetSetup = (async () => Spreadsheet())()
let hasMadeSetup = false

// const sheet = await SpreadsheetSetup
// sheet.append('TarefasFechadas', {
//   valueInputOption: 'RAW',
//   requestBody: {
//     values: [['dentro deu']],
//   },
// })
// console.log(sheet)
//

const addCompra = async (id: string, newPurchase: newPurchase) => {
  const sheets = await SpreadsheetSetup

  sheets.append('Movimentacoes', {
    valueInputOption: 'RAW',
    requestBody: {
      values: [[newPurchase.id, newPurchase.value, newPurchase.when]],
    },
  })

  const compra: purchase = {}
  sheets.append('Compras', {
    valueInputOption: 'RAW',
    requestBody: {
      values: [
        [
          compra.id,
          compra.payments,
          compra.who,
          compra.where,
          compra.categoria,
          compra.description,
        ],
      ],
    },
  })
}
