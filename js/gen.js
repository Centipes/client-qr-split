var clientsNum = 4;
var commonAmount = 0;
var iconsArray = ['man-1.png', 'man-2.png', 'man-3.png', 'man-4.png', 'man-5.png', 'woman-1.png', 'woman-2.png', 'woman-3.png', 'woman-4.png', 'woman-5.png'];
var namesArray = ['Вася', 'Миша', 'Денис', 'Миша', 'Андрей', 'Маша', 'Света', 'Рита', 'Вика', 'Аня'];
var statusesPaymentArray = [true, false];
var colorsArray = ['#F7C5BF', '#DAD0FC', '#C2FBC4', '#FBC2EB'];
var orderNamesArray = ['Eда', 'Напиток'];
var orderPricesArray = [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200];
var orderCountsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var response = {};

function getRundomInt(max){
    return Math.floor(Math.random() * max);
}


for(var i = 0; i < clientsNum; i++){
    response[i] = {};
    var randomOrderCounts = getRundomInt(5)+1;
    var clientAmount = 0;

    response[i]['name'] = namesArray[getRundomInt(iconsArray.length)];
    response[i]['icon'] = iconsArray[getRundomInt(namesArray.length)];
    response[i]['status'] = statusesPaymentArray[getRundomInt(statusesPaymentArray.length)];
    response[i]['color'] = colorsArray[getRundomInt(colorsArray.length)];
    response[i]['order_details'] = {};

    for (var j=0; j<randomOrderCounts; j++){
        response[i]['order_details'][j] = {};
        var orderCount = orderCountsArray[getRundomInt(orderCountsArray.length)];
        var orderPrice = orderPricesArray[getRundomInt(orderPricesArray.length)];
        response[i]['order_details'][j]['name'] = orderNamesArray[getRundomInt(orderNamesArray.length)];
        response[i]['order_details'][j]['count'] = orderCount;
        response[i]['order_details'][j]['price'] = orderPrice;
        response[i]['order_details'][j]['amount'] = orderPrice*orderCount;
        clientAmount += orderPrice*orderCount;
    }
    response[i]['amount'] = clientAmount;
    commonAmount += clientAmount;

}


export { clientsNum, commonAmount, response };
