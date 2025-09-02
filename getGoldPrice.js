export function getGoldPrice() {
    const randomGoldprice = Math.round(Math.random() * (4000 - 3000) + 3000)
    return randomGoldprice
}