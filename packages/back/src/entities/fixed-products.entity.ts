import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FixedProducts {
	@PrimaryColumn()
	id: string;

	@Column({
		nullable: false,
	})
	ticketNo: string;

	@Column({
		default: 0,
	})
	cost: number;

	@Column({
		nullable: false,
	})
	technician: string;
}
