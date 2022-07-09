import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SvcPath {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	path: string;
}
