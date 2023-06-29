 
class Customer {
    static findByEmail(email) {
        if (!email || /@hotmail.com$/.test(email)) {
            return null;
        }
        let id = 0;
        for (var i = 0; i < email.length; i++) {
            id += email.charCodeAt(i);
        }
        const cust = new Customer();
        cust.email = email;
        cust.id = id;
        return cust;
    }
}