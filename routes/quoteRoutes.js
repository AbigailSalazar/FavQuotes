const express = require('express')
const QuoteController =require('../controllers/QuoteController')
const jwtUtils = require('../utils/jwt')
const router = express.Router();


router.get('/author',QuoteController.getQuotesByPerson);
router.get('/:id',QuoteController.getQuoteById);
router.get('/likes/:idUser',QuoteController.getQuotesLikedByUser)

router.post('/',jwtUtils.verifyToken,QuoteController.createQuote);
router.put('/:id',jwtUtils.verifyToken,QuoteController.updateQuote);
router.patch('/:id/like',jwtUtils.verifyToken,QuoteController.likeQuote);
router.patch('/:id/unlike',jwtUtils.verifyToken,QuoteController.unlikeQuote);
router.delete('/:id',jwtUtils.verifyToken,  QuoteController.deleteQuoteById);

module.exports = router;