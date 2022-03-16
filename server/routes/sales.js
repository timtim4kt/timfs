const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const productsModel = require(`../models/products`)


const createNewSaleDocument = (req, res, next) => 
{           
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
           
    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.productID = req.params.productID
    saleDetails.price = req.params.price
    saleDetails.customerName = req.params.customerName
    saleDetails.customerEmail = req.params.customerEmail
        
        
    productsModel.findByIdAndUpdate({_id:req.params.productID}, {sold: true}, (err, data) =>
    {
        if(err)
        {
            return next(err)
        }  
    }) 
    
    salesModel.create(saleDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }                        
    })   
    
    return res.json({success:true})
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:productID/:price/:customerName/:customerEmail', createNewSaleDocument)


module.exports = router