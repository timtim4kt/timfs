const router = require(`express`).Router()
var createError = require('http-errors')

const productsModel = require(`../models/products`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_NORMAL_USER)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}


const createNewProductDocument = (req, res, next) =>
{           
    // Use the new product details to create a new product document
    let productDetails = new Object()
                
    productDetails.name = req.body.name
    productDetails.brand = req.body.brand
    productDetails.year = req.body.year
    productDetails.price = req.body.price

    // add the product's photos to the productDetails JSON object
    productDetails.photos = []
                
    req.files.map((file, index) =>
    {
        productDetails.photos[index] = {filename:`${file.filename}`}
    })
        
    productsModel.create(productDetails, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAllProductDocuments = (req, res, next) =>
{   
    //user does not have to be logged in to see product details
    productsModel.find((err, data) =>
    {       
        if(err)
        {
            return next(err)
        }     
        
        return res.json(data)
    })
}


const getProductPhotoAsBase64 = (req, res, next) =>
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


const getProductDocument = (req, res, next) =>
{
    productsModel.findById(req.params.id, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}


const updateProductDocument = (req, res, next) =>
{
    productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteProductDocument = (req, res, next) =>
{
    productsModel.findByIdAndRemove(req.params.id, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}


// read all records
router.get(`/products`, getAllProductDocuments)

// get one product photo
router.get(`/products/photo/:filename`, getProductPhotoAsBase64)

// Read one record
router.get(`/products/:id`, getProductDocument)

// Add new record
router.post(`/products`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("productPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewProductDocument)

// Update one record
router.put(`/products/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, updateProductDocument)

// Delete one record
router.delete(`/products/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteProductDocument)


module.exports = router