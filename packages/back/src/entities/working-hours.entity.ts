import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkingHours {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column()
	startingHour: number;
	@Column()
	startingMinute: number;
	@Column()
	endingHour: number;
	@Column()
	endingMinute: number;
}
