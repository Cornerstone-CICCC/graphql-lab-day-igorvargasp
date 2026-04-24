import * as productController from '../controllers/product.controller'
import * as customerController from '../controllers/customer.controller'
import * as orderController from '../controllers/order.controller'
import { Order } from '../models/order.model'

export const resolvers = {
  Query: {
    products: () => productController.getProducts(),
    customers: () => customerController.getCustomers(),
    orders: () => orderController.getOrders(),
    getProductById: (_: any, args: { id: string }) => productController.getProductById(args.id),
    getCustomerById: (_: any, args: { id: string }) => customerController.getCustomerById(args.id),
  },
  Product: {
    customers: async (parent: any) => {
      const orders = await Order.find({ productId: parent.id })
      const customerIds = orders.map((order: any) => order.customerId)
      return Promise.all(customerIds.map((id: any) => customerController.getCustomerById(id)))
    }
  },
  Customer: {
    products: async (parent: any) => {
      const orders = await Order.find({ customerId: parent.id })
      const productIds = orders.map((order: any) => order.productId)
      return Promise.all(productIds.map((id: any) => productController.getProductById(id)))
    }
  },
  Order: {
    product: (parent: any) => productController.getProductById(parent.productId),
    customer: (parent: any) => customerController.getCustomerById(parent.customerId)
  },
  Mutation: {
    addProduct: (_: any, args: { productName: string; productPrice: number }) =>
      productController.createProduct(args),
    editProduct: (_: any, args: { id: string; productName: string; productPrice: number }) =>
      productController.updateProduct(args.id, { productName: args.productName, productPrice: args.productPrice }),
    removeProduct: (_: any, args: { id: string }) =>
      productController.deleteProduct(args.id),

    addCustomer: (_: any, args: { firstName: string; lastName: string; email: string }) =>
      customerController.createCustomer(args),
    editCustomer: (_: any, args: { id: string; firstName: string; lastName: string; email: string }) =>
      customerController.updateCustomer(args.id, { firstName: args.firstName, lastName: args.lastName, email: args.email }),
    removeCustomer: (_: any, args: { id: string }) =>
      customerController.deleteCustomer(args.id),

    addOrder: (_: any, args: { productId: string; customerId: string }) =>
      orderController.createOrder(args.productId, args.customerId),
    editOrder: (_: any, args: { id: string; productId: string; customerId: string }) =>
      orderController.updateOrder(args.id, { productId: args.productId, customerId: args.customerId }),
    removeOrder: (_: any, args: { id: string }) =>
      orderController.deleteOrder(args.id)
  }
}
