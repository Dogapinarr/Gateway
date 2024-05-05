API Gateway
This project acts as an API gateway, providing user authentication and routing incoming requests to appropriate services after validating the user's identity.

Getting Started
The API gateway is developed using Express.js and has a few dependencies. You can install the dependencies by running the following command:

npm install

To start the API gateway, you can run the following command:

node api-gateway.js

By default, the API gateway runs on port 3000. You can change the port by using an environment variable. For example:

PORT=5000 node api-gateway.js

API Routes
User Login
POST /v1/login

You can use this route for user login. You need to provide the subscriber_no and password fields in the request. Upon successful authentication, an access token is returned.

Example Request:
{
    "subscriber_no": "12345",
    "password": "password123"
}
Query Bill
GET /v1/query-bill

Authentication is required to access this route. Authenticated users can query their bills. You need to provide the subscriber_no and month parameters in the request. Proper error codes are returned if the bill is not found or if the request is malformed.

Example Request:

GET /v1/query-bill?subscriber_no=12345&month=2024-05

Service A and Service B
This project represents two separate microservices, Service A and Service B. Service A provides user authentication and access token generation capabilities, while Service B provides bill query capabilities.

Service A
Service A handles user login.

Getting Started
You can start Service A by running the following command:

node service-a.js
By default, Service A runs on port 3001. You can change the port by using an environment variable.

API Routes
User Login
POST /v1/login

You can use this route for user login. You need to provide the subscriber_no and password fields in the request. Upon successful authentication, an access token is returned.

Example Request:
{
    "subscriber_no": "12345",
    "password": "password123"
}
Service B
Service B provides bill query capabilities.

Getting Started
You can start Service B by running the following command:
node service-b.js

By default, Service B runs on port 3002. You can change the port by using an environment variable.

API Routes
Query Bill
GET /v1/query-bill

Authentication is required to access this route. Authenticated users can query their bills. You need to provide the subscriber_no and month parameters in the request. Proper error codes are returned if the bill is not found or if the request is malformed.

Example Request:

GET /v1/query-bill?subscriber_no=12345&month=2024-05

Api gateway:
![api gateway](https://github.com/Dogapinarr/Gateway/assets/147092474/30eee365-8932-4a76-b265-8d63a5ba043c)

Service A:
![service a](https://github.com/Dogapinarr/Gateway/assets/147092474/c53ec971-e149-4339-b73c-1ab95907cd61)

Service B: 
![service b](https://github.com/Dogapinarr/Gateway/assets/147092474/7dc00bc2-f6c4-4088-b56d-48dd60caebf9)


Video Presentation:

https://drive.google.com/file/d/110w2AaY0x6OQqPzjzwk2MstJPCyONnIp/view?usp=sharing


