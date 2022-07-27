import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FixedProducts {
	@PrimaryGeneratedColumn()
	id?: string;

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
