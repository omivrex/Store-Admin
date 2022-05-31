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

export class DstoreResponse {
  storename: string
  products: Dproduct[]
}

export class DaddProductReq {
  store: string
  productData: Dproduct
}

export class DproductReqObj {
  productID:number
  store:string
}