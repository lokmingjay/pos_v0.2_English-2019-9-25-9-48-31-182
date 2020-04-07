'use strict';

function printReceipt(inputs) {

  let itemDetailList = decodeItems(inputs)
  let subTotalList = getSubTotalList(itemDetailList)
  let totalPrice = getTotalPrice(subTotalList)

  console.log(ReceiptFormatter(subTotalList, totalPrice))
}

function decodeItems(inputs) {
  let itemCountList = getItemCount(inputs)
  let itemDetailList = getItemDetailList(itemCountList)
  return itemDetailList
}

function ReceiptFormatter(subTotalList, totalPrice) {
  let head = ""
  let content = ""
  let summary = ""
  head += "***<store earning no money>Receipt ***\n"
  for (let item in subTotalList) {
    let quan = subTotalList[item]['count']
    let name = subTotalList[item]['name']
    let unit = ""
    if (subTotalList[item]['count'] > 1) {
      unit = subTotalList[item]['unit'] + "s"
    }
    else {
      unit = subTotalList[item]['unit']
    }
    let price = Number(subTotalList[item]['price']).toFixed(2)
    let subtotal = subTotalList[item]['subtotal']
    content += "Name：" + name + "，Quantity：" + quan + " " + unit + "，Unit：" + price + " (yuan)，Subtotal：" + subtotal + " (yuan)\n"

  }
  summary += "----------------------\n"
  summary += "总计：" + totalPrice + " (yuan)\n"
  summary += "**********************"

  return head + content + summary
}

function getTotalPrice(subTotalList) {
  let sum = 0
  subTotalList.forEach(element => {
    sum += Number(element['subtotal'])
  })
  sum = sum.toFixed(2)
  return sum
}

function getSubTotalList(itemDetailList) {
  for (let item in itemDetailList) {
    // assign to the variable
    itemDetailList[item]['subtotal'] = itemDetailList[item]['count'] * itemDetailList[item]['price']
    itemDetailList[item]['subtotal'] = Number(itemDetailList[item]['subtotal']).toFixed(2)
  }
  return itemDetailList
}

function getItemCount(inputs) {
  let itemCountList = {}
  for (let key in inputs) {
    itemCountList[inputs[key]] = (itemCountList[inputs[key]] || 0) + 1
  }


  return itemCountList
}

function getItemDetailList(itemCountList) {

  let dbDetailList = loadAllItems()
  let itemDetailList = []

  for (let key in itemCountList) {
    for (let item in dbDetailList) {
      if (key == dbDetailList[item]['barcode']) {
        dbDetailList[item]['count'] = itemCountList[key]
        itemDetailList.push(dbDetailList[item])
      }
    }
  }
  return itemDetailList
}
