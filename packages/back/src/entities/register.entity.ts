import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { Payment } from './payments.entity';
@Entity()
export class Register {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column({ nullable: true, unique: true })
	ticketNo: string;
	@Column({ nullable: false })
	cost: number;
	@Column()
	paymentStatus: 'complete' | 'incomplete';
	@Column()
	registerType: 'service' | 'expense' | 'accessory';
	@Column()
	date: Date;
	@OneToMany(() => Payment, (payment) => payment.register)
	payments: Payment[];
}
