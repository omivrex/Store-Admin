import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    name: 'title'
  })
  title: string;

  @Column({
    name: 'description',
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    type: 'float',
    name: 'price'
  })
  price: number;

  @Column({
    nullable: false,
    type: 'float',
    name: 'discountPercentage'
  })
  discountPercentage: number;

  @Column({
    nullable: true,
    type: 'float',
    name: 'rating'
  })
  rating: number

  @Column({
    nullable: false,
    type: 'bigint',
    name: 'stock'
  })
  stock: number

  @Column({
    nullable: true,
    type: 'text',
    name: 'brand'
  })
  brand: string

  @Column({
    nullable: false,
    type: 'text',
    name: 'category'
  })
  category: string

  @Column({
    nullable: false,
    type: 'text',
    name: 'thumbnail'
  })
  thumbnail: string

  @Column('text', {
    nullable: true,
    name: 'images',
    array: true
  })
  images: string[]

}