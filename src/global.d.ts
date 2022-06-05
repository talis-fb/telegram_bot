declare global {
  type ID = string

  interface register {
    id: string
    description: string
  }

  interface trade extends register {
    value: number
    when: Date
  }

  // Compras
  interface purchase extends register {
    who: string
    where: string
    payments: ID
    categoria: 'a' | 'b'
  }

  // Contas
  interface bill extends register {
    name: string
    expiration: {
      day: number
      month: number
      year: number
    }
    payments: ID[]
    range?: Date
    open?: Boolean
    category: 'a' | 'b'
  }

  interface gain extends register {
    who: string
    origin: string
    category: string
    trade: ID
  }

  interface loan extends register {
    value: number
    payments: ID[]
    rest: number
  }
}
