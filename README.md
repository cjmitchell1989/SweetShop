SweetShop

POST request body:
{
  pack_sizes: int[]
  order_suantity: int
}
Response body:
{
  [packSize: quantity,
  [packSize]: quantity,
  ...,
  [packSize]: quantity
}