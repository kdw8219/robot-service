import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm'


@Entity('robots')
export class Robot {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    robot_id:string

    @Column()
    model:string

    @Column()
    firmware_version: string;

    @Column({ nullable: true })
    location: string;

    @Column({default:'active'})
    status: 'active | inactive'
    
    @CreateDateColumn()
    created_at: Date;
}
