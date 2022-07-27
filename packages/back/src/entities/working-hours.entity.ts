import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkingHours {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column()
	date: Date;
	@Column()
	from: Date;
	@Column()
	to: Date;
	@Column()
	type: string;
}
