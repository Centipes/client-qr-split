import * as gen from './gen.js';

document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

let elem = document.getElementById("row-clients-icons");
let cardSplitClients = document.getElementById("card-split");
let splitPaymentButton = document.getElementById("split-payment-button");
let commonPaymentButton = document.getElementById("common-payment-button");
let hCommonAmount = document.getElementById("common-amount");

splitPaymentButton.setAttribute('disabled', 'true');

const indexesSortedStatusPaymentArray = Object.keys(gen.response);
indexesSortedStatusPaymentArray.sort((a, b) => gen.response[a]['status'] - gen.response[b]['status']);

let residualAmount = gen.commonAmount;
let selectedСlients = {};
let response = { ...gen.response};

function clientsIconsHeader(idx, clientIdx){
    let span = document.createElement('span');
    span.className = "circle-img";
    span.innerHTML = `<img src="../src/img/${gen.response[clientIdx]['icon']}"/>`;
    if (idx>0){
        span.style.transform=`translate(-${idx*22}px, 0px)`;
    }
    span.style.zIndex=`${gen.clientsNum-idx}`;
    elem.append(span);
}

function remainingClientsNumber(idx){
    let span = document.createElement('span');
    let divClientCount = document.createElement('div');
    let hClientsCount = document.createElement('h3');
    
    span.className = "circle-img shift-img";
    span.style.transform=`translate(-${idx*14}px, 0px)`;
    
    hClientsCount.className = 'client-name-amount';
    hClientsCount.innerText = `+${gen.clientsNum-3}`;
    hClientsCount.style.color = "#000";
    hClientsCount.style.textAlign = "right";

    divClientCount.append(hClientsCount);
    span.append(divClientCount);
    elem.append(span);
}

for(let i = 0; i < gen.clientsNum; i++){
    let index = indexesSortedStatusPaymentArray[i];

    if(i < 3)
       clientsIconsHeader(i, index);

    if(i == 3)
        remainingClientsNumber(i);


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
    spanClientIcon.innerHTML = `<img src="../src/img/${gen.response[index]['icon']}"/>`;

    let divColClientName = document.createElement('div');
    divColClientName.className = "col-auto align-self-center";

    let pClientName = document.createElement('h3');
    pClientName.className = "client-name-amount";
    pClientName.innerText = `${gen.response[index]['name']}`;

    let divColClientAmount = document.createElement('div');
    divColClientAmount.className = "col-auto align-self-center";

    let pClientAmount = document.createElement('h3');
    pClientAmount.className = "client-name-amount mr-amount";
    pClientAmount.innerText = `${gen.response[index]['amount']}₽`;

    divColClientAmount.append(pClientAmount);
    divColClientName.append(pClientName);
    divColClientIcon.append(spanClientIcon);

    divRowInfoClient.append(divColClientIcon);
    divRowInfoClient.append(divColClientName);

    divColClient.append(divRowInfoClient);

    divRowCard.append(divColClient);
    divRowCard.append(divColClientAmount);
    
    divCardClientAmount.append(divRowCard);
    cardSplitClients.append(divCardClientAmount);

    if(gen.response[index]['status']){
        divCardClientAmount.classList.add('disabled');
        // divCardClientAmount.setAttribute('disabled', 'true');
        residualAmount -= gen.response[index]['amount'];
        delete response[index];
    }
    

    (function(index) {
        divCardClientAmount.addEventListener('click', function(e){
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

export { residualAmount, response };