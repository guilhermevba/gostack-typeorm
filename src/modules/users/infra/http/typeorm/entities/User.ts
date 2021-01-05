import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import {Exclude, Expose } from 'class-transformer'
import uploadConfig from '@config/upload'

@Entity('users')
export default class User{
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email!: string;

  @Column()
  @Exclude()
  public password!: string;

  @Column()
  public avatar: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @Expose({name: 'avatar_url'})
  getAvatarUrl() : string | null {
    if (!this.avatar) {
      return null
    }
    switch(uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/uploads/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}
