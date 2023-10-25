let ordersPanel = document.getElementById("orders");
let commonAmountText = document.getElementById("amount");

function getCookie(name) {
    const cookieValue = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith(`${name}=`)).split('=')[1]);
    const complexData = JSON.parse(cookieValue);
    return complexData;
}

let indexArrayString = getCookie('data');
let indexArray = [];
let commonAmount = 0;

for (var index in indexArrayString){

    let divClientListOrder = document.createElement('div');

    let divRowCardHeaderOrder = document.createElement('div');
    divRowCardHeaderOrder.className = "row justify-content-between mt-amount";

    let divColCardClient = document.createElement('div');
    divColCardClient.className = "col-auto";

    let divRowInfoClient =  document.createElement('div');
    divRowInfoClient.className = "row";

    let divColIconClient =  document.createElement('div');
    divColIconClient.className = "col-auto align-self-center";

    let spanIconClient = document.createElement('span');
    spanIconClient.className = "circle-img circle-border-color";
    spanIconClient.innerHTML = `<img src="./${indexArrayString[index]['icon']}"/>`

    let divColInfoClient = document.createElement('div');
    divColInfoClient.className = "col-auto align-self-end";
    divColInfoClient.innerHTML = `<h3 class='client-name-amount'>${indexArrayString[index]['name']}</h3><h3 class='text-12'>Детали заказа:</h3>`;
    
    let divColRemoveClient = document.createElement('div');
    divColRemoveClient.className = "col-auto align-self-center";
    
    let removeButton = document.createElement('button');
    removeButton.className = 'btn-close';
    removeButton.setAttribute('type', 'button');
    removeButton.innerHTML = "<img src='./крестик.svg'></img>";

    let divOrderDetails = document.createElement('div');
    divOrderDetails.className = "order-details pb-amount";
    
    let orderList = indexArrayString[index]['order_details'];
    
    divColIconClient.append(spanIconClient);
    divRowInfoClient.append(divColIconClient);
    divRowInfoClient.append(divColInfoClient);

    divColCardClient.append(divRowInfoClient);
    divColRemoveClient.append(removeButton);

    divRowCardHeaderOrder.append(divColCardClient);
    divRowCardHeaderOrder.append(divColRemoveClient);
    divClientListOrder.append(divRowCardHeaderOrder);

    (function(idx) {
    removeButton.addEventListener('click', function(e){
        ordersPanel.removeChild(divClientListOrder);
        delete indexArrayString[idx];
        commonAmount = Object.values(indexArrayString).reduce((acc, curr) => acc + (curr.amount || 0), 0);
        commonAmountText.innerText = `${commonAmount}₽`;
    })})(index);

    for (let j=0; j<Object.keys(orderList).length; j++){
        let divRowPanelOrder = document.createElement('div');
        divRowPanelOrder.className = "row justify-content-between panel-order";

        let divColOrderInfo = document.createElement('div');
        divColOrderInfo.className = "col-auto align-self-center";

        let hOrderName = document.createElement('h3');
        hOrderName.className = "text-12 black-color";
        hOrderName.innerText = `${orderList[j]['name']}`;

        let divRowOrderPriceCount = document.createElement('div');
        divRowOrderPriceCount.className = "row";

        let divColOrderPrice = document.createElement('div');
        divColOrderPrice.className = "col-auto";
        divColOrderPrice.innerHTML = `<h3 class='text-12 mr-amount'>${orderList[j]['price']}₽</h3>`;

        let divColOrderCount = document.createElement('div');
        divColOrderCount.className = "col-auto";
        divColOrderCount.innerHTML = `<h3 class='text-12'>x${orderList[j]['count']}</h3>`;

        let divColOrderAmount = document.createElement('div');
        divColOrderAmount.className = "col-auto align-self-center";
        divColOrderAmount.innerHTML = `<h3 class='text-12 black-color'>${orderList[j]['amount']}₽</h3>`;

        divRowOrderPriceCount.append(divColOrderPrice);
        divRowOrderPriceCount.append(divColOrderCount);
        divColOrderInfo.append(hOrderName);
        divColOrderInfo.append(divRowOrderPriceCount);

        divRowPanelOrder.append(divColOrderInfo);
        divRowPanelOrder.append(divColOrderAmount);
        divOrderDetails.append(divRowPanelOrder);
    }

    divClientListOrder.append(divOrderDetails);
    ordersPanel.append(divClientListOrder);

    commonAmount += indexArrayString[index]['amount']; 
   
}

commonAmountText.innerText = `${commonAmount}₽`;
