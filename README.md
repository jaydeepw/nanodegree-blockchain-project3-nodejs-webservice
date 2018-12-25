My 3rd project when pursuing [Blockchain Developer Nanodegree](https://in.udacity.com/course/blockchain-developer-nanodegree--nd1309) from Udacity.
This project is a webservice that creates a REAL blockchain. The blocks are stored
on the chain using [LevelDB](https://github.com/google/leveldb). It lets
you interact with the blockchain using a RESTful API.
The API has been written using [ExpressJS](https://expressjs.com/) Node framework.

Project Rubric: https://review.udacity.com/#!/rubrics/1707/view

### Getting started
- Clone this repository and `cd` into it from your terminal
- Type `npm install`
- Type `node app.js`
- Your server will start locally on port `8000`

## Endpoint documentation
### Get block by `height`

`GET /block/:index`

This API end point will return the block where height = index.

Sample

**Request** `GET /block/1`

**Response**
```
{
    "body": "Data in the block",
    "height": 11,
    "time": 1545736272411,
    "previousBlockHash": "775aced2bceef18970d858b12dce556abcba578e4aad244c174f148d917457e8",
    "hash": "e89a04a161b214d866c2c58b6b36b31f1d79f9708e26924a4c550c688acc6b15"
}
```

### Create a block

`POST /block`

Creates a block on the blockchain using this API. 

Sample

**Request** `POST /block`

**Body**
```
{
    "body" : "my Nth block"
}
```

`Note: 'body' is a required property when sending data to the API`
