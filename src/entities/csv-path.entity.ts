import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CsvPath {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	path: string;
}
