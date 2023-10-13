const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const {query} = require("express");

exports.deleteOne = (Model) => {
    return async (request, response, next) => {
        try {
            const doc = await Model.findByIdAndDelete(request.params.id);

            if (!doc) return next(new AppError('no document found with this id', 404));

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

            if (!doc) return next(new AppError('no document found with this id', 404));

            response.status(200).json({
                status: 'success',
                data: doc,
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

            if (!doc) return next(new AppError('no document found with this id', 404));

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


exports.search = (Model, fieldsToSearch) => {
    return async (request, response, next) => {
        try{
            if (request.query.search) {
                const searchString = request.query.search; // getting search string

                //let fields = Object.keys(Model.schema.paths); // getting documents keys to search

                // fields = fields.filter((f) => (f !== "_id") && (f !== 'id') && (f !== "__v")); // filter unnecessary key
                // let fields = fieldsToSearch;
                // fields = fields.filter(
                //     (f) => Model.schema.paths[f].instance !== "ObjectId"
                // ); // filter objectID keys (which is used to populate)



                const regexQuery = fieldsToSearch.map((field) => ({
                    [field]: { $regex: searchString, $options: "i" },
                })); // creating fields array like: { name: { $regex: "searchString", $options: "i" } };

                const queryResult = await Model.find({$or: regexQuery});

                response.status(200).json({
                    status: 'success',
                    value: searchString,
                    length: queryResult.length,
                    data: queryResult
                })
            }else{
                return next(new AppError('cannot find the search string in query', 404));
            }

        }catch (error) {
            error.statusCode = 404;
            next(error);
        }
    }
}