import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, unique: true })
  model: string

  @Column({ nullable: true })
  title: string

  @Column({ nullable: true })
  category: string

  @ManyToOne(() => UserEntity, user => user.products)
  user: UserEntity
}
