import { authorize, guard } from '../controllers/authentication.controller';
import { Router } from 'express';
import {
	addAccessory,
	getAccessories,
	updateAccessory,
	deleteAccessory,
	addCategory,
	getCategories,
	deleteCategory,
	updateCategory,
	getBrands,
	makeSale,
} from '../controllers/accessories.controller';

const router = Router();
router.use(guard, authorize(['admin', 'accessory']));
router.route('/').post(addAccessory).get(getAccessories);
router.route('/:id').patch(updateAccessory).delete(deleteAccessory);
router.patch('/make-sale/:accessoryId', makeSale);
router.route('/category').post(addCategory).get(getCategories);
router.route('/category/:id').patch(updateCategory).delete(deleteCategory);
router.get('/brands/:categoryId', getBrands);

export default router;
