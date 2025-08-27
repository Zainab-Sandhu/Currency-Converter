const Base_URL="https://v6.exchangerate-api.com/v6/f0641f08714a700582ad1c3a/pair";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".From select");
const ToCurr=document.querySelector(".To select");
const msg=document.querySelector(".msg")
for(let select of dropdowns)
{
for(let currCode in countryList)
    {
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode==="USD")
    {
        newOption.selected=true;
    }
    else if(select.name==="To" && currCode==="PKR"){
        newOption.selected=true;

    }
    select.append(newOption);
    select.addEventListener("change",(evt)=>{
       updateFlag(evt.target);
    })
}
}
const updateFlag=(Element)=>
{
    let currCode=Element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=Element.parentElement.querySelector("img");
    img.src=newSrc;
}
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal=1;
        amount.value=1;
    }
    console.log(fromCurr,ToCurr)
   const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}`;
   let response=await fetch(URL);
   let data=await response.json();
   let rate=data.conversion_rate;
   let finalAmount=rate*amtVal;
   msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${ToCurr.value}`
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load",()=>{
    updateExchangeRate();
    
})