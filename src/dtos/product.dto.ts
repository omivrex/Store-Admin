export class Dproduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export class DStoreResponse {
  storename: string
  products: Dproduct[]
}

export class DproductReqObj {
  productID:number
  store:string
}