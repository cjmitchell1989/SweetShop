SweetShop

POST request body:
{
  pack_sizes: int[]
  order_suantity: int
}
Response body:
{
  [packSize[0]]: quantity,
  [packSize[1]]: quantity,
  ...,
  [packSize[n]]: quantity
}