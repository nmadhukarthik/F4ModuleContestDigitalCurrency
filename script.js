let cryptoData = []
const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`


// fetch using .then

fetch(url)
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(e => console.log(e))

// fetch using async await

async function fetchdata()
{
    try {
        let response = await fetch(url)
        cryptoData = await response.json()
        console.log(cryptoData)
        renderData(cryptoData)   
    } catch (error) {
        console.log(error)
    }
}

fetchdata()

// Display data on ui

function renderData(data)
{
    const tableBody = document.getElementById("display");
    tableBody.innerHTML = "";
    data.forEach((item) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>
                <div class = "item-info">
                    <img src="${item.image}" alt="logo" width="50px" height="50px"/>
                    <p>${item.name}</p>                        
                </div>
            </td>
            <td>${item.id}</td>
            <td>${item.symbol}</td>
            <td> $ ${item.current_price}</td>
            <td>${item.total_volume}</td>
            <td style="color:${item.price_change_percentage_24h.toFixed(2) < 0 ? 'red' : 'green' };">${item.price_change_percentage_24h.toFixed(2)} %</td>
            <td> $ ${item.market_cap}</td>
        `
    });
}



// input filter
function filterTable()
{
    const input = document.getElementById("searchInput").value.toUpperCase()
    const filteredData = cryptoData.filter(item => item.name.toUpperCase().includes(input) || item.symbol.toUpperCase().includes(input))
    renderData(filteredData)
}


//sort by percentage

function sortByPercentage()
{
    const sortedData = cryptoData.sort((a,b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    renderData(sortedData)
}


// sort by mktcap
function sortByMktCap()
{
    const sortedData = cryptoData.sort((a,b) => a.market_cap - b.market_cap)
    renderData(sortedData)
}