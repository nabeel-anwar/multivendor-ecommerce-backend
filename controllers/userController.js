const Factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const {uploadToS3} = require("../utils/fileHandler");

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
        if (request.body.password || request.body.role) {
            return next(
                new AppError(
                    'This route is not for password and role updates.',
                    400
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = filterObj(request.body, 'firstName', 'lastName', 'email', 'phoneNumber');
        if(request.file) {
            const data = await uploadToS3(request.file);
            console.log(data);
            filteredBody.profilePicture = data.Location;
        }
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

exports.searchUser = Factory.search(User, ['firstName', 'lastName', 'email', 'phoneNumber']);

exports.getAllUser = Factory.getAll(User);

exports.getUser = Factory.getOne(User);

exports.createUser = Factory.createOne(User);