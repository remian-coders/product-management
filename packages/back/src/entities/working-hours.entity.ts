import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkingHours {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column()
	from: Date;
	@Column()
	to: Date;
}
