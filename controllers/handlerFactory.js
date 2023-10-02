const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) => {
    return async (request, response, next) => {
        try {
            const doc = await Model.findByIdAndDelete(request.params.id);

            if (!doc) next(new AppError('no document found with this id', 404));

            response.status(204).json({
                status: 'success',
                data: null,
            });
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    };
};

exports.updateOne = (Model) => {
    return async (request, response, next) => {
        try {
            const doc = await Model.findByIdAndUpdate(
                request.params.id,
                request.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            response.status(200).json({
                status: 'success',
                data: {
                    data: doc,
                },
            });
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    };
};

exports.createOne = (Model) => {
    return async (request, response, next) => {
        try {
            const doc = await Model.create(request.body);

            response.status(201).json({
                status: 'success',
                data: {
                    data: doc,
                },
            });
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    };
};

exports.getOne = (Model, popOption) => {
    return async (request, response, next) => {
        try {
            let query = Model.findById(request.params.id);
            if (popOption) query = query.populate(popOption);
            const doc = await query;

            response.status(200).json({
                status: 'success',
                data: {
                    data: doc,
                },
            });
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    };
};

exports.getAll = (Model) => {
    return async (request, response, next) => {
        try {
            const filter = {};
            if (request.params.productId) filter.tour = request.params.productId; // for getting reviews of specific product

            console.log(request.query);
            const features = new APIFeatures(Model.find(filter), request.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            // Execute Query
            const doc = await features.queryResult;

            // Send Response
            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                length: doc.length,
                data: doc,
            });
        } catch (error) {
            error.statusCode = 404;
            next(error);
        }
    };
};