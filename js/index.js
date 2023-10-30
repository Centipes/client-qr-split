import * as gen from './gen.js';

document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

const clientIconsPanel = document.getElementById("row-clients-icons");
const cardSplitClients = document.getElementById("card-split");
const splitPaymentButton = document.getElementById("split-payment-button");
const commonPaymentButton = document.getElementById("common-payment-button");
const hCommonAmount = document.getElementById("common-amount");
const bottomPanel = document.getElementById("bottom-panel");
const darkBackground = document.getElementById("dark-background");
const splitBlock = document.getElementById("split-block");
const stickyElement = document.getElementById('sticky-header');

splitPaymentButton.setAttribute('disabled', 'true');

const indexesSortedStatusPaymentArray = Object.keys(gen.response);
indexesSortedStatusPaymentArray.sort((a, b) => gen.response[a]['status'] - gen.response[b]['status']);

let residualAmount = gen.commonAmount;
let selectedСlients = {};
let response = { ...gen.response};
let firstPayingClientIdx = gen.clientsNum;
let firstIconPosition = null;

function clientsIconsHeader(idx, clientIdx){
    let span = document.createElement('span');
    span.className = "circle-img";
    span.innerHTML = `<img src="./src/img/${gen.response[clientIdx]['icon']}"/>`;
    if (idx>0){
        span.classList.add(`shift-img-${idx}`);
    }
    span.style.zIndex=`${gen.clientsNum-idx}`;
    clientIconsPanel.append(span);
    firstIconPosition = span;
}

function setRemainingClientsNumber(idx){
    let span = document.createElement('span');
    let divClientCount = document.createElement('div');
    let hClientsCount = document.createElement('h3');
    
    span.className = "circle-img shift-txt";
    
    hClientsCount.className = 'client-name-amount';
    hClientsCount.innerText = `+${idx}`;
    hClientsCount.style.color = "#000";
    hClientsCount.style.textAlign = "right";

    divClientCount.append(hClientsCount);
    span.append(divClientCount);
    clientIconsPanel.append(span);
}

function closeBottomPanel(){
    bottomPanel.innerHTML = "";
    darkBackground.classList.remove('active');
    bottomPanel.classList.remove('active');
}

function openBottomPanel(divOrderDetails, divClientListOrder){
    bottomPanel.append(divClientListOrder);
    darkBackground.classList.add('active');
    divOrderDetails.classList.add('active');
    bottomPanel.classList.add('active');
}

if(gen.clientsNum > 1){
    splitBlock.style.display = "block";
}

for(let i = 0; i < gen.clientsNum; i++){
    let index = indexesSortedStatusPaymentArray[i];

    let divCardClientAmount = document.createElement('div');
    divCardClientAmount.className = "btn card-client-amount";
    divCardClientAmount.setAttribute('active', 'false');

    let divRowCard = document.createElement('div');
    divRowCard.className = "row p-card justify-content-between";

    let divColClient = document.createElement('div');
    divColClient.className = "col-auto";

    let divRowInfoClient = document.createElement('div');
    divRowInfoClient.className = "row";

    let divColClientIcon = document.createElement('div');
    divColClientIcon.className = "col-auto align-self-center";

    let spanClientIcon = document.createElement('span');
    spanClientIcon.className = "circle-img circle-border-color";
    spanClientIcon.style.borderColor = `${gen.response[index]['color']}`;
    spanClientIcon.innerHTML = `<img src="./src/img/${gen.response[index]['icon']}"/>`;

    let divColClientName = document.createElement('div');
    divColClientName.className = "col-auto align-self-center";

    let pClientName = document.createElement('h3');
    pClientName.className = "client-name-amount";
    pClientName.innerText = `${gen.response[index]['name']}`;

    let divColClientAmountDetails = document.createElement('div');
    divColClientAmountDetails.className = "col-auto align-self-center";

    let divRowClientAmountDetails = document.createElement('div');
    divRowClientAmountDetails.className = "row";

    let divColClientAmount = document.createElement('div');
    divColClientAmount.className = "col-auto align-self-center";

    let pClientAmount = document.createElement('h3');
    pClientAmount.className = "client-name-amount mr-amount";
    pClientAmount.innerText = `${gen.response[index]['amount']}₽`;

    let divColButtonDetails = document.createElement('div');
    divColButtonDetails.className = "col-auto align-self-center";

    let detailsButton = document.createElement('button');
    detailsButton.className = 'btn-details align-self-center';
    detailsButton.setAttribute('type', 'button');
    detailsButton.innerHTML = `<img class='icon-mark' src='./src/img/mark.svg'></img>`;

    let divClientListOrder = document.createElement('div');

    let divRowCardHeaderOrder = document.createElement('div');
    divRowCardHeaderOrder.className = "row justify-content-between mb-amount header-order-list mrl-order-list mt-order-list";

    let divColCardClient = document.createElement('div');
    divColCardClient.className = "col-auto";

    let divRowInfoClientDetails =  document.createElement('div');
    divRowInfoClientDetails.className = "row";

    let divColIconClient =  document.createElement('div');
    divColIconClient.className = "col-auto align-self-center";

    let spanIconClient = document.createElement('span');
    spanIconClient.className = "circle-img circle-border-color";
    spanIconClient.style.borderColor = `${gen.response[index]['color']}`;
    spanIconClient.innerHTML = `<img src="./src/img/${gen.response[index]['icon']}"/>`

    let divColInfoClient = document.createElement('div');
    divColInfoClient.className = "col-auto align-self-end";

    let divRowPaymentStatus = document.createElement('div');
    divRowPaymentStatus.className = "row";

    let divColPaymentIndicator = document.createElement('div');
    divColPaymentIndicator.className = "col-auto align-self-center";

    let divDot = document.createElement('div');
    divDot.className = "dot";
    divColPaymentIndicator.append(divDot);

    let divColPaymentText = document.createElement('div');
    divColPaymentText.className = "col-auto";
    divColPaymentText.innerHTML = `<h3 class='text-12'>Не оплачено</h3>`;

    let divColAmountCloseButton = document.createElement('div');
    divColAmountCloseButton.className = "col-auto align-self-center justify-content-end";

    let pClientAmountDetails = document.createElement('h3');
    pClientAmountDetails.className = "text-14";
    pClientAmountDetails.innerText = ` ${gen.response[index]['amount']}₽ • ${gen.response[index]['name']}`;

    let closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.setAttribute('type', 'button');
    closeButton.innerHTML = "<img src='./src/img/крестик.svg'></img>";

    let divOrderDetails = document.createElement('div');
    divOrderDetails.className = "order-details pb-amount scrollable-list pb-amount mrl-list";
    
    let orderList = gen.response[index]['order_details'];

    divColInfoClient.append(pClientAmountDetails);
    divRowPaymentStatus.append(divColPaymentIndicator);
    divRowPaymentStatus.append(divColPaymentText);
    divColInfoClient.append(divRowPaymentStatus);

    divColAmountCloseButton.append(closeButton);
   
    divColIconClient.append(spanIconClient);
    divRowInfoClientDetails.append(divColIconClient);
    divRowInfoClientDetails.append(divColInfoClient);

    divColCardClient.append(divRowInfoClientDetails);

    divRowCardHeaderOrder.append(divColCardClient);
    divRowCardHeaderOrder.append(divColAmountCloseButton);
    divClientListOrder.append(divRowCardHeaderOrder);

    closeButton.addEventListener('click', function(){
        closeBottomPanel();
    });

    for (let j=0; j<Object.keys(orderList).length; j++){
        let divRowPanelOrder = document.createElement('div');
        divRowPanelOrder.className = "row justify-content-between panel-order fixed-width";

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
        divColOrderAmount.className = "col-auto align-self-center pr-amount";
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

    divColButtonDetails.append(detailsButton);

    divRowClientAmountDetails.append(divColClientAmount);
    divRowClientAmountDetails.append(divColButtonDetails);
    divColClientAmountDetails.append(divRowClientAmountDetails);

    divColClientAmount.append(pClientAmount);
    divColClientName.append(pClientName);
    divColClientIcon.append(spanClientIcon);

    divRowInfoClient.append(divColClientIcon);
    divRowInfoClient.append(divColClientName);

    divColClient.append(divRowInfoClient);

    divRowCard.append(divColClient);
    divRowCard.append(divColClientAmountDetails);
    
    divCardClientAmount.append(divRowCard);
    cardSplitClients.append(divCardClientAmount);

    if(gen.response[index]['status']){
        divCardClientAmount.classList.add('disabled');
        if(firstPayingClientIdx == gen.clientsNum)
            firstPayingClientIdx = i;
        residualAmount -= gen.response[index]['amount'];
        divDot.style.backgroundColor = "#A8F0AD";
        divColPaymentText.innerHTML = `<h3 class='text-12'>Оплачено</h3>`;
        delete response[index];
    }

    else if(i < 3)
        clientsIconsHeader(i, index);

    divCardClientAmount.addEventListener('mousedown', function(e){
        divCardClientAmount.classList.add("card-client-amount-active");
    });

    divCardClientAmount.addEventListener('mouseup', function(e){
        divCardClientAmount.classList.remove("card-client-amount-active");    
    });

    detailsButton.addEventListener('mousedown', function(e){
        e.stopPropagation();
    });
    
    detailsButton.addEventListener('mouseup', function(e){
        e.stopPropagation();
    });

    detailsButton.addEventListener('click', function(e){
        openBottomPanel(divOrderDetails, divClientListOrder);
        e.stopPropagation();
    });

    (function(index) {
        divCardClientAmount.addEventListener('click', function(){
        divCardClientAmount.setAttribute('active', !(divCardClientAmount.getAttribute('active') === 'true'));
        if(divCardClientAmount.getAttribute('active') === 'true'){
            divCardClientAmount.classList.add('active');
            selectedСlients[index] = gen.response[index];
        }
        else{
            divCardClientAmount.classList.remove('active');
            delete selectedСlients[index];
        }
        if(Object.keys(selectedСlients).length > 0)
            splitPaymentButton.removeAttribute('disabled');
        else 
            splitPaymentButton.setAttribute('disabled', 'true');
        
    })})(index);

}

let remainingClientsNumber = firstPayingClientIdx - 3;
if(remainingClientsNumber > 0)
    setRemainingClientsNumber(remainingClientsNumber);

hCommonAmount.innerText = `${residualAmount}₽`;
splitPaymentButton.addEventListener('click', function() {
    const data = JSON.stringify(selectedСlients);
    document.cookie = `data=${encodeURIComponent(data)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    window.location.href = './payment.html';
});

commonPaymentButton.addEventListener('click', function() {
    const data = JSON.stringify(response);
    document.cookie = `data=${encodeURIComponent(data)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    window.location.href = './payment.html';
});

document.addEventListener('click', function(e) {
    const withinBoundaries = e.composedPath().includes(bottomPanel);
    if (!withinBoundaries){
        closeBottomPanel();
    }
});

if(stickyElement)
    window.addEventListener('scroll', () => {
    const rectSticky = stickyElement.getBoundingClientRect();
    const rectOther = cardSplitClients.getBoundingClientRect();
    
    if (rectSticky.bottom-0.5 > rectOther.top) {
        stickyElement.classList.add('active');
    } else {
        stickyElement.classList.remove('active');
    }
});

export { residualAmount, response };