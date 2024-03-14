const crud = require('../MongoDBCrud')

exports.insertData = async (req, res) => {
    try {
        
        const data = req.body
        const customerloan = await crud.insertLoanData(data)
        res.status(201).json({
            status: 'Successfully created Customer Loan',
            data: customerloan
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed to Create customer Loan',
            message: err.message
        });
    } 
};

exports.getLoanByCustomerId = async(req,res) => {
    try {
        
        const custId = req.body.customerId;
        const query = { 'customerId': { $eq: custId }};
        const loans = await crud.findLoanData(query)
        res.status(201).json({
            status: 'Successfully found Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to find customer Loan',
            message: err.message
        });
    }
};

exports.updateCustomerLoan = async(req,res) => {
    try {
       
        const customerId = Number(req.params.id);
        const updatedData = req.body;
        const query = { "customerId": customerId};
        const loans = await crud.updateLoanData(query,updatedData)
        res.status(201).json({
            status: 'Successfully Updated Customer Loan',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to Update customer Loan',
            message: err.message
        });
    } 
};

exports.deleteLoanById = async(req,res) => {
    try {
        
        const loanId = req.body.loanId;
        const query = { "loanId" : loanId };
        const loans = await crud.deleteLoanData(query)
        res.status(201).json({
            status: 'Successfully Deleted Customer Loan Based on Loan Id',
            data: loans
        });
    } catch (err) {
        res.status(404).json({
            status: 'Unable to delete Customer Loan',
            message: err.message
        });
    }  
};