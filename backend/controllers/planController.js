const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
    // Optional filtering
    const { operator, circle, type } = req.query;
    let query = {};
    if (operator) query.operator = operator;
    if (type) query.type = type;

    try {
        const plans = await Plan.find(query);
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single plan
// @route   GET /api/plans/:id
// @access  Public
const getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPlan = async (req, res) => {
    const { operator, price, validity, data, calls, sms, description, category, type } = req.body;

    // Robust validation: check for missing required fields
    if (!operator || price === undefined || price === null || !validity || !data || !category) {
        return res.status(400).json({ message: 'Please provide all required fields: operator, price, validity, data, and category.' });
    }

    try {
        const plan = await Plan.create({
            operator,
            price: Number(price), // Ensure it's a number
            validity,
            data,
            calls: calls || 'Unlimited',
            sms: sms || '100 SMS/day',
            description,
            category,
            type: type || 'Prepaid'
        });

        res.status(201).json(plan);
    } catch (error) {
        console.error('Plan creation error:', error);
        res.status(500).json({ message: 'Internal server error while creating plan.' });
    }
};

// @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        await plan.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};
