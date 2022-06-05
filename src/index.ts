import { Telegraf, Markup } from 'telegraf'
import axios from 'axios'

import * as dotenv from 'dotenv'
dotenv.config()

import http from 'http'

//types
import  from './types'


// -- BOT
const bot = new Telegraf(process.env.BOT_TOKEN || '')

let last_compra:loan = {  }
const CATEGORIAS_COMPRA: Array<categoria> = ['📚 Livro']

async function APPEND_GOOGLE(body: compra) {
  const retorno = { err: null }
  const URL_GOOGLE_SHEET = process.env.GOOGLE_SHEETS_URL || ''

  try {
    const request = await axios.post(URL_GOOGLE_SHEET, body)

    if (request.status == 200) {
      console.log(`Compra no valor de ${body.value} Feita com sucesso`)
    }
    return retorno
  } catch (err: any) {
    retorno.err = err
    return retorno
  }
}

bot.start(ctx => {
  ctx.reply(
    'Bem-vindo ao Tio Patinhas Curioso, aqui você coloca as suas compras :)'
  )
})

bot.command('teste', ctx => console.log('teste'))

// bot.hears(/a$/, (ctx, next) => {
// }).on('text', () => {}).on

// bot.command('custom', ({ reply }) => {
//     return reply('Custom buttons keyboard', {
//         Markup.keyboard([
//             ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//             ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//             ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
//         ]).oneTime().resize().extra()
//     })
// })
//

// Se for uma mensagem que terminar com 'opa'
bot.hears(/opa$/, (ctx, next) => {
  ctx.reply('Olha o opa, valeu :)')

  ctx.replyWithHTML(
    ` <b>Olá mundo</b> <code>print(ola mundo)</code>`,
    // Markup.inlineKeyboard([Markup.callbackButton('Coke', 'Coke')])
    Markup.keyboard(['Um', 'duas', 'antes do quatro'])
  )

  ctx.replyWithHTML(
    ` <b>Olá mundo</b> <code>print(ola mundo)</code>`
    // Markup.([{ text: 'dsad' }])
  )

  return next()

  // Pools
  ctx.replyWithPoll('Uma pergunta', ['pergunta 1', 'pergunta 2'])
  ctx.telegram.sendPoll(
    ctx.chat.id,
    'Eae meu bom?',
    ['Eae, qual a braba?', 'sei la']
    // { correct_option_id: 0 } // ['Tudo de bia', 'mais ou  menois']
  )
  next()
})

bot.help(async ctx => {
  ctx.reply(
    'Para registrar uma compra basta enviar o valor da sua compra, logo em seguida será solicitado a categoria dela, clicando basta esperar o Ok que ocorreu tudo certo 😄'
  )
  bot.on('text', async () => {
    console.log('Pega porra')
    // const sheet = await SpreadsheetSetup
    // sheet.append('TarefasFechadas', {
    //   valueInputOption: 'RAW',
    //   requestBody: {
    //     values: [['dentro deu']],
    //   },
    // })
    // console.log(sheet)
    console.log('FOiiiiiiii')
  })
})

bot.command('categorias', ctx => {
  CATEGORIAS_COMPRA.forEach((el, ind) => {
    ctx.reply(`${ind}) ${el}`)
  })
})

bot.on('text', async ctx => {
  const message = ctx.message.text

  const category = CATEGORIAS_COMPRA.filter(i => i === message)[0]

  if (category) {
    if (!last_compra.value) {
      ctx.reply(
        '🟠 Digite o valor da sua compra, e SÓ então clique na categoria'
      )
      ctx.reply('▶ Para mais informações mande /help')
      return
    }

    const response = await APPEND_GOOGLE({ ...last_compra, category })
    last_compra = {}

    if (response.err) {
      ctx.reply('❌  Tivemos um erro ao registrar a compra🙁  ❌')
      ctx.reply(response.err)
    } else {
      ctx.reply('✅')
    }

    return
  }

  // Se a mensagem nao começar com numero
  if (!message.match(/^\d/)) {
    ctx.reply('🟠 Começe a mensagem com o valor da compra...')
    ctx.reply('▶ Para mais informações mande /help')
    return
  }

  const value = ctx.message.text
  const who = ctx.from.first_name
  const time = new Date(ctx.message.date * 1000)
  last_compra.value = value
  last_compra.who = who
  last_compra.time = time

  ctx.replyWithHTML(
    `
   Compra:
    \t💰 Valor: ${value}
    \t🕐 Hora:  ${
      time.getHours() +
      ':' +
      time.getMinutes() +
      ' ' +
      time.getDay() +
      '/' +
      time.getMonth() +
      '/' +
      time.getFullYear()
    }
    \t🤳 Quem:  ${who}
    Marque agora a CATEGORIA a qual você comprou para terminarmos de registrar...
  `,
    {
      reply_markup: {
        keyboard: [...CATEGORIAS_COMPRA.map(c => [c])],
      },
    }
  )
})

bot.launch()

// SERVER to output
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-type', 'application/json')
  res.write(JSON.stringify({ 'Aqui habita': 'Um bot do telegram' }))
  res.end()
})

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})
