// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip } from 'recharts';
// import '../styles/Dough.css'; 
// const COLORS = ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'];

// const dough = ({ pieChartData }) => {
//   const labelStyle = {
//     fontSize: '8px',
//   };

//   const renderTooltipContent = (o) => {
//     const { payload, label } = o;
//     return payload.length > 0 ? (
//       <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
//         <p>{label}</p> 
//       </div>
//     ) : null;
//   };
//   return (
//     <div className='hii' style={{position:'absolute', width: '100%', height: '300px' }}>
      
//       <ResponsiveContainer width='100%' height={200}>
//       <PieChart >
//         <Pie
//           data={pieChartData}
//           dataKey="tvl"
//           nameKey="protocolname"
//           innerRadius={45}
//           outerRadius={78}
//           // cx={90}
//           // cy={90}
//           fill="#82ca9d"
//           isAnimationActive={true}

//         >
//           {pieChartData.map((entry, index) => (
//             <Cell
//               key={`cell-${index}`}
//               fill={COLORS[index % COLORS.length]}
//             />
//           ))}
//         </Pie>
//         <Tooltip content={renderTooltipContent} />
//       </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default dough;
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// import '../styles/Dough.css'; // Import your CSS file

const COLORS = ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'];

const dough = ({ pieChartData }) => {
  const labelStyle = {
    fontSize: '8px',
  };

  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    return payload.length > 0 ? (
      <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p>{label}</p> 
      </div>
    ) : null;
  };
  return (
    <div className='hii' style={{position:'absolute', width: '100%', height: '300px' }}>
      
      <ResponsiveContainer width='100%' height={200}>
      <PieChart >
        <Pie
          data={pieChartData}
          dataKey="tvl"
          nameKey="protocolname"
          innerRadius={45}
          outerRadius={78}
          // cx={90}
          // cy={90}
          fill="#82ca9d"
          isAnimationActive={true}

        >
          {pieChartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={renderTooltipContent} />
      </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default dough;
