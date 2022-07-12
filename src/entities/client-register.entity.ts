import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ClientRegister {
	@PrimaryColumn()
	id: string;
	@Column({ nullable: false })
	ticketNo: string;
	@Column({ nullable: false })
	cost: number;
	@Column({
		enum: ['cash', 'card'],
	})
	@Column()
	paymentType: string;
	@Column()
	date: Date;
	@Column({
		enum: ['income', 'expense'],
	})
	registerType: string;
	@Column({ nullable: true })
	others: string;
}
