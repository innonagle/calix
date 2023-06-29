# Calix homework

Implement a customer analytics reporting service


## Processing vendor customer transaction data

In a scalable architecture the followign process would be used:
1. The 3rd-party vendor would upload data to a shared object-store like S3.
2. When the data is successfully uploaded a notification containing metadata about the data like size, location, etc. is placed on a queue (vendor.upload).
4. The service regurally polls the queue and retrieves the next object of data to process.
5. The service would update its data-store with new customer transactions.
  1. What happens if a customer record is not found?
6. For each unique customerID the service would place a message on another queue Ianalytics.customer) with the customerID. A TTL could be used to delay the processing of a specific customer's transactions so the upstream analytics service doesn't process the same customer too frequently.
7. The service would then poll the analytics.customer queue for ready messages and send the customer-transaction data to the upstream analytics service in appropriate chunks.


## Request Customer details GET /customer

1. The service would lookup a customer record by email and return the result or an error code if not found.