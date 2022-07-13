import { Entity, Column, PrimaryColumn } from 'typeorm';

type UserRole = 'admin' | 'user';

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

	@Column({
		enum: ['admin', 'user'],
		default: 'user',
	})
	role?: UserRole;
	@Column({
		nullable: true,
	})
	passwordChangedAt?: Date;
}
