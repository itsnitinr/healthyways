const router = require('express').Router();

const {
  getFoodItems,
  getFoodItemsAdvanced,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require('../controllers/food.controllers');

const { auth, chefOnly } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/', getFoodItems);
router.get('/advanced', getFoodItemsAdvanced);
router.post('/', auth, chefOnly, upload.single('image'), addFoodItem);
router.put('/:id', auth, chefOnly, upload.single('image'), updateFoodItem);
router.delete('/:id', auth, chefOnly, deleteFoodItem);

// Advanced
// 1. Get food items in 5km radius
// 2. Search, sort, paginate

// 1. Distance
// 2. Search
// 3. Filter by day
// 4. Sort
// 5. Pagination

module.exports = router;
