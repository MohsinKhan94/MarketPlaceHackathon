import { type SchemaTypeDefinition } from 'sanity'
import cart from '../schemas/cart'
import checkout from '../schemas/checkout'
import navigation from '../schemas/navigation'
import page from '../schemas/page'
import product from '../schemas/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cart,checkout,navigation,page,product,],
}
