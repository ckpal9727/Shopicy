import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


const getProducts = asyncHandler(async (req, res) => {
    
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {}

   try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
    
   } catch (error) {
    
    res.send(error)
   }
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numberOfViews: 0,
        description: 'Sample Discription',
    })
    const createProduct = await product.save();
    res.status(201).json(createProduct);
});
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, brand, category } = req.body;
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.countInStock = countInStock;
        product.brand = brand;
        product.category = category;

        const updateProduct = await product.save();
        res.status(201).json(updateProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: "Product deleted" });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        )
        if (alreadyReviewed) {
            res.status(400).json({ message: "Product already reviewed" })
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review);
        product.numberOfViews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Product  review added" })

    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const getTopProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products)


});



export { getTopProduct, getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };