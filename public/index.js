const eventSource = new EventSource('/goldPrice')
const connectionStatus = document.getElementById('connection-status')
const displaynewPrice = document.getElementById('price-display')
const investmentAmount = document.getElementById('investment-amount')
const investBtn = document.getElementById('invest-btn')
const form = document.getElementById('invest-form')
const dialog = document.querySelector('dialog')
const investmentSummary=document.getElementById('investment-summary')
const modalBtn=document.getElementById('modal-btn')
let currentPrice = 0
 modalBtn.addEventListener('click', () => {
                dialog.close()
 })
eventSource.onclose = () => {
    connectionStatus.textContent = 'disconnected from server 🔴'
    displaynewPrice.textContent='Try again...⚠'
}
eventSource.onopen= () => {
  connectionStatus.textContent='Live Prices from server 🟢'  
}
eventSource.onmessage = (event) => {
    const liveGoldData = JSON.parse(event.data)
    const newPrice = liveGoldData.price
    currentPrice=newPrice
    displaynewPrice.textContent=`$ ${newPrice} / Oz*`
}
eventSource.onerror = () => {
    connectionStatus.textContent = 'Server Disconnected 🔴'
      displaynewPrice.textContent='----'
}
form.addEventListener('submit',async (e) => {
e.preventDefault()
    const formData = new FormData(form)
    const dataObj = Object.fromEntries(formData)
    const ouncesOwned=(Number(dataObj['investment-amount'])/Number(currentPrice)).toFixed(3)
    const userInvestment = {
        amount: dataObj['investment-amount'],
        goldRate: currentPrice,
        ouncesOwned,
        date:new Date().toDateString()
    }
    if (currentPrice <= 0) {
    alert('Wait for price data')
    return
    }
    if (!dataObj['investment-amount'] || dataObj['investment-amount'] <= 0) {
        alert('Enter valid amount')
        return
    }
    
    try {
      const res=await fetch('/submit',
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(userInvestment)
    }
    ) 
        const ans = await res.json()
        if (ans.success) {
            investmentSummary.textContent=`You just bought ${ouncesOwned} ounces (ozt) for $${currentPrice}. \n You will receive documentation shortly.`
            dialog.showModal()
            form.reset()
            
             document.getElementById('pdflink').innerHTML = `
            <a href="/download">Download Invoice</a>`
           console.log('form submitted',ans); 
           
        }
        else {
     
    console.error('Investment failed:', ans.message)
    alert('Investment failed: ' + ans.message)
}
           
    }
    catch (error) {
        console.log(error);
    }

})


