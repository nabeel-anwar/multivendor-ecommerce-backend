const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updateMe = async (request, response, next) => {
    try {
        // 1) Create error if user POSTs password data
        if (request.body.password) {
            return next(
                new AppError(
                    'This route is not for password updates. Please use /updateMyPassword.',
                    400
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = filterObj(request.body, 'firstName', 'lastName', 'email', 'phoneNumber');

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(request.params.id, filteredBody, {
            new: true,
            runValidators: true
        });

        if(!updatedUser) return next(new AppError('User not found', 404));

        response.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
};

exports.deleteMe = async (request, response, next) => {
    try {
        await User.findByIdAndUpdate(request.params.id, {active: false});

        response.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
};


exports.getAllUser = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);