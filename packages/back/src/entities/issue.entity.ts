import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn()
	id?: number;
	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	date?: Date;
	@Column({
		enum: [
			'general',
			'cost-difference',
			'older-than-7-days',
			'incomplete-payment',
			'out-of-stock',
		],
	})
	type: string;
	@Column()
	description: string;
	@Column({
		nullable: true,
	})
	productId?: number;
}
