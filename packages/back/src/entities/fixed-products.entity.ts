import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FixedProducts {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({
		nullable: false,
		unique: true,
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
	@Column({
		nullable: false,
		default: () => Date.now(),
	})
	date: Date;
}
