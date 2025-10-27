import { Column, CreateDateColumn, UpdateDateColumn, BaseEntity as TypeOrmBaseEntity } from "typeorm";

export abstract class BaseEntity extends TypeOrmBaseEntity {
    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @Column({ name: 'created_by', nullable: true, update: false })
    createdBy: string;
    @Column({ name: 'updated_by', nullable: true })
    updatedBy: string;
}