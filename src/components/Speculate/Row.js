import React, {useRef, useState} from 'react'

const Row = ({name, avgBuyPrice=0, quantity=0, sellPrice=0, profitInit=0, profitPerShareInit=0, avgBuyStartInit=0, equityInit=0, retInit=0, shouldSellInit=false, updateStock, remove, updateTotal}) => {
    const buyRef = useRef()
    const sellRef = useRef()
    const quantityRef = useRef()
    const [profit, setProfit] = useState(profitInit)
    const [profitPerShare, setProfitPerShare] = useState(profitPerShareInit)
    const [avgBuyStart, setAvgBuyStart] = useState(avgBuyStartInit)
    const [equity, setEquity] = useState(equityInit)
    const [ret, setRet] = useState(retInit)
    const [shouldSell, setShouldSell] = useState(shouldSellInit)

    const calc = ()=> {
        const buyPrice = parseFloat(buyRef.current.value)
        const sellPrice = parseFloat(sellRef.current.value)
        const quantity = parseFloat(quantityRef.current.value)

        
        if(isNaN(sellPrice) || isNaN(buyPrice)){
            return
        }
        
        let profitPerShare = (sellPrice - buyPrice)
        let profit = profitPerShare * quantity
        let ret = (profitPerShare / buyPrice * 100)
        let equity = sellPrice * quantity 

        let avgBuyStart = buyPrice * quantity

        setProfit(profit.toFixed(2))
        setProfitPerShare(profitPerShare.toFixed(2))
        setRet(ret.toFixed(2))
        setEquity(equity.toFixed(2))
        setAvgBuyStart(avgBuyStart.toFixed(2))
        let shouldSell = false
        if(ret > 20)  {
            shouldSell = true
            setShouldSell(shouldSell)
        }

        updateTotal(profit)
        let stock = {"name": name, "avgBuyPrice":buyPrice, "quantity":quantity, "sellPrice": sellPrice, "profitInit":profit.toFixed(2), "profitPerShareInit":profitPerShare.toFixed(2), "avgBuyStartInit":avgBuyStart.toFixed(2), "equityInit":equity.toFixed(2), "retInit":ret.toFixed(2), "shouldSellInit":shouldSell}
        updateStock(stock)
    }

    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
            <span>$ </span><input ref={buyRef} type="text" onBlur={(e)=>calc()} placeholder="" defaultValue={avgBuyPrice}/>
            </td>
            <td>
                <input type="number" ref={quantityRef} onBlur={(e)=>calc()} min="0" max="10000" defaultValue={quantity}/>
            </td>
            <td>
            <span>$ </span><input type="text" ref={sellRef} onBlur={(e)=>calc()} placeholder="" defaultValue={sellPrice} />
            </td>
            <td>
            <p className={`${profit ? `text-success`:`text-danger`}`}><span>$</span><span>{avgBuyStart}</span></p>
            </td>
            <td>
            <p className={`${profit ? `text-success`:`text-danger`}`}><span>$</span><span>{equity}</span></p>
            </td>
            <td>
            <p className={`${profit ? `text-success`:`text-danger`}`}><span>$</span><span>{profitPerShare}</span></p>
            </td>
            <td>
            <p style={{fontWeight: `bold`}} className={`${profit ? `text-success`:`text-danger`}`}><span>$</span><span>{profit}</span></p>
            </td>
            <td>
            <p className={`${profit ? `text-success`:`text-danger`}`}><span>{ret}</span><span>%</span></p>
            </td>
            <td>
            <p style={{fontWeight: `bold`}} className={`${profit ? `text-success`:`text-danger`}`}><span>{shouldSell ? `Yes`: `No`}</span></p>
            </td>
            <td><a href="?" onClick={(e)=>{e.preventDefault(); remove(name)}} className={`text-danger`} title="Remove">X</a></td>
        </tr>
    )
}
export default Row