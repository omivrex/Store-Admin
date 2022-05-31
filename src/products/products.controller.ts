import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import {DaddProductReq, Dproduct, DproductReqObj, DstoreResponse} from "../dtos/product.dto"
@Controller('/:store')
export class ProductsController {
    constructor(private readonly ProductsService:ProductsService){}
    @Get('/')
    getProductsAllForStore(@Param('store') store:string): DstoreResponse{ /**use dtos to validate content */
        return this.ProductsService.getProductsAllForStore(store)
    }

    @Put('/add')
    addProduct(@Body() productData:Dproduct, @Param('store') store:string){ /** use dtos to validate content */
        const reqObj:DaddProductReq = {productData, store}
        return this.ProductsService.addAndEditProduct(reqObj)
    }

    @Get('/product')
    getProductByID(@Param('store') store:string, @Query('productID') productID:string):Dproduct{ /** use dtos to validate content */
        const reqObj:DproductReqObj = {store, productID: parseInt(productID)}
        return this.ProductsService.getProductByID(reqObj)
    }

    @Delete('/')
    deleteProduct(@Param('store') store:string, @Query('productID') productID:string):string {
        return this.ProductsService.deleteProduct(parseInt(productID), store)
    }
}
