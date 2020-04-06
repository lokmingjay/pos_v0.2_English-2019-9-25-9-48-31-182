'use strict';

function printReceipt(inputs) {

  let itemDetailList = decodeItem(inputs)
  let subTotalList = getSubTotalList(itemDetailList)
  let totalPrice = getTotalPrice(subTotalList)

  console.log(ReceiptFormatter(subTotalList, totalPrice))
}

function decodeItem(inputs) {
  let itemCountList = getItemCount(inputs)
  let itemDetailList = getItemDetailList(itemCountList)
  return itemDetailList
}

function ReceiptFormatter(subTotalList, totalPrice) {
  let content = ""
  content += "***<store earning no money>Receipt ***\n"
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
  content += "----------------------\n"
  content += "总计：" + totalPrice + " (yuan)\n"
  content += "**********************"


  return content
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

  for (let key in itemCountList) {
    // console.log( key + "  " + itemCountList[key] )
  }
  return itemCountList
}

function getItemDetailList(itemCountList) {

  let DbDetailList = loadAllItems()
  let itemDetailList = []
  for (let key in itemCountList) {
    // if(DbDetailList)
    for (let item in DbDetailList) {
      if (key == DbDetailList[item]['barcode']) {
        DbDetailList[item]['count'] = itemCountList[key]
        itemDetailList.push(DbDetailList[item])

      }

    }

  }


  return itemDetailList
}
