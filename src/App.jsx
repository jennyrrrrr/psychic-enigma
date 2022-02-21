import { scaleLinear } from 'd3'
import './App.css'
import usvideos from "./cleaned_df_11";
import usvideos_max from "./cleaned_df_11_max";

import React, { useState } from "react"; /* ADD THIS LINE FOR STATE MANAGMENT */

import { AxisLeft, AxisBottom } from "@visx/axis";
// import BubbleChart from '@weknow/react-bubble-chart-d3';


function App() {

  const cat_cols = {
    1: '#a18276',
    2: '#f27474',
    10: '#66d7d1',
    15: '#ffb4a2',
    17: '#8e7dbe',
    20: '#a1c084',
    22: '#add7f6',
    23: '#f2d0a9',
    24: '#e5989b',
    25: '#9ac2c9',
    26: '#b3f78b',
    27: '#848586',
    28: '#f4d06f',
    29: '#eec6ca'
  }

  const cat_id_to_names = {
    1: 'Film & Animation',
    2: 'Autos & Vehicles',
    10: 'Music',
    15: 'Pets & Animals',
    17: 'Sports',
    19: 'Travel & Events',
    20: 'Gaming',
    22: 'People & Blogs',
    23: 'Comedy',
    24: 'Entertainment',
    25: 'News & Politics',
    26: 'Howto & Style',
    27: 'Education',
    28: 'Science & Technology',
    29: 'Nonprofits & Activism'
  }

  function get_unique_Column(name) {
    var col = []
    for (var i = 0; i < usvideos.length; i += 1) {
      if (col.includes(usvideos[i][name]) == false) {
        col.push(usvideos[i][name].toString())
      }
    };
    return col;
  }

  var cats = get_unique_Column('categoryId')

  const [selectedCats, setSelectedCats] = useState(cats);
  const cat_by_id = {}
  for (var i = 0; i < usvideos_max.length; i += 1) {
    if (!cat_by_id[usvideos_max[i]['categoryId']]) {
      cat_by_id[usvideos_max[i]['categoryId']] = [];
    }
    cat_by_id[usvideos_max[i]['categoryId']].push(i);
  }
  function clickCircle(cat) {
    var cat = cat.toString()
    var circles = document.getElementsByClassName(cat);

    for (var i = 0; i < circles.length; i+= 1) {
      var circle = circles[i]
      if (circle.getAttribute("opacity") == 0.1){
        circle.setAttribute("opacity", 1.0);
        circle.setAttribute("stroke", 'black');
        circle.setAttribute("stroke-width", 1.5);
      } else {
        circle.setAttribute("opacity", 0.1);
        circle.setAttribute("stroke", 'white');
      }
    }
    
    // if (selectedCats.indexOf(cat) === -1) {
    //   setSelectedCats(selectedCats.slice(0).push(cat));
    // } else {
    //   setSelectedCats(
    //     selectedCats.slice(0).filter((_cat) => {
    //       return _cat !== cat;
    //     })
    //   );
    // }
  }

  const _scaleX2 = scaleLinear()
  .domain([0, 365])
  .range([0, 1100]);

  const _scaleY2 = scaleLinear()
  .domain([0, 264407389])
  .range([550, 50]);

  return (
    <div style={{ margin: 20 }}>
      <h1> Youtube Trending Videos | 2021 </h1>
      <div style={{ display: "flex" }}>
        <svg
          width={1500}
          height={650}
        >
          {cats.map((cat, i) => {
            var ids = cat_by_id[cat];
            return ids.map((id) => {
              return (
                <circle
                class={usvideos_max[id]['categoryId']}
                cx={100 + parseInt(usvideos_max[id]['trending_date']) / 365 * 1100} 
                cy={550 - usvideos_max[id]['view_count'] / 264407389 * 500} 
                r={parseInt((usvideos_max[id]['trending_date']) - parseInt(usvideos_max[id]['publishedAt']))/2} 
                fill={cat_cols[cat]} 
                opacity={0.1}
                />
              )
            })
          })}
          {cats.map((cat, i) => {
            return (
              <circle
                // key={cat}
                id={cat}
                class={cat}
                // name={cat}
                cx={1250} 
                cy={50 + i * 23} 
                r="8" 
                fill={cat_cols[cat]} 
                opacity={0.1}
                stroke={"white"}
                stroke-width={1.5}
                onClick={() => clickCircle(cat)}
                />
            )
           })}
          {cats.map((cat, i) => {
            return (<text x={1250 + 20} y={55 + i * 23} fontSize={12}> {cat_id_to_names[cat]} </text>)
          })}
          <AxisLeft strokeWidth={0} left={80} scale={_scaleY2} />
          <AxisBottom
            strokeWidth={0}
            top={550}
            left={80}
            scale={_scaleX2}
            // tickValues={ages}
            fontSize={25}
          />
          <text x={1280} y={30}> Category </text>
          <text x={1210} y={570}> Days </text>
        </svg>
      </div>
    </div>
  );
}

export default App
