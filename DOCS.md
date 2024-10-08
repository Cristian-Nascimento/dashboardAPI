# transaction v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Transactions](#transactions)
	- [Create transaction](#create-transaction)
	- [Delete transaction](#delete-transaction)
	- [Update transaction](#update-transaction)
	- [Retrieve transaction](#retrieve-transaction)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Transactions

## Create transaction



	POST /transactions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| userId			| String			|  							|
| description			| String			|  							|
| descriptionText			| String			|  							|
| amount			| Number			|  							|
| type			| String			|  							|

### Success Response

Success response example:

```
{
    "userId": "66b798cfc738bc7d90e5de3a",
    "description": "Salário",
    "descriptionText": "Pix",
    "amount": 3700,
    "type": "Entrada",
    "createdAt": "2024-08-10T19:53:54.800Z",
    "updatedAt": "2024-08-10T19:53:54.800Z",
    "__v": 0,
    "id": "66b7c552afdc807fd0f8af3d"
}
```
## Delete transaction



	DELETE /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| path			|  <p>Id of target item to delete.</p>							|

## Update transaction



	PUT /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| path			|  <p>Id of target item to update.</p>							|
| name			| String			|  <p>Transactions name.</p>							|

### Success Response

Success response example:

```
{
    "userId": "66b798cfc738bc7d90e5de3a",
    "description": "Aluguel",
    "descriptionText": "Pix",
    "amount": 600,
    "type": "Saída",
    "createdAt": "2024-08-10T19:46:14.710Z",
    "updatedAt": "2024-08-10T19:59:13.366Z",
    "__v": 0,
    "id": "66b7c386573f97a7603a121f"
}
```
## Retrieve transaction



	GET /transactions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| userId			| query			|  							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

### Success Response

Success response example:

```
{
    "count": 1,
    "rows": [
        {
            "userId": "66b798cfc738bc7d90e5de3a",
            "description": "Salário",
            "descriptionText": "Pix",
            "amount": 3700,
            "type": "Entrada",
            "createdAt": "2024-08-10T19:53:54.800Z",
            "updatedAt": "2024-08-10T19:53:54.800Z",
            "__v": 0,
            "id": "66b7c552afdc807fd0f8af3d"
        }
  ]
}
```
# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


