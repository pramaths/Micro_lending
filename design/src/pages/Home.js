// import React ,{useState,useEffect}from 'react'

// const Home = () => {
//     const [data, setdata] = useState([]);
//   const [pieChartData, setPieChartData] = useState([]);
//   const [areachart, setAreachart] = useState([]);
//   const[tvl,settvl]=useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     fetch("/api/db")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(
//             `Network response was not ok: ${response.statusText}`
//           );
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setdata(data.arrProtocolData);
//         settvl(data.sumTVL)
//       })
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   console.log(data);
//   useEffect(() => {
//     const dataWithFirst30Days = data.map((protocol) => ({
//       ...protocol,
//       chartTVL: protocol.chartTVL.slice(-30),
//     }));
//     setAreachart(dataWithFirst30Days);
//   }, [data]);
//    const filteredData = data.filter((protocol) => 
//     protocol.protocolname.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div>

//         <div className='home'> 
//             <div className='box'>  
//             <div className="div">
//             <div className="datatable">
//               <div className="tables">
//                 <div className="table">
//                   <div className="thead-rank">#</div>
//                   <div className="thead-name">Name</div>
//                   <div className="thead-tvl">TVL</div>
//                   <div className="thead-protocol">Protocol</div>
//                   <div className="thead-marketcap">Market Cap</div>
//                   <div className="thead-7dchange">7d Change</div>
//                   <div className="thead-pools">Efficiency</div>
//                   <div className="thead-last30">Last 30d</div>
//                 </div>
//               </div>
//               {filteredData.map((item, index) => (
//                 <div className="tablecells">
//                   <div className="tablecell" key={index.id}>
//                     <div className="tablecell-rank">{item.rank}</div>
//                     <div className="tablecell-name">
//                       <div className="nameimg">
//                         <Image
//                           src={item.logo}
//                           alt={item.protocolname}
//                           width={22}
//                           height={22}
//                           margin={1}
//                         />
//                       </div>
//                       <div> {item.protocolname}</div>
//                     </div>
//                     <div className="tablecell-tvl">${format(item.tvl)}</div>
//                     <div className="tablecell-protocol" key={index.id}>
//                       {item.chains.map((chain, chainIndex) => (
//                         <div key={chainIndex} className="tool-tip">
//                           <Image
//                             src={getChainSVGUrl(chain)}
//                             alt={chain}
//                             height={22}
//                             width={22}
//                             title={chain}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div className="tablecell-marketcap">
//                       {item.mcap ? format(item.mcap) : "N/A"}
//                     </div>
//                     <div
//                       className="tablecell-7dchange"
//                       style={{
//                         color: item.change_7d < 0 ? "red" : "green",
//                       }}
//                     >
//                       {item.change_7d !== null && item.change_7d !== undefined
//                         ? `${item.change_7d.toFixed(2)}%`
//                         : "N/A"}
//                     </div>
//                     <div className="tablecell-pool">
//                       {item.volume24h && item.tvl
//                         ? `${(item.volume24h / item.tvl).toFixed(2)}`
//                         : "N/A"}
//                     </div>
//                     <div className="tablecell-last30d">
//                      <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart  height={60} data={item.chartTVL}>
//                         <defs>
//                           <linearGradient
//                             id={`gradientFill${index}`}
//                             x1="0"
//                             y1="0"
//                             x2="0"
//                             y2="1.3"
//                           >
//                             <stop
//                               offset="5%"
//                               stopColor={
//                                 item.chartTVL &&
//                                 item.chartTVL.length >= 30 &&
//                                 item.chartTVL[0].totalLiquidityUSD <
//                                   item.chartTVL[29].totalLiquidityUSD
//                                   ? "#00ff00"
//                                   : "#ff0000"
//                               }
//                               stopOpacity={0.8}
//                             />
//                             <stop
//                               offset="95%"
//                               stopColor={
//                                 item.chartTVL &&
//                                 item.chartTVL.length >= 30 &&
//                                 item.chartTVL[0].totalLiquidityUSD <
//                                   item.chartTVL[29].totalLiquidityUSD
//                                   ? "#4fc280"
//                                   : "#d6455d"
//                               }
//                               stopOpacity={0}
//                             />
//                           </linearGradient>
//                         </defs>
//                         <Area
//                           type="monotone"
//                           dataKey="totalLiquidityUSD"
//                           stroke={
//                             item.chartTVL &&
//                             item.chartTVL.length >= 30 &&
//                             item.chartTVL[0].totalLiquidityUSD <
//                               item.chartTVL[29].totalLiquidityUSD
//                               ? "#4fc280"
//                               : "#d6455d"
//                           }
//                           fill={`url(#gradientFill${index})`}
//                           fillOpacity={0.8}
//                         />
//                       </AreaChart>
//                    </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Home
import React from 'react';
import '../utils/home.css';

function Home() {
  return (
    <div className="container">
      <div className="sliding-text">
        <span>Hello </span>
        <span>&nbsp;</span>
        <span>There!! </span>
        <span>&nbsp;</span>
        <span>User</span>
      </div>
    </div>
  );
}

export default Home;