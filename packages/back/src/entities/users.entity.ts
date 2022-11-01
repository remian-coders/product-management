import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;
	@Column()
	role: 'admin' | 'cashier' | 'accessory';

	@Column({
		nullable: true,
	})
	passwordChangedAt?: Date;
	@Column({
		nullable: true,
	})
	passwordResetToken?: string;
	@Column({
		nullable: true,
	})
	passwordResetExpires?: Date;
}
