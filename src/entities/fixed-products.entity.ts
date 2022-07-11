import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FixedProducts {
	@PrimaryColumn()
	id: string;

	@Column()
	ticketNo: string;

	@Column()
	cost: number;

	@Column()
	technician: string;
}
