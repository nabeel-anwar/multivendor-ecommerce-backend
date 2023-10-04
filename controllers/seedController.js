const User = require('./../models/userModel');
const Seller = require('./../models/sellerModel');
const Category = require('./../models/categoryModel');
const Brand = require('./../models/brandModel');
const Product = require('./../models/productModel');
const Review = require('./../models/reviewModel');

const {faker} = require('@faker-js/faker');

exports.seedUser = async (request, response, next) => {
    try {
        console.log(request.url)
        request.query.user = request.query.user || 50;
        let users = [];
        for (let i = 0; i < request.query.user; i++) {
            users.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.number(),
                dateOfBirth: faker.date.birthdate(),
                gender: 'male',
                profilePicture: faker.image.avatar(),
                password: "hello@123",
                registrationType: "phone"
            });
        }

        const docs = await User.create(users);

        if(request.url.startsWith('/collections')) return next();

        response.status(200).json({
            status: 'success',
            length: docs.length,
            data: docs
        })
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

exports.seedSeller = async (request, response, next) => {
    try {
        const sellers = [];
        const users = await User.find();
        const countUsers = users.length;

        // 1) get user ids for applying to seller
        const userIds = []; // for getting every 5th users id.
        users.forEach((user, index) => {
            if (!(index * 10 >= countUsers)) userIds.push(user._id);
        })
        // 2) Create fake users with userId
        for (let i = 0; i < userIds.length; i++) {
            sellers.push({
                userId: userIds[i],
                storeName: faker.lorem.words({min: 1, max: 3}),
                storeDescription: faker.lorem.sentences({min: 1, max: 3}),
                logo: faker.image.avatar(),
                bankName: faker.lorem.word() + " Bank",
                bankCode: "1234",
                accountTitle: faker.finance.accountName(),
                accountNumber: faker.finance.accountNumber(),
                ProofOfAddress: "url",
                cnic: "url",
                signature: "url"
            })
        }

        //3) add user to database
        const docs = await Seller.create(sellers);
        request.query.seller = docs.length;
        if(request.url.startsWith('/collections')) return next();

        response.status(200).json({
            status: 'success',
            length: sellers.length,
            data: docs
        })
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

exports.seedCategories = async (request, response, next) => {
    try {
        request.query.category = request.query.category || 20;
        const categories = [];
        for (let i = 0; i < request.query.category; i++) {
            categories.push({
                name: faker.lorem.words({min: 1, max: 3}),
                image: `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`,
                description: faker.lorem.sentences({min: 1, max: 3})
            })
        }

        const docs = await Category.create(categories);

        if(request.url.startsWith('/collections')) return next();

        response.status(200).json({
            status: 'success',
            length: docs.length,
            data: docs
        })

    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

exports.seedBrands = async (request, response, next) => {
    try {
        request.query.brand = request.query.brand || 10;
        const brands = [];
        for (let i = 0; i < request.query.brand; i++) {
            brands.push({
                name: faker.lorem.words({min: 1, max: 3}),
                logo: faker.image.avatar(),
                description: faker.lorem.sentences({min: 1, max: 3}),
                website: faker.internet.url()
            })
        }

        const docs = await Brand.create(brands);

        if(request.url.startsWith('/collections')) return next();

        response.status(200).json({
            status: 'success',
            length: docs.length,
            data: docs
        })

    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

exports.seedProduct = async (request, response, next) => {
    try {
        request.query.product = request.query.product || 50;

        const products = [];

        const sellers = await Seller.find();

        const categories = await Category.find();

        const brands = await Brand.find();

        for (let i = 0; i < request.query.product; i++) {
            products.push({
                title: faker.commerce.productName(),
                shortDescription: faker.commerce.productDescription(),
                extraDescription: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                quantity: Math.floor(Math.random() * 100),
                totalAllowedQuantity: Math.floor(Math.random() * 500),
                minOrderQuantity: Math.floor(Math.random() * 10),
                maxOrderQuantity: Math.floor(Math.random() * 100),
                images: [
                    `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`,
                    `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`,
                    `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`
                ],
                tags: [
                    faker.commerce.productAdjective(),
                    faker.commerce.productAdjective(),
                    faker.commerce.productAdjective()
                ],
                isReturnable: true,
                isCancelable: false,
                brand: brands[Math.floor(Math.random() * brands.length)]._id,
                category: categories[Math.floor(Math.random() * categories.length)]._id,
                seller: sellers[Math.floor(Math.random() * sellers.length)]._id,
                isCodAllowed: true
            })
        }

        const docs = await Product.create(products);

        if(request.url.startsWith('/collections')) return next();

        response.status(200).json({
            status: 'success',
            length: docs.length,
            data: docs
        })
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}

exports.seedReviews = async (request, response, next) => {
    try {
        request.query.review = request.query.review || 100;

        const reviews = [];

        const users = await User.find();

        const products = await Product.find();

        for (let i = 0; i < request.query.review; i++) {
            reviews.push({
                review: faker.lorem.sentences({min: 1, max: 3}),
                rating: Math.floor(Math.random() * 5) + 1,
                images: [
                    `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`,
                    `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`,
                    `https://picsum.photos/200/300?image=${Math.floor(Math.random() * 1000)}`
                ],
                user: users[Math.floor(Math.random() * users.length)]._id,
                product: products[Math.floor(Math.random() * products.length)]._id
            })
        }

        const docs = await Review.create(reviews);

        if(request.url.startsWith('/collections')) return response.status(200).json({
            status: 'success',
            seeded: {
                Users: request.query.user,
                Sellers: request.query.seller,
                Categories: request.query.category,
                Brands: request.query.brand,
                Products: request.query.product,
                Reviews: request.query.review
            }
        })

        response.status(200).json({
            status: 'success',
            length: docs.length,
            data: docs
        });
    } catch (error) {
        error.statusCode = 404;
        next(error);
    }
}