import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

function StockList() {
  const [snobj, setsnobj] = useState({});

  async function stock_list_api() {
    try {
      let list_url =
        "https://api.iex.cloud/v1/data/CORE/REF_DATA?token=pk_e904ca1d899740b5b0775a913a96670e";
      let res = await axios.get(list_url);
      let stockListArray = res.data;
      const newSymbolNamesArray = {};
      for (let i = 0; i < 500; i++) {
        const { symbol, name } = stockListArray[i];
        newSymbolNamesArray[symbol] = name;
      }
      setsnobj(newSymbolNamesArray);
    } catch (error) {
      console.error("Error fetching stock list:", error);
    }
  }

  useEffect(() => {
    stock_list_api();
  }, []);
  return ( 
    <>
      <h1 className=" w-1/2 m-auto text-2xl my-4 text-center font-bold ">
        List of Stocks
      </h1>
      <div className="container w-full md:w-4/5 xl:w-3/5  mx-auto px-2">
        <table className="">
          {Object.entries(snobj).map(([symbol, name]) => (
            <tr className="border-b border-black-100 maxi-1 bg-white-50  text-neutral-800 dark:bg-white-50">
              <td
                className="whitespace-nowrap px-6 py-4 font-medium hover:bg-neutral-100"
                key={symbol}
              >
                <Link to={`/stockdetail`} state={{ symbol: symbol }}>
                  {name}
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default StockList;
