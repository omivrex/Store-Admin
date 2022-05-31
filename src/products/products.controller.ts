import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import {Dproduct, DproductReqObj, DStoreResponse} from "../dtos/product.dto"
@Controller('/:store')
export class ProductsController {
    constructor(private readonly ProductsService:ProductsService){}
    @Get('/')
    getProductsAllForStore(@Param('store') store:string): DStoreResponse{ /**use dtos to validate content */
        return this.ProductsService.getProductsAllForStore(store)
    }

    @Put('/add')
    addProduct(@Body() productData:Dproduct){ /** use dtos to validate content */
        return this.ProductsService.addProduct(productData)
    }

    @Get('/product')
    getProductByID(@Param('store') store:string, @Query('productID') productID:string):Dproduct{ /** use dtos to validate content */
        const reqObj:DproductReqObj = {store, productID: parseInt(productID)}
        return this.ProductsService.getProductByID(reqObj)
    }
}
