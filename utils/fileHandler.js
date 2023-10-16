const multer = require('multer');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const AppError = require("./appError");

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const multerUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter
});

AWS.config.update({
    accessKeyId: process.env.IAM_KEY,
    secretAccessKey: process.env.IAM_SECRET,
    region: process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();

const uploadToS3 = (fileObj) => {

    const uniqueFileName = crypto.randomBytes(16).toString('hex'); // Generate a unique name
    const fileExtension = fileObj.originalname.split('.').pop();

    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `users/${uniqueFileName}.${fileExtension}`,
            Body: fileObj.buffer,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

module.exports = {
    uploadToS3,
    multerUpload
}