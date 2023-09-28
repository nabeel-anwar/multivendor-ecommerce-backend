const User = require('./../models/userModel');
const { faker } = require('@faker-js/faker');

exports.seedUser = async (request, response, next) => {
    try {
        response.status(200).json({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.number(),
            dateOfBirth: faker.date.birthdate(),
            gender: faker.person.gender(),
            profilePicture: faker.image.avatar(),
            password: "hello@123",
            registrationType: "phone"
        })
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}