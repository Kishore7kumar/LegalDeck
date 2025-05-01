import Lawyer from '../models/lawyerModel.js';

// Register lawyer
export const registerLawyer = async (req, res) => {
  const { name, specialization, experience, fees, availableSlots } = req.body;

  if (!name || !specialization || !experience || !fees || !availableSlots) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await Lawyer.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Lawyer already registered' });
    }

    const slots = JSON.parse(availableSlots);
    const documents = req.files.map(f => f.path);

    const lawyer = new Lawyer({
      name,
      specialization,
      experience,
      fees,
      availableSlots: slots,
      documents
    });

    const saved = await lawyer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

// Get all with filters
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
      limit = 10
    } = req.query;

    const filter = {};
    if (specialization) filter.specialization = specialization;
    if (minExperience) filter.experience = { ...filter.experience, $gte: +minExperience };
    if (maxExperience) filter.experience = { ...filter.experience, $lte: +maxExperience };
    if (minFees) filter.fees = { ...filter.fees, $gte: +minFees };
    if (maxFees) filter.fees = { ...filter.fees, $lte: +maxFees };

    const sort = sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {};

    const skip = (+page - 1) * +limit;
    const total = await Lawyer.countDocuments(filter);

    const lawyers = await Lawyer.find(filter).sort(sort).skip(skip).limit(+limit);

    res.status(200).json({
      totalLawyers: total,
      currentPage: +page,
      totalPages: Math.ceil(total / +limit),
      lawyers
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get by ID
export const getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });
    res.status(200).json(lawyer);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lawyer', error: err.message });
  }
};

// Update
export const updateLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    const updates = req.body;
    if (req.files) {
      const newDocs = req.files.map(f => f.path);
      lawyer.documents.push(...newDocs);
    }

    if (updates.availableSlots) {
      try {
        updates.availableSlots = JSON.parse(updates.availableSlots);
      } catch {
        return res.status(400).json({ message: 'Invalid slot format' });
      }
    }

    Object.assign(lawyer, updates);
    const updated = await lawyer.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// Delete
export const deleteLawyer = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Not found' });

    await lawyer.deleteOne();
    res.status(200).json({ message: 'Lawyer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error', error: err.message });
  }
};

// Book slot
export const bookSlot = async (req, res) => {
  const { slotId } = req.body;
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    const slot = lawyer.availableSlots.id(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    if (slot.isBooked) return res.status(400).json({ message: 'Slot already booked' });

    slot.isBooked = true;
    await lawyer.save();

    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Booking error', error: err.message });
  }
};
