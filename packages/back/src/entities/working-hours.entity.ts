import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkingHours {
	@PrimaryGeneratedColumn()
	id: number;
}
