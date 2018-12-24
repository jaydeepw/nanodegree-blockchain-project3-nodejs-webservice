# nanodegree-blockchain-project3-nodejs-webservice

Project Rubric: https://review.udacity.com/#!/rubrics/1707/view


### Get block by `height`

`GET /api/block/:index`

This API end point will return the block where height = index.

Sample response
**Request** `GET /api/block/1`

**Response**
```
{
  "hash": "f9ded3223925c274f3ab3009b26d26c4f45a7d81a5b384f868a0cd6e323b84f7",
  "height": 1,
  "body": "Test Data #1",
  "time": "1545641747"
}
```

### Create a block

`POST /api/block`

Create a block on the chain using this API. 

Sample response
**Request** `POST /api/block`

**Body**
```
{
    "body" : "my Nth block"
}
```

`Note: 'body' is a required property when sending data to the API`