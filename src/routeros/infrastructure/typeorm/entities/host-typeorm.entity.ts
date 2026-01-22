import { UUIDVO } from '@/common'
import { HostModel, HostStatus } from '@/routeros/domain/model'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('hosts')
export class HostTypeormEntity implements HostModel {
  @PrimaryGeneratedColumn('uuid')
  id!: UUIDVO

  @Column('varchar')
  name!: string

  @Column('varchar')
  macAddress!: string

  @Column('varchar')
  address!: string

  @Column('varchar')
  toAddress!: string

  @Column('varchar')
  server!: string

  @Column('varchar')
  comment!: string

  @Column('varchar')
  user!: string

  @Column('varchar')
  status!: HostStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null
}
