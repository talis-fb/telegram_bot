export type categoria =
  "🛒 Mercado" | "😋 Comida" | "👔 Vestuario" | "✨ Lazer" | "🏠 Casa" | "🩸 Saude" |
  "💔 Besteira" | "💻 Eletrônicos" | "📚 Livro" | "💸 Emprestimos" | "🚌 Transporte";

export const CATEGORIAS_COMPRA:Array<categoria> =[
  "🛒 Mercado", "😋 Comida", "👔 Vestuario", "✨ Lazer", "🏠 Casa", "🩸 Saude",
"💔 Besteira", "💻 Eletrônicos", "📚 Livro", "💸 Emprestimos", "🚌 Transporte"
]

export interface pagamento {

}
export interface compra {
  who?: string
  value?: string | number
  time?: Date
  category?: categoria
}



// export interface pagamento {
//   id: number,
//   value: number,
//   when: Date,
//   description?: string,
//   type?: string
// }

// export interface compra {
//   id: number,
//   who: string,
//   where: string,
//   category: categoria,
//   pagamento: pagamento,
//   description?: string,
//   type?: string
// }

// export interface conta {
//   id: string,
//   name: string,
//   vencimento: Date,
//   tipo?: 'mensal' | 'diario' | 'anual',
//   pagementos: pagamento[],
//   description?: string,
//   type?: string
// }
