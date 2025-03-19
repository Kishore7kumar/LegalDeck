import Lawyer from '../models/lawyerModel.js';

// @desc    Get all lawyers with filtering, sorting, and pagination
// @route   GET /api/lawyers
// @access  Public
export const getAllLawyers = async (req, res) => {
    try {
        const {
            specialization,
            minExperience,
            maxExperience,
            minFees,
            maxFees,
            sortBy,
            order = 'asc',
            page = 1,
            limit = 10,
        } = req.query;

        // ✅ Build filter object based on query params
        const filter = {};
        if (specialization) filter.specialization = specialization;
        if (minExperience) filter.experience = { ...filter.experience, $gte: parseInt(minExperience) };
        if (maxExperience) filter.experience = { ...filter.experience, $lte: parseInt(maxExperience) };
        if (minFees) filter.fees = { ...filter.fees, $gte: parseInt(minFees) };
        if (maxFees) filter.fees = { ...filter.fees, $lte: parseInt(maxFees) };

        // ✅ Sorting
        const sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = order === 'desc' ? -1 : 1;
        }

        // ✅ Pagination
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        const totalLawyers = await Lawyer.countDocuments(filter);
        const lawyers = await Lawyer.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({
            totalLawyers,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalLawyers / pageSize),
            lawyers,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
