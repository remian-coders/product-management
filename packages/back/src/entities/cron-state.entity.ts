import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CronState {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column({ enum: ['on', 'off'] })
	state: string;
}
