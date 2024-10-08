const QuoteDAO = require('../dataAccess/quoteDAO');
const { AppError } = require('../utils/appError');

class QuoteController {

    static async createQuote(req, res, next) {
        try {
            const quoteData = req.body;
            if (!quoteData.quote || !quoteData.person) {
                return next(new AppError('Fields text and person are required', 400));
            }

            const quote = await QuoteDAO.createQuote(quoteData);
            res.status(201).json(quote);
        } catch (error) {
            next(new AppError('Error creating quote', 500));
        }
    }

    static async getQuoteById(req, res, next) {
        try {
            const id = req.params.id;
            const quote = await QuoteDAO.getQuoteById(id);
            if (!quote) {
                return next(new AppError('Quote not found', 404));
            }
            res.status(200).json(quote);
        } catch (error) {
            next(new AppError('Error retrieving quote', 500));
        }
    }

    static async getQuotesByPerson(req, res, next) {
        try {
            const person = req.query.person;
            if (!person) {
                return next(new AppError('Person query parameter is required', 400));
            }

            const quotes = await QuoteDAO.getQuotesByPerson(person);
            if (!quotes || quotes.length === 0) {
                return next(new AppError('No quotes found for the specified person', 404));
            }
            res.status(200).json(quotes);
        } catch (error) {
            next(new AppError('Error retrieving quotes', 500));
        }
    }

    static async getQuotesLikedByUser(req, res, next){
        try {
            const idUser = req.params.idUser;
            const quotes = await QuoteDAO.getLikedByUser(idUser);
            if (quotes.length === 0) {
                return next(new AppError('No quotes found', 404));
            }
            res.status(200).json(quotes);
        } catch (error) {
            next(new AppError('Error retrieving quote', 500));
        }
    }

    static async updateQuote(req, res, next) {
        try {
            const id = req.params.id;
            const quoteData = req.body;

            const existingQuote = await QuoteDAO.getQuoteById(id);
            if (!existingQuote) {
                return next(new AppError('Quote not found', 404));
            }

            const updatedQuote = await QuoteDAO.updateQuote(id, quoteData);
            res.status(200).json(updatedQuote);
        } catch (error) {
            next(new AppError('Error updating quote', 500));
        }
    }

    static async updateVotes(req, res, next) {
        try {
            const id = req.params.id;
            const { votes } = req.body;

            const existingQuote = await QuoteDAO.getQuoteById(id);
            if (!existingQuote) {
                return next(new AppError('Quote not found', 404));
            }

            const updatedQuote = await QuoteDAO.updateVotes(id, votes);
            res.status(200).json(updatedQuote);
        } catch (error) {
            next(new AppError('Error updating votes for quote', 500));
        }
    }

    static async likeQuote(req, res, next) {
        try {
            const id = req.params.id;
            const idUsuario = req.user.id;

            const existingQuote = await QuoteDAO.getQuoteById(id);
            if (!existingQuote) {
                return next(new AppError('Quote not found', 404));
            }

            const updatedQuote = await QuoteDAO.likeQuote(id, idUsuario);
            res.status(200).json(updatedQuote);
        } catch (error) {
            next(new AppError('Error liking this quote ' + error, 500));
        }
    }

    static async unlikeQuote(req, res, next) {
        try {
            const id = req.params.id;
            const idUsuario = req.user.id;

            const existingQuote = await QuoteDAO.getQuoteById(id);
            if (!existingQuote) {
                return next(new AppError('Quote not found', 404));
            }

            const updatedQuote = await QuoteDAO.unlikeQuote(id, idUsuario);
            res.status(200).json(updatedQuote);
        } catch (error) {
            next(new AppError('Error unliking this quote' + error, 500));
        }
    }



    static async deleteQuoteById(req, res, next) {
        try {
            const id = req.params.id;
            const idUsuario = req.user.id;

            const existingQuote = await QuoteDAO.getQuoteById(id);
            if (!existingQuote) {
                return next(new AppError('Quote not found', 404));
            }

            const quoteUserId = existingQuote.user.toString();

            console.log('User ID from token:', idUsuario);
            console.log('User ID from quote:', quoteUserId);

            //Check if this quote was created by the user who made  the request
            if (quoteUserId === idUsuario) {
                await QuoteDAO.deleteQuoteById(id);
                res.status(200).json("Quote successfully deleted");
            }
            else {
                res.status(403).json({ message: "This quote can only be deleted by the user who uploed it" });
            }

        } catch (error) {
            next(new AppError('Error deleting quote', 500));
        }
    }
}

module.exports = QuoteController;
