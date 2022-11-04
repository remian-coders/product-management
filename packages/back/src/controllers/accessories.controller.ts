import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './utils/catch-async-error';
import { CategoriesRepository } from '../repository/categories.repository';
import { AccessoriesRepository } from '../repository/acceesories.repository';
import { CustomError } from '../utils/custom-error';
import { RegisterRepository } from '../repository/register.repository';
import { PaymentsRepository } from '../repository/payments.repository';
import { sendNotification } from '../utils/notification';

export const addAccessory = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			brand,
			name,
			price,
			quantity,
			location,
			category: categoryName,
		} = req.body;
		const categoryRepo = new CategoriesRepository();
		const category = await categoryRepo.findOneBy({ name: categoryName });
		if (!category)
			return next(
				new CustomError('An accessory must have a category!', 404)
			);
		const accessory = {
			brand,
			name,
			price,
			quantity,
			location,
			category,
		};
		const accessoryRepo = new AccessoriesRepository();
		const newAccessory = await accessoryRepo.create(accessory);
		res.status(200).json({
			message: 'New accessory is added!',
			data: { accessory },
		});
	}
);

export const getAccessories = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { categoryId, brand } = req.query;
		const query = {};
		if (categoryId) query['category.id'] = categoryId;
		if (brand) query['brand'] = brand;
		const accessoryRepo = new AccessoriesRepository();
		const accessories = await accessoryRepo.find(query);

		res.status(200).json({
			message: 'Accessories are fetched!',
			data: { accessories },
		});
	}
);

export const updateAccessory = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = Number(req.params.id);
		const { name, location, price, quantity } = req.body;
		const accessoryRepo = new AccessoriesRepository();
		const accessory = await accessoryRepo.findOne(id);
		if (!accessory)
			return next(new CustomError('Accessory not found!', 404));
		accessory.name = name;
		accessory.location = location;
		accessory.price = price;
		accessory.quantity = quantity;
		const updatedAccessory = await accessoryRepo.update(accessory);
		res.status(200).json({
			message: 'Accessory is updated!',
			data: { accessory: updatedAccessory },
		});
	}
);

export const deleteAccessory = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const accessoryRepo = new AccessoriesRepository();
		await accessoryRepo.delete(id);
		res.status(200).json({
			message: 'Accessory is deleted!',
		});
	}
);

export const makeSale = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = Number(req.params.accessoryId);
		const quantity = req.body.quantity * 1;
		const paymentAmount = req.body.paymentAmount * 1;
		const others = req.body.others;
		const paymentType = req.body.paymentType;
		const accessoryRepo = new AccessoriesRepository();
		const accessory = await accessoryRepo.findOne(id);
		if (!accessory)
			return next(new CustomError('Accessory not found!', 404));
		if (accessory.quantity < quantity)
			return next(new CustomError('Not enough quantity!', 400));
		if (accessory.price * quantity != paymentAmount)
			return next(new CustomError('Payment amount is not correct!', 400));

		const registerObj = {
			ticketNo: null,
			cost: paymentAmount as number,
			paymentStatus: 'complete',
			registerType: 'accessory',
			date: new Date(),
			payments: [],
		};
		const registerRepo = new RegisterRepository();
		const register = await registerRepo.create(registerObj);
		const admin = req.user.role === 'admin' ? req.user.name : null;
		const paymentObj = {
			paymentAmount,
			paymentType,
			date: new Date(),
			register,
			others,
			admin,
		};
		const paymentRepo = new PaymentsRepository();
		const payment = await paymentRepo.makePayment(paymentObj);
		accessory.quantity -= quantity;
		const updatedAccessory = await accessoryRepo.update(accessory);
		if (updatedAccessory.quantity === 0) {
			sendNotification({
				errorType: 'OutOfStock',
				product: updatedAccessory,
			});
		}
		res.status(200).json({
			message: 'Sale is made!',
			data: { accessory: updatedAccessory },
		});
	}
);

export const addCategory = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const name = req.body.name as string;
		const categoryRepo = new CategoriesRepository();
		const category = await categoryRepo.create({ name });
		res.status(200).json({
			message: 'New category is created!',
			data: { category },
		});
	}
);

export const getCategories = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const categoryRepo = new CategoriesRepository();
		const categories = await categoryRepo.findAll();
		res.status(200).json({
			message: 'Categories are fetched!',
			data: { categories },
		});
	}
);

export const getBrands = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const categoryId = req.params.categoryId;
		console.log(categoryId);
		const accessoryRepo = new AccessoriesRepository();
		const accessoryBrands = await accessoryRepo.getBrands(categoryId);
		const brands = accessoryBrands.map((acceesory) => acceesory.brand);
		console.log(brands);
		res.status(200).json({
			message: 'Brands are fetched!',
			data: { brands },
		});
	}
);

export const updateCategory = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const name = req.body.name as string;
		const categoryRepo = new CategoriesRepository();
		const category = await categoryRepo.findOneBy({ id });
		if (!category) return next(new CustomError('Category not found!', 404));
		category.name = name;
		const updatedCategory = await categoryRepo.update(category);
		res.status(200).json({
			message: 'Category is updated!',
			data: { category: updatedCategory },
		});
	}
);

export const deleteCategory = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const categoryRepo = new CategoriesRepository();
		await categoryRepo.delete(id);
		res.status(200).json({
			message: 'Category is deleted!',
		});
	}
);
