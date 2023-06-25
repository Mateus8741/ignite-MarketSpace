type Image = {
  id: string
  path: string
}

type Method = {
  key: string
  name: string
}

type Product = {
  id: string
  name: string
  price: number
  images: Image[]
  methods: Method[]
  description: string
  acceptTrade: boolean
  isActive: boolean
  isNew: boolean
}

type User = {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  createdAt: string
  updatedAt: string
}
