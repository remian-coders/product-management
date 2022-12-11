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
	sellUnstoredProduct,
} from '../controllers/accessories.controller';

const router = Router();
router.use(guard);

router.get('/', getAccessories);
router.get('/category', getCategories);
router.get('/brands/:categoryId', getBrands);
router.get('/:id', getAccessory);

router.patch(
	'/make-sale/:accessoryId',
	authorize(['admin', 'cashier']),
	makeSale
);
router.post(
	'/sell-unstored-accessory',
	authorize(['admin', 'cashier']),
	sellUnstoredProduct
);

router.use(authorize(['admin', 'accessory']));
router.post('/', addAccessory);
router.route('/:id').patch(updateAccessory).delete(deleteAccessory);
router.post('/category', addCategory);
router.route('/category/:id').patch(updateCategory).delete(deleteCategory);
router.route('/:id').patch(updateAccessory).delete(deleteAccessory);

export default router;
