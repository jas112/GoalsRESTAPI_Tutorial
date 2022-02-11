const express = require('express');
const router = express.Router();
const { getGoals, 
        setGoal, 
        updateGoal, 
        deleteGoal, 
    } = require('../controllers/goalController.js')

const { protect } = require('../middleware/authMiddleware.js');

// app.get('/api/goals', (req, res) => {
//     res.json({"message": 'Get goals...'});
// });

// router.get('/', (req, res) => {
//     res.status(200).json({"message": 'Get goals...from routes'});
// });

//router.get('/', getGoals);

// router.post('/', (req, res) => {
//     res.status(200).json({"message": 'Set goal...from routes'});
// });

//router.post('/', setGoal);

// Simplification of routes = '/'

// router.route('/').get(getGoals).post(setGoal);

router.route('/').get(protect, getGoals).post(protect, setGoal);

// router.put('/:id', (req, res) => {
//     res.status(200).json({"message": `Update goal ${req.params.id}...from routes`});
// });

//router.put('/:id', updateGoal);

// router.delete('/:id', (req, res) => {
//     res.status(200).json({"message": `Delete goal ${req.params.id}...from routes`});
// });

//router.delete('/:id', deleteGoal);

// Simplification of routes = '/:id'

// router.route('/:id').put(updateGoal).delete(deleteGoal);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


module.exports = router;