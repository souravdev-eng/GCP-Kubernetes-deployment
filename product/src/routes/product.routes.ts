import { Router } from 'express';
import { requireAuth, currentUser } from '@ecom-micro/common';
import { newProduct } from '../controllers/newProduct';
import { updateProduct } from '../controllers/updateProduct';
import { showProductList } from '../controllers/showProductList';

const router = Router();

router.route('/').post(requireAuth, newProduct).get(requireAuth, showProductList);
router.route('/:id').put(requireAuth, updateProduct);

export { router as productRouter };
