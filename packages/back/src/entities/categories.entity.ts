import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Accessory } from './accessoreis.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ unique: true })
	name: string;
	@OneToMany(() => Accessory, (accessory) => accessory.category)
	accessories?: Accessory[];
}
