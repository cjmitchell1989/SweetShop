# Simon's Sweet Shop

An API to return the best array of possible sweet pack sizes for a given order total, to minimise extra sweets delivered and minimise packs delivered

API will remove duplicate pack sizes and validate inputs meet requirements before calculating and returning an array of possible solutions
Solution will be in the form:
{
  [packSize]: quantity,
  ...
  [packSize]: quantity
}

### Request
POST request body:
{
  pack_sizes: int[]
  order_quantity: int
}
Response body:
[
  {
    [packSize]: quantity,
    [packSize]: quantity,
    ...,
    [packSize]: quantity
  }.
  {
    [packSize]: quantity,
    [packSize]: quantity,
    ...,
    [packSize]: quantity
  }
]

### To run
The best way to run locally is to run:
$ docker-compose up --build
Then make requests to local port 5000