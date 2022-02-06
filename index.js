const { Telegraf } = require("telegraf");
const axios = require("axios");
require("dotenv").config();

const http = require("http");

// -- BOT
const bot = new Telegraf(process.env.BOT_TOKEN);

const CATEGORIAS_COMPRA = [
  "🛒 Mercado",
  "😋 Comida",
  "👔 Vestuario",
  "✨ Lazer",
  "🏠 Casa",
  "🩸 Saude",
  "💔 Besteira",
  "💻 Eletrônicos",
  "📚 Livro",
  "💸 Emprestimos",
];

let last_compra = {};

async function APPEND_GOOGLE(body) {
  const retorno = { err: null };

  try {
    const request = await axios.post(process.env.GOOGLE_SHEETS_URL, body);

    if (request.status == 200) {
      console.log(`Compra no valor de ${body.value} Feita com sucesso`);
    }
    return retorno;
  } catch (err) {
    retorno.err = err;
    return retorno;
  }
}

bot.start((ctx) => {
  ctx.reply("Bem-vindo ao");
});

bot.help((ctx) => {
  ctx.reply(
    "Para registrar uma compra basta enviar o valor da sua compra, logo em seguida será solicitado a categoria dela, clicando basta esperar o Ok que ocorreu tudo certo 😄"
  );
});

bot.command("categorias", (ctx) => {
  CATEGORIAS_COMPRA.forEach((el, ind) => {
    ctx.reply(`${ind}) ${el}`);
  });
});

bot.on("text", async (ctx) => {
  const message = ctx.message.text;

  const category = CATEGORIAS_COMPRA.filter((i) => i === message)[0];

  if (category) {
    if (!last_compra.value) {
      ctx.reply(
        "🟠 Digite o valor da sua compra, e SÓ então clique na categoria"
      );
      ctx.reply("▶ Para mais informações mande /help");
      return;
    }

    const response = await APPEND_GOOGLE({ ...last_compra, category });
    last_compra = {};

    if (response.err) {
      ctx.reply("❌  Tivemos um erro ao registrar a compra🙁  ❌");
      ctx.reply(response.err);
    } else {
      ctx.reply("✅");
    }

    return;
  }

  // Se a mensagem nao começar com numero
  if (!message.match(/^\d/)) {
    ctx.reply("🟠 Começe a mensagem com o valor da compra...");
    ctx.reply("▶ Para mais informações mande /help");
    return;
  }

  const value = ctx.message.text;
  const who = ctx.from.first_name;
  const time = new Date(ctx.message.date * 1000);
  last_compra.value = value;
  last_compra.who = who;
  last_compra.time = time;

  ctx.replyWithHTML(
    `
   Compra:
    \t💰 Valor: ${value}
    \t🕐 Hora:  ${
      time.getHours() +
      ":" +
      time.getMinutes() +
      " " +
      time.getDay() +
      "/" +
      time.getMonth() +
      "/" +
      time.getFullYear()
    }
    \t🤳 Quem:  ${who}
    Marque agora a CATEGORIA a qual você comprou para terminarmos de registrar...
  `,
    {
      reply_markup: {
        keyboard: [...CATEGORIAS_COMPRA.map((c) => [c])],
      },
    }
  );
});

bot.launch();

// SERVER to output
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.write(JSON.stringify({ "Aqui habita": "Um bot do telegram" }));
  res.end();
});

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
