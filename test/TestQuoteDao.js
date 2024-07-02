const Quote = require('../entities/Quote');
const db = require('../config/db');
const UserDAO = require("../dataAccess/userDAO");
const QuoteDAO = require('../dataAccess/quoteDAO');

async function main() {
    await db.connect().then(() => {
        console.log('Connection successful');
    }).catch((err) => {
        console.log(err);
    });

    // Tests
    let testUser = await UserDAO.getUserByName('Test');
    
    // Create
    await QuoteDAO.createQuote(new Quote(testUser._id, "Author A", "This is a sample quote")).then(quoteSaved => {
        console.log('Quote created successfully', quoteSaved);
    }).catch(err => {
        console.log('Error creating quote', err);
    });

    await QuoteDAO.createQuote(new Quote(testUser._id,"Author B", "This is a sample quote")).then(quoteSaved => {
        console.log('Quote created successfully', quoteSaved);
    }).catch(err => {
        console.log('Error creating quote', err);
    });

    await QuoteDAO.createQuote(new Quote(testUser._id,"Author C", "This is a sample quote")).then(quoteSaved => {
        console.log('Quote created successfully', quoteSaved);
    }).catch(err => {
        console.log('Error creating quote', err);
    });

    // Read
    console.log('Retrieving all quotes by author - Author B...');
    let retrievedQuotes = await QuoteDAO.getQuotesByPerson("Author B");
    console.log(retrievedQuotes);

    console.log('Retrieving quote by ID...');
    let retrievedQuote = await QuoteDAO.getQuoteById(retrievedQuotes[0]._id);
    console.log(retrievedQuote);

    // Update
    console.log('Updating quote by Author B...');
    const updatedQuoteData = new Quote(testUser._id,"Author A", "Updated sample quote");
    let updatedQuote = await QuoteDAO.updateQuote(retrievedQuotes[0]._id, updatedQuoteData);
    console.log(updatedQuote);

    // Delete
    console.log('Deleting quote by ID...');
    let deletedQuote = await QuoteDAO.deleteQuoteById(retrievedQuotes[0]._id);
    console.log('Quote deleted successfully', deletedQuote);

    await db.disconnect().then(() => {
        console.log('Disconnection successful');
    }).catch((err) => {
        console.log(err);
    });
}

main();
