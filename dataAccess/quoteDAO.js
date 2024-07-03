const Quote = require('../models/Quote')

class QuoteDAO {
    constructor() {

    }

    async createQuote(quoteData) {
        try {
            const quote = new Quote(quoteData);
            const newQuote = await quote.save();
            return newQuote;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getQuoteById(id) {
        try {
            return await Quote.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getQuotesByPerson(person) {
        try {
            return await Quote.find({ person: person });
        } catch (error) {
            throw error;
        }
    }

    async updateQuote(id, quoteData) {
        try {
            return await Quote.findByIdAndUpdate(id, quoteData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async updateVotes(id, votes) {
        try {
            return await Quote.findByIdAndUpdate(id, { votes: votes }, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async likeQuote(id,idUser){
        try {
            return await Quote.findByIdAndUpdate(id, {$push:{ likes:idUser }}, { new: true });
        } catch (error) {
            throw error;
        }
    }

   

    async unlikeQuote(id,idUser){
        try {
            return await Quote.findByIdAndUpdate(id,  {$pull: { likes: idUser }}, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async deleteQuoteById(id) {
        try {
            return await Quote.findOneAndDelete({ _id: id });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new QuoteDAO();
