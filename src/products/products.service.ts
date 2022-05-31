import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from "fs";
const productDB = JSON.parse(readFileSync('./src/db/products.json').toString())
import {Dproduct, DproductReqObj, DStoreResponse} from "../dtos/product.dto"

@Injectable()
export class ProductsService {
    getProductsAllForStore(storename:string):DStoreResponse {
        const products =  productDB.products.sort(() => Math.random() - 0.5)
        .slice(0, 30)// sort array randomly and return 25 items
        const resObj = {storename, products}
        return resObj
    }

    addProduct(productData:Dproduct):string{
        productDB.products.push(productData)
        productDB.total+=1
        console.log(productDB.products.length)
        return 'OK'
    }

    getProductByID({productID, store}:DproductReqObj){
        console.log('getProductByID', typeof productID, store)
        const [requestedProduct]:Dproduct[] =  productDB.products.filter(({id}:{id:number}) => id===productID)
        console.log(requestedProduct)
        if (requestedProduct) {
            return requestedProduct
        } else {
            throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND)
        }
    }
}
