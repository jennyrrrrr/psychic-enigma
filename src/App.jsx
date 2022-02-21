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

  const cat_to_t_view = {
    24:  '55,259 M',
    10:  '55,225 M',
    20:  '31,309 M',
    17:  '16,395 M',
    22:  '14,378 M',
    23:  '9,533 M',
    1:   '7,430 M',
    28:  '6,747 M',
    25:  '4,089 M',
    27:  '3,293 M',
    26:  '2,960 M',
    2:   '1,322 M',
    19:  '529 M',
    15:  '455 M',
    29:  '112 M',
  }

  const cats = [24, 10, 20, 17, 22, 23, 1, 28, 25, 27, 26, 2, 19, 15, 29]

  // function get_unique_Column(name) {
  //   var col = []
  //   for (var i = 0; i < usvideos.length; i += 1) {
  //     if (col.includes(usvideos[i][name]) == false) {
  //       col.push(usvideos[i][name].toString())
  //     }
  //   };
  //   return col;
  // }

  // var cats = get_unique_Column('categoryId')

  // const [selectedCats, setSelectedCats] = useState(cats);
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

  // const HoverText = () => {
  //   return (
  //     <div>
  //       Hovering right meow!
  //       {console.log(22222)}
  //       <h1>hellooooo</h1>
  //       <span role="img" aria-label="cat">
  //         🐱
  //       </span>
  //     </div>
  //   );
  // };

  // const [isHovering, setIsHovering] = useState(false);
  // const handleMouseOver = () => {
  //   setIsHovering(true);
  // };

  // function handleMouseOut(title){
  //   setIsHovering(false);
  // };

  function handleMouseOver(id){
    var circle = document.getElementsById(id);

    if (circle.getAttribute("opacity") == 0.1){
      circle.setAttribute("opacity", 1.0);
    }else{
      circle.setAttribute("opacity", 0.1);
    }
  }

  function handleMouseOut(id){
    var circle = document.getElementsById(id);
    
    circle.setAttribute("opacity", 1.0);
  }

  const _scaleX2 = scaleLinear()
  .domain([0, 365])
  .range([0, 1100]);

  const _scaleY2 = scaleLinear()
  .domain([0, 264407389])
  .range([550, 50]);

  return (
    <div style={{ margin: 10 }}>
      <div style={{ display: "flex", 'align-items':"center", 'padding-left':"20px"}}> 
        <img src="src/YouTube-Emblem.png" alt="Italian Trulli" height="25px"/>
        <h1 style={{'padding-left':"20px"}}> YouTube Trending Videos | 2021 </h1>
      </div>
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
                  cx={70 + parseInt(usvideos_max[id]['trending_date']) / 365 * 1100} 
                  cy={550 - usvideos_max[id]['view_count'] / 264407389 * 500} 
                  r={parseInt((usvideos_max[id]['trending_date']) - parseInt(usvideos_max[id]['publishedAt']))/2} 
                  fill={cat_cols[cat]} 
                  opacity={0.1}
                />
              )
            })
          })}
          {/* {isHovering && <HoverText />} */}
          {cats.map((cat, i) => {
            return (
              <text 
                x={1250 - 70} 
                y={43 + i * 23} 
                fontSize={12}> 
                  {cat_to_t_view[cat]} 
              </text>
            )
          })}
          {cats.map((cat, i) => {
            return (
              <circle
                id={cat}
                class={cat}
                cx={1250} 
                cy={40 + i * 23} 
                r="8" 
                fill={cat_cols[cat]} 
                opacity={0.1}
                stroke={"white"}
                stroke-width={1.5}
                onClick={() => clickCircle(cat)}
                onMouseOver={() => handleMouseOver()} 
                onMouseOut={handleMouseOut}
              />
            )
           })}
          {cats.map((cat, i) => {
            return (
              <text 
                x={1250 + 20} 
                y={43 + i * 23} 
                fontSize={12}> 
                  {cat_id_to_names[cat]} 
              </text>
            )
          })}
          <AxisLeft 
            strokeWidth={1} 
            left={70} 
            scale={_scaleY2} 
            stroke={"#808080"}
          />
          <AxisBottom
            strokeWidth={1}
            top={570}
            left={70}
            scale={_scaleX2}
            fontSize={25}
            stroke={"#808080"}
            numTicks={11}
          />
          <text x={1265} y={13}> Category </text>
          <text x={1160} y={13}> Total Views</text>
          <text x={1250} y={13}> | </text>
          <text x={1210} y={570}> Days </text>
          <text x={20} y={15}> # Views </text>
        </svg>
      </div>
    </div>
  );
}

export default App
