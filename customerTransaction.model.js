// CustomerEmail, Products, TransactionID, TransactionAmount, Currency, Timestamp, Region, VendorId
// rich123@gmail.com, SKU123|SKU121, transac123, 100.56, USD, 2023-05-05T12:00:00Z, US_CA, amzn_US

class Transaction {
    static findByCustomer(customerId) {
        if (!customerId) {
            return null;
        }
        const trans = new self();
        return [trans];
    }
}