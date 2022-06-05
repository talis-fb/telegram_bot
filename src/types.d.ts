type ID = string

interface register {
  id: string
  description: string
}

export interface trade extends register {
  value: number
  when: Date
}

// Compras
export interface purchase extends register {
  who: string
  where?: string
  payments: ID
  categoria: 'a' | 'b'
}

// novas compras
export interface newPurchase {
  who: string
  where?: string
  when: Date
  categoria: 'a' | 'b'
  value: number
  description?: string
}

// Contas
export interface bill extends register {
  name: string
  expiration?: {
    day: number
    month: number
    year: number
  }
  payments: ID[]
  range?: Date
  open?: Boolean
  category: 'a' | 'b'
}

export interface gain extends register {
  who: string
  origin: string
  category: string
  trade: ID
}

export interface loan extends register {
  value: number
  payments: ID[]
  rest?: number
}
