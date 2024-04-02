// Get UI 
const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form');

const getopenbtn = document.getElementById('open-btn');

const gettranstatuses = document.querySelectorAll('.form-check-input');
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const gethistroybox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');



// const dummydatas = [
//     {id:1,transtatus:'+',remark:'Petty Cash',amount:1000,date:"2024-04-10"},
//     {id:2,transtatus:'-',remark:'Pen',amount:-20,date:"2024-04-21"},
//     {id:3,transtatus:'+',remark:'Other Icome',amount:300,date:"2024-04-25"},
//     {id:4,transtatus:'-',remark:'Book',amount:-10,date:"2024-04-25"},
//     {id:5,transtatus:'-',remark:'Water',amount:-150,date:"2024-04-25"},
//     {id:6,transtatus:'-',remark:'Teamax',amount:-100,date:"2024-04-25"},
// ]
// console.log(dummydatas);


const getlsdatas = JSON.parse(localStorage.getItem('transactions'));
let gethistories = localStorage.getItem('transactions') !== null ? getlsdatas : [];


// Initial app 
function init(){
    getlistgroup.innerHTML = '';

// Method 1
    // dummydatas.forEach(function(dummydata){
    //     // console.log(dummydata);
    //     addtoul(dummydata);
    // });

// Method 2
    // dummydatas.forEach(dummydata=>addtoul(dummydata));

// Method 3 ************
    // dummydatas.forEach(addtoul);
    gethistories.forEach(addtoul);

    totalvalue();

}
init();

// Create li to ul 
function addtoul(transaction){
    // console.log(transaction);
    // console.log(transaction.amount , typeof transaction.amount);

    const newli = document.createElement('li');
    // console.log(newli);
    newli.innerHTML = `
    ${transaction.remark} <span>${transaction.transtatus}${Math.abs(transaction.amount)}</span> <span>${transaction.date}</span> <button type="button" class="delete-btn" onclick="removetransaction(${transaction.id})">&times;</button> 
    `;

    newli.className = "list-group-item";
    newli.classList.add(transaction.transtatus === "+" ? "inc" : "dec");

    getlistgroup.appendChild(newli);
}

var sign = '-';
gettranstatuses.forEach(function(gettranstatus){
    gettranstatus.addEventListener('change',function(){
        // console.log(this.value);
        if(this.value === "debit"){
            sign = "+";
        }else if(this.value === "credit"){
            sign = "-";
        }
    });
});

function newtransaction(e){
    // console.log('hey');
    // console.log(sign);
    if(isNaN(getamount.value) || getamount.value.trim() === "" || getdate.value.trim() === "" || getremark.value.trim() === ""){
        window.alert("Oh!! Some data are missing!");
    }else{
        const transaction = {
            id : generateidx(),
            transtatus : sign ,
            amount : sign === "-" ? Number(-getamount.value) : Number(getamount.value),
            date : getdate.value,
            remark : getremark.value
        };

        // console.log(transaction);
        gethistories.push(transaction);
        addtoul(transaction);
        totalvalue();
        updatelocalstorage();

        getamount.value = '';
        getdate.value = '';
        getremark.value = '';

        getamount.focus();
        
    }

    
    e.preventDefault();
}


// Update Local Storage 
function updatelocalstorage(){
    localStorage.setItem("transactions",JSON.stringify(gethistories));
}

function generateidx(){
    return Math.floor(Math.random() * 100000);
}

function totalvalue(){
    const amounts = gethistories.map(gethistory=>gethistory.amount);
    // console.log(amounts);


// Method 1
    // const totalresult = amounts.reduce(function(total,curvalue){
    //     total += curvalue;
    //     return total;
    // },0).toFixed(2);

// Method 2
    const totalresult = amounts.reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
    const totaldebit = amounts.filter(amount=> amount > 0).reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
    const totalcredit = (amounts.filter(amount=> amount < 0).reduce((total,curvalue)=>(total += curvalue),0) * -1).toFixed(2);

    balance.innerText = `${totalresult}`;
    moneydeb.textContent = `${totaldebit}`;
    moneycrd.textContent = `${totalcredit}`;

    // console.log(totalresult);
    // console.log(totaldebit);
    // console.log(totalcredit);
}

// totalvalue();


function removetransaction(tranid){
    gethistories = gethistories.filter(gethistory => gethistory.id !== tranid);
    init();

    updatelocalstorage();
}


getopenbtn.addEventListener('click',function(){
    gethistroybox.classList.toggle('show');
});

getform.addEventListener('submit',newtransaction);












// var myarrs = [10,20,30,40,50,60,70,80,90,-100];

// // Array.reduce(function(total,currentValue,currentIdx,array){},initialValue);
// var result = myarrs.reduce(function(total,curvalue,curidx,arr){
//     // console.log('this is total value = ',total);
//     // console.log('this is current value = ',curvalue);
//     // console.log('this is current index = ',curidx);
//     // console.log('this is array = ',arr);

//     total += curvalue;
//     return total;
// },0);

// console.log(result); //350

