import { Router } from 'express';
import { currentUser, validateRequest } from '@ecom-micro/common';
import { signupValidationSchema } from '../validation/signupValidation';
import { signinValidation } from '../validation/signinValidation';

import { getCurrentUser } from '../controllers/current-user';
import { signin } from '../controllers/signin';
import { signup } from '../controllers/signup';
import { signout } from '../controllers/signout';

const router = Router();

router.post('/signin', signinValidation, validateRequest, signin);
router.post('/signup', signupValidationSchema, validateRequest, signup);
router.post('/signout', signout);
router.get('/currentuser', currentUser, getCurrentUser);

export { router as authRoute };
