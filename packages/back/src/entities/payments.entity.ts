import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Register } from './register.entity';

@Entity()
export class Payment {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	paymentType: 'cash' | 'card';

	@Column()
	paymentAmount: number;

	@Column()
	date: Date;

	@Column({ nullable: true })
	admin: string;
	@Column({ nullable: true })
	others: string;
	@ManyToOne(() => Register, (register) => register.payments)
	register: Register;
}
