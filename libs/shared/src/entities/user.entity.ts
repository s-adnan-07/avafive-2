import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ default: 'local' })
  role: string

  // False until user confirms email address
  @Column({ default: false })
  verified: boolean

  @OneToMany(() => ProductEntity, product => product.user)
  products: ProductEntity[]
}
