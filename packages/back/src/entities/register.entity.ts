import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column({ nullable: false, unique: true })
	ticketNo: string;
	@Column({ nullable: false })
	cost: number;
	@Column({
		enum: ['cash', 'card'],
	})
	paymentType: string;
	@Column({ nullable: true })
	admin: string;
	@Column()
	date: Date;
	@Column({
		enum: ['income', 'expense'],
	})
	registerType: string;
	@Column({ nullable: true })
	others: string;
}
