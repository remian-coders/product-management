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
	getAccessory,
} from '../controllers/accessories.controller';

const router = Router();
router.use(guard, authorize(['admin', 'accessory']));

router.route('/category/:id').patch(updateCategory).delete(deleteCategory);
router.get('/brands/:categoryId', getBrands);
router.route('/category').post(addCategory).get(getCategories);
router
	.route('/:id')
	.patch(updateAccessory)
	.delete(deleteAccessory)
	.get(getAccessory);
router.route('/').post(addAccessory).get(getAccessories);
router.patch('/make-sale/:accessoryId', makeSale);
export default router;
