import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IP {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column({ unique: true })
	ip: string;
}
