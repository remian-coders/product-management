import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FixedProducts {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	ticketNo: string;

	@Column()
	cost: number;

	@Column()
	technician: string;
}
