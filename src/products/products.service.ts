import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from "fs";
const productDB = JSON.parse(readFileSync('./src/db/products.json').toString())
import {DaddProductReq, Dproduct, DproductReqObj, DstoreResponse} from "../dtos/product.dto"

@Injectable()
export class ProductsService {
    getProductsAllForStore(storename:string):DstoreResponse {
        const products =  productDB.products.sort(() => Math.random() - 0.5)
        .slice(0, 30)// sort array randomly and return 30 items
        const resObj = {storename, products}
        return resObj
    }

    addAndEditProduct({productData, store}:DaddProductReq):string{
        try {
            let productInDb = this.getProductByID({productID: productData.id, store})
            productInDb = {... productInDb, ...productData}
            const productindex = productDB.products.findIndex((id:number)=> id=== productInDb.id)
            productDB.products[productindex] = productInDb
            return 'OK'
        } catch (error) {
            if (error.message = 'Resource Not Found') {
                productDB.products.push(productData)
                productDB.total+=1
                console.log(productDB.products.length)
                return 'OK'
            }
        }
    }

    getProductByID({productID, store}:DproductReqObj){
        const [requestedProduct]:Dproduct[] =  productDB.products.filter(({id}:{id:number}) => id===productID)
        console.log(requestedProduct)
        if (requestedProduct) {
            return requestedProduct
        } else {
            throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND)
        }
    }
}
