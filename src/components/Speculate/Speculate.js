import React, { useState, useRef, useEffect } from "react";
import Row from "./Row";

const Speculate = () => {
  //move to Redux
  let [data, setData] = useState([]);
  const newStockRef = useRef()

  const [total, setTotal] = useState(0);
  const [toggleForm, setToggleForm] = useState(false);
  const sum = (nextTotal) => {
    if (isNaN(total) || isNaN(nextTotal)) {
      return;
    }
    let sum = parseFloat(total) + nextTotal;
    setTotal(sum.toFixed(2));
  };

  const setLocalStorage = (d) => {
    localStorage.setItem('data', JSON.stringify(d))
  }
  const newStock = () => {
    let newStock = newStockRef.current.value
    let d = [...data, {"name":newStock}]
    setData(d)
    setLocalStorage(d)
    newStockRef.current.value = ""
  };
  const remove = (name) => {
    let d = data.filter((item)=>name!==item.name)
    setData(d)
    setLocalStorage(d)
  }
  const update = (stock)=>{
    let d = data.filter((item)=>item.name!==stock.name)
    let newData = [...d, stock]
    setData(newData)
    setLocalStorage(newData)
  }

  useEffect(()=>{
    let d = JSON.parse(localStorage.getItem('data'))

    if(d){
        setData(d)
    }
  },[])

  return (
    <div className="text-center">
      <h1 className="mt-4">Stock App</h1>
      <p className="mb-4">Speculate | View History</p>
      <div className="row">
        {/* Convert to columns */}
        <div className="container-fluid ml-4 mr-4">
          <table className="table table-striped" style={{ width: `100%` }}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Avg Buy Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Sell Price</th>
                <th scope="col">Avg Buy Start</th>
                <th scope="col">Current Equity</th>
                <th scope="col">Profit/Share</th>
                <th scope="col">Profit</th>
                <th scope="col">Return</th>
                <th scope="col">Should Sell?</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ name, avgBuyPrice, quantity, sellPrice, profitInit, profitPerShareInit, avgBuyStartInit, equityInit, retInit, shouldSellInit }, id) => (
                <Row key={id} name={name} avgBuyPrice={avgBuyPrice} quantity={quantity} sellPrice={sellPrice} profitInit={profitInit} profitPerShareInit={profitPerShareInit} avgBuyStartInit={avgBuyStartInit} equityInit={equityInit} retInit={retInit} shouldSellInit={shouldSellInit} sum={sum} remove={remove} updateStock={update} updateTotal={sum} />
              ))}
              <tr>
                <td>Total</td>
                <td>$</td>
                <td colSpan="3"></td>
                <td>
                  <span>-</span>
                </td>
                <td>
                  <span>-</span>
                </td>
                <td>
                  <p style={{ fontWeight: `bold` }}>
                    <span>$</span>
                    <span>{total}</span>
                  </p>
                </td>
                <td>
                  <span>%</span>
                  <span></span>
                </td>
                <td>-</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="text-left mt-4">
            <button
              onClick={() => {
                setToggleForm(!toggleForm);
              }}
              className="btn btn-primary"
            >
              Add A Stock
            </button>
            <form
              className={`${toggleForm ? `` : `d-none`} mt-4`}
              onSubmit={(e) => {
                e.preventDefault();
                newStock();
              }}
            >
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  ref={newStockRef}
                  placeholder="Enter Stock Symbol"
                />
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speculate;
