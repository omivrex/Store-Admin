import { HttpException, HttpStatus, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync, writeFileSync } from "fs";
import Product from 'src/typeorm/product.entity';
import { Repository } from 'typeorm';
const productDB = JSON.parse(readFileSync('./src/db/products.json').toString())
import {DaddProductReq, Dproduct, DproductReqObj, DstoreResponse} from "../dtos/product.dto"

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
      ) {}
          
    @UsePipes(ValidationPipe)
    getProductsAllForStore(storename:string):DstoreResponse {
        const products =  productDB.products.sort(() => Math.random() - 0.5)
        .slice(0, 30)// sort array randomly and return 30 items
        const resObj = {storename, products}
        return resObj
    }

    @UsePipes(ValidationPipe)
    addAndEditProduct({productData, store}:DaddProductReq):any{
        try {
            // let {data, index} = this.getProductByID({productID: productData.id, store}, true)
            // const productInDb = {... data, ...productData}
            // productDB.products[index] = productInDb
            // return 'OK'
            const newProduct:Product = this.productRepository.create(productData);
            const savedData = this.productRepository.save(newProduct)
            console.log('savedData:', savedData)
            return 'OK'
        } catch (error) {
            console.log(error)
        }
    }

    @UsePipes(ValidationPipe)
    getProductByID({productID, store}:DproductReqObj, returnProductIndex?:boolean){
        const [requestedProduct]:any[] =  productDB.products.map((product:Dproduct, index:number) => {
            if(product.id===productID)
                console.log(product.id, productID)
                return returnProductIndex? {data:product, index}:product
        })
        if (requestedProduct) {
            return requestedProduct
        } else {
            throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND)
        }
    }

    @UsePipes(ValidationPipe)
    deleteProduct(productID:number, store:string):string{
        const {index} = this.getProductByID({productID, store}, true)
        productDB.products.splice(index, 1)
        console.log(productDB.products.length)
        return 'Deleted'
    }
}
