import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";

function StockDetail() {
  const [seriesdata, setseriesdata] = useState();
  const [error, seterror] = useState('')
  const location = useLocation();
  const symbol = location.state?.symbol;
  console.log(symbol)
  async function fetch_symbol_detail() {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=VUHJV3BGICP2P9CY`;
    let res = await axios.get(url);
    let stockdata = res.data
    if ("Meta Data" in res.data) {
    const timeOpenArray = [];
    for (let timestamp in stockdata["Time Series (1min)"]) {
      let openValue = stockdata["Time Series (1min)"][timestamp]["1. open"];
      timeOpenArray.push([
        new Date(timestamp).getTime(),
        parseFloat(openValue),
      ]);
    }
    setseriesdata(timeOpenArray);
    console.log("seriesdata", timeOpenArray);
    } else {
      seterror("Stock detail not found")
      console.log("error", res.data);
    }
  };

  useEffect(() => {
    fetch_symbol_detail();
    const intervalId = setInterval(fetch_symbol_detail, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className=" flex items-center justify-center h-screen w-100">
        <div  >
          {seriesdata && seriesdata.length !== 0 ? (
            <Chart
              series={[
                {
                  data: seriesdata,
                  name: "series1",
                },
              ]}
              options={{
                xaxis: {
                  type: "datetime",
                },
              }}
              width="500"
            />
          ) : (
            <></>
          )}{error?(<p>{error}</p>):(<></>)}
        </div>
        </div>
    </>
  );
}

export default StockDetail;
