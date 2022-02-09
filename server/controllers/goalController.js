// Enabling Express Async Handler
const asyncHandler = require('express-async-handler');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({"message": 'Get goals...from controller.'});
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {

    // console.log(req.body);

    // Error handling
    // if(!req.body.text){
    //     res.status(400).json({message: 'Please add a text field'})
    // }

    // Custom error handling
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }

    res.status(200).json({"message": 'Set goal...from controller.'});
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({"message": `Update goal ${req.params.id}...from controller.`});
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({"message": `Delete goal ${req.params.id}...from controller.`});
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};