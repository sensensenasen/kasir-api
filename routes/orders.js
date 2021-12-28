var express = require("express");
var router = express.Router();
const { Orders, OrderDetails, User, Products, TransactionHistory } = require("../models");
const { Op } = require("sequelize");

/* NEW ORDER */
/* http://localhost:3001/orders */
router.post("/", async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.description = 'Endpoint to add new orders'
  var { orderItems, customerid, status, transactionAmount } = req.body;

  var code = await getOrderCode();

  var orderObj = {
    status: status,
    orderCode: code,
    transactionAmount: transactionAmount,
    customerId: customerid,
  };

  const order = await Orders.create(orderObj);

  // save order items
  orderItems.forEach((item) => {
    var obj = {
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      priceEach: item.priceEach,
    };
    OrderDetails.create(obj);
  });

  let result = await getOrderbyId(order.id);
  res.status(200).json(result);
});

/* GET ALL ORDER */
/* http://localhost:3001/orders */
router.get("/all", async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.description = 'Endpoint to get all orders'
  let orders = await Orders.findAll();
  
  res.status(200).json(orders);
});

/* GET ORDER */
/* http://localhost:3001/orders/id/4 */
router.get("/id/:id", async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.description = 'Endpoint to get orders'
  const { id } = req.params;
  const result = await getOrderbyId(id);

  res.status(200).json(result);
});

/* UPDATE ORDER */
/* http://localhost:3001/orders/id/4 */
router.put("/id/:id", async (req, res) => {
    // #swagger.tags = ['Orders']
    // #swagger.description = 'Endpoint to update orders'
    const { id } = req.params;
    let order = await Orders.findByPk(id);
    if (!order) {
        return res.status(400).json({ message: "id order not found" });
    }

    const updOrder = await order.update(req.body);
    const result = await getOrderbyId(updOrder.id);
  
    res.status(200).json(result);
  });

  /* BAYAR ORDER */
/* http://localhost:3001/orders/id/4 */
router.put("/bayar/:id", async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.description = 'Endpoint to bayar orders'
  const { id } = req.params;
  let order = await Orders.findByPk(id);
  if (!order) {
      return res.status(400).json({ message: "id order not found" });
  }

  const updOrder = await order.update(req.body);

  await updateSaldo(updOrder.customerId, updOrder.transactionAmount);

  const result = await getOrderbyId(updOrder.id);

  res.status(200).json(result);
});

function pad(n, length) {
  var len = length - ("" + n).length;
  return (len > 0 ? new Array(++len).join("0") : "") + n;
}

async function getOrderCode() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  var yyymmdd = `${yyyy}${mm}${dd}`;

  const extOrder = await Orders.findAll({
    where: {
      orderCode: {
        [Op.like]: `${yyymmdd}%`,
      },
    },
  });

  var seq = 1;
  if (extOrder) {
    seq = extOrder.length + 1;
  }
  var strSeq = pad(seq, 4);
  return `${yyymmdd}-${strSeq}`;
}

async function getOrderbyId(id) {
  const order = await Orders.findByPk(id);
  if (!order) {
    return res.status(400).json({ message: "id order not found" });
  }
  const orderDetails = await getOrderDetails(id);
  const customerDetails = await getUserDetails(order.customerId);

  let result = {
    id: order.id,
    status: order.status,
    orderCode: order.orderCode,
    transactionAmount: order.transactionAmount,
    orderDate: order.orderDate,
    customer: customerDetails,
    items: orderDetails,
  };
  return result;
}

async function getAllOrder() {
  let results = [];
  let orders = await Orders.findAll();
  orders.forEach(async (item, index) => {
    const prod = await getOrderbyId(item.id);
    var res = {};
    res = prod;
    results.push(res);
  });
  return results;
}

async function getOrderDetails(orderid) {
  let results = [];
  let od = await OrderDetails.findAll({
    where: {
      orderId: orderid,
    },
  });
  od.forEach(async (item, index) => {
    const prod = await Products.findByPk(item.productId);
    var items = {};
    items.id = item.id;
    items.productId = item.productId;
    items.quantity = item.quantity;
    items.priceEach = item.priceEach;
    items.productName = prod.productName;
    items.productVendor = prod.productVendor;
    items.productCode = prod.productCode;
    items.productImage = prod.productImage;
    results.push(items);
  });
  return results;
}

async function getUserDetails(custid) {
  let user = await User.findOne({
    where: {
      id: custid,
    },
  });
  return user;
}

async function updateSaldo(custid, amount) {
  let user = await User.findByPk(custid);
  if (!user) {
    return res.status(400).json({ message: "id user not found" });
  }
  
  var trObj = {
    userId: custid,
    amount: amount,
    type: "OUT"
  }
  const trHistory = await TransactionHistory.create(trObj)
  const saldoplustopup = parseInt(user.saldo) - parseInt(amount)
  var usrObj = {
    saldo: saldoplustopup
  }

  const updUser = await user.update(usrObj);

  const result = {
    user: updUser,
    trHistory: trHistory
  }

  return result
}

module.exports = router;
