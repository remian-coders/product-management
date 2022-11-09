import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	Unique,
} from 'typeorm';
import { Category } from './categories.entity';

@Entity()
@Unique(['name', 'brand'])
export class Accessory {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	brand: string;

	@Column()
	name: string;

	@Column()
	price: number;

	@Column()
	quantity: number;

	@Column()
	location: string;

	@Column()
	model: string;

	@ManyToOne(() => Category, (category) => category.accessories)
	category: Category;
}
