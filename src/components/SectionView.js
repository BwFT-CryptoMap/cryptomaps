import React, {useState, Fragment, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { Svg, Rect, Text } from '@potion/element'
import { Treemap } from '@potion/layout'
import Tooltip from '@material-ui/core/Tooltip'

import SecondaryTree from "./SecondaryTree"

import HelloWorld from './HelloWorld'

//Section View


import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getThemeProps } from '@material-ui/styles';

export default () => {
    const [selection, setSelection] = useState("24H")
   

    let changeColor; 
    let changePerformanceText;

    let matchGreaterBorder;

////////////////For REFACTORING data variable functions to less code

    // const primaryData = useSelector(state => state.mapData).filter(data => data.liquidMarketcap > 0)

    // const perSector = primaryData.filter(data => data.sector === "Currencies")

    //////////////////////

    const currenciesData = useSelector(state => state.mapData).filter(data => data.sector === "Currencies" && data.liquidMarketcap > 0)
    const smartContractData = useSelector(state => state.mapData).filter(data => data.sector === "Smart Contract Platforms" && data.liquidMarketcap > 0)
    const dex = useSelector(state => state.mapData).filter(data => data.sector === "Decentralized Exchanges" && data.liquidMarketcap > 0)


    const getPercentage = (marketCap, totalMarketCap) => {
        return ((marketCap / totalMarketCap) * 100)
    }

    const forTotal = useSelector(state => state.mapData).filter(data => data.liquidMarketcap > 0)
    const totalMarketCap = forTotal.reduce((a, c) => a + c.liquidMarketcap, 0)
    console.log("this is totalMC", totalMarketCap)

    const arrangeData = (data) => {
        let sectorMarketCap = data.reduce((a, c) => a + c.liquidMarketcap, 0)
        console.log("sectorMarketcap", sectorMarketCap) 
            console.log ("getPercent", getPercentage(sectorMarketCap, totalMarketCap))
            return { key: sectorMarketCap, value: getPercentage(sectorMarketCap, totalMarketCap), sector: data[0].sector} //category will be used in the header
        
            
    }

    const rerrangeData = (data) => {
        let totsMarketCap = data.reduce((a, c) => a + c.liquidMarketcap, 0)
        return data.map(datum => {
            return { key: datum.id, value: getPercentage(datum.liquidMarketcap, totsMarketCap), symbol: datum.symbol, priceUsd: datum.priceUsd, percentageChange24HrUsd: datum.percentageChange24HrUsd, percentageChange7dUsd: datum.percentageChange7dUsd, percentageChange30dUsd: datum.percentageChange30dUsd, percentageChange90dUsd: datum.percentageChange90dUsd }
        })
    }

    const sectorsArray =(currenciesData, smartContractData, dex) =>{
    //         let arrayB = arrangeData(smartContractData)
    //         let arrayC = arrangeData(dex)
    //         let arrayBC = arrayB.concat(arrayC)

    //   return  arrangeData(currenciesData).concat(arrayBC)
            let objectOne = rerrangeData(currenciesData)
            let objectTwo = rerrangeData(smartContractData)
            let objectThree = rerrangeData(dex)

          

      return [
        { key: arrangeData(currenciesData).sector, value: arrangeData(currenciesData).value, sector: currenciesData[0].sector},
                                                                                        //, children: objectOne
        {key: arrangeData(smartContractData).sector, value: arrangeData(smartContractData).value, sector: smartContractData[0].sector},
                                                                                                //, children: objectTwo
       {key: arrangeData(dex).sector, value: arrangeData(dex).value, sector: dex[0].sector }
                                                                //, children: objectThree
      ]
    }

    const superArrangeData = (sectorsArray) => {
        console.log("sectorsArray", sectorsArray)
        return sectorsArray.map(datum => {
            return { key: datum.key, value: datum.value, sector: datum.sector } //category will be used in the header
                                                    //, children: datum.children
        }
        )    
    }

const handleChange = (e) => {
    setSelection(e.target.value)
}

const timeChange = (data) => {

switch (selection) {
    case "24H": {

       
        
        changeColor = data.percentageChange24HrUsd === 0 ? '#BCB2B1' : data.percentageChange24HrUsd > 0 ? ( data.percentageChange24HrUsd >= 5 ? '#518651' : '#7EC17E') : 
         (-10 <= data.percentageChange24HrUsd <= -5 ? '#ED7171' : data.percentageChange24HrUsd <=-10? "#6e1414" : '#C84040' ) 
        

        
        changePerformanceText = data.percentageChange24HrUsd ? data.percentageChange24HrUsd > 0 ? '+' + data.percentageChange24HrUsd.toFixed(2) + '%' : data.percentageChange24HrUsd.toFixed(2) + '%' : null

        

        return (
            changeColor,
            changePerformanceText,
            console.log("this is changeColor", changeColor)
        )
        
    }
    case "7D": {

        changeColor = data.percentageChange7dUsd === 0 ? '#BCB2B1' : data.percentageChange7dUsd > 0 ? ( data.percentageChange7dUsd >= 5 ? '#518651' : '#7EC17E') : 
        (-10 <= data.percentageChange7dUsd <= -5 ? '#ED7171' : data.percentageChange7dUsd <=-10? "#6e1414" : '#C84040' ) 
        
        changePerformanceText = data.percentageChange7dUsd ? data.percentageChange7dUsd > 0 ? '+' + data.percentageChange7dUsd.toFixed(2) + '%' : data.percentageChange7dUsd.toFixed(2) + '%' : null

        return (
            changeColor,
            changePerformanceText
            
        )

    }
    case "30D": {

        changeColor = data.percentageChange30dUsd === 0 ? '#BCB2B1' : data.percentageChange30dUsd > 0 ? ( data.percentageChange30dUsd >= 5 ? '#518651' : '#7EC17E') : 
        (-10 <= data.percentageChange30dUsd <= -5 ? '#ED7171' : data.percentageChange30dUsd <=-10? "#6e1414" : '#C84040' ) 
        
        changePerformanceText = data.percentageChange30dUsd ? data.percentageChange30dUsd > 0 ? '+' + data.percentageChange30dUsd.toFixed(2) + '%' : data.percentageChange30dUsd.toFixed(2) + '%' : null

        return (
            changeColor,
            changePerformanceText
        )
    }
    case "90D": {

        changeColor = data.percentChange90dUsd === 0 ? '#BCB2B1' : data.percentageChange90dUsd > 0 ? ( data.percentageChange90dUsd >= 5 ? '#518651' : '#7EC17E') : 
        (-10 <= data.percentageChange90dUsd <= -5 ? '#ED7171' : data.percentageChange90dUsd <=-10? "#6e1414" : '#C84040' ) 
        
        changePerformanceText = data.percentageChange90dUsd ? data.percentageChange90dUsd > 0 ? '+' + data.percentageChange90dUsd.toFixed(2) + '%' : data.percentageChange90dUsd.toFixed(2) + '%' : null


        return (
            changeColor,
            changePerformanceText
        )
    }
    default: {
        return selection
    }
}

}

const fonterDoerer = (x0, x1, y0, y1) => {

    matchGreaterBorder =  x1-x0 < y1-y0 ? ((x1 - x0) / 8) : ((y1 - y0) / 8);
  
    return matchGreaterBorder
  
  
  }

let [varArr, setVarArr] = useState([])

 
  const returnVars = (x0, y0, x1, y1) => {
    console.log('this is varArr', varArr)
    console.log('x0', x0)
    return setVarArr([x0, y0, x1, y1])

  }

  const hailMary = (x0, x1, y0, y1) => {
        if(varArr.length == 0){
            return null
        }else{
            returnVars(x0, y0, x1, y1)
        }

  }


  

    return (
        <TransformWrapper defaultScale={1}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={resetTransform}>Reset</button>
                        <form className="selection">
                            <select name="PercentChange" id="PercentChange" onChange={handleChange}>        <option value="24H">24H Performance</option>
                            <option value="7D">7D Performance</option>
                            <option value="30D">30D Performance</option>
                            <option value="90D">90D Performance</option>
                            </select>
                        </form>
                    </div>
                    <TransformComponent>
                        <Svg width={window.innerWidth} height={window.innerHeight - 197}  >
                            <Treemap
                                data={{
                                    children: superArrangeData(sectorsArray(currenciesData, smartContractData, dex)) ///This needs to be ALL of the sectors passed in
                                }}
                                sum={datum => datum.value}
                                size={[window.innerWidth, (window.innerHeight - 197)]}
                                
                             
                            >
                                {nodes => nodes.map(({ key, x0, y0, x1, y1, data }) => (
                                    <>
                                    {timeChange(data)}
                                    {fonterDoerer(x0, x1, y0, y1)}
                                 //cut Problem areas}
                                    <Tooltip title={
                                        <Fragment>
                                        <p> {data.symbol}</p>
                                        <p>{data.priceUsd ? '$' + data.priceUsd.toFixed(2) : null}</p>
                                       <p>{changePerformanceText}</p>
                                        </Fragment>
                                    }>
                                   
                                        <Rect
                                            key={key}
                                            x={x0}
                                            y={y0}
                                            width={x1 - x0}
                                            height={y1 - y0}
                                            fill='none'
                                            stroke='#01579b'
                                           
                                        />
                                     

                                    </Tooltip>
                                   
                                        <Text
                                        
                                        x={x0 + (x1 - x0) * .4}
                                        y={y0 + (y1 - y0) / 2}
                                       
                                        fontSize={matchGreaterBorder}
                                        color="#ffffff">
                                                <tspan color="#ffffff" x={x0} y={y0 + matchGreaterBorder} >
                                                   
                                                        {data.sector}
                                                       
                                                </tspan>
                             
                                        </Text>
                                     
                                   
                                    </>
                                ))}
                            </Treemap>
                            <SecondaryTree/>
                        </Svg >
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    )
}



//mapData should return sections
//treemap should arrange these sections by (value: ???)
//Within the treemap the nodes returned are the sections with <elements> including: header w/style, <Component that makes a different treemap being passed props/> || <canvas> with treemap in it? ||  Potions' <Treemap> injected directly? (don't think we tried this for lack of time but would get very messy, first option is better)



// <canvas x={x0} y={y0 + (matchGreaterBorder * 2)}>
// <Rect
// key={key}
// x={x0}
// y={y0 + (matchGreaterBorder * 2)}
// width={(x1 - x0)/2}
// height={(y1 - y0)/2}
// fill='red'
// stroke='#01579b'

// />

// </canvas>

//<SecondaryTree xCoord={varArr[0]} yCoord={(varArr[1])*2} miniWidth={(varArr[2]-varArr[0])/2} miniHeight={(varArr[4]-varArr[1])/2}/>

// if (varArr !== []){
//     return (<SecondaryTree xCoord={varArr[0]} yCoord={(varArr[1])*2} miniWidth={(varArr[2]-varArr[0])/2} miniHeight={(varArr[4]-varArr[1])/2}/>)
// }



// {
//     ///PROBLEM AREA
    
//     varArr !== [] ? returnVars(x0, y0, x1, y1) : null
 
//     }
//     { 
//          ///PROBLEM AREA
//         varArr.length < 0 ? null: <SecondaryTree xCoord={varArr[0]} yCoord={(varArr[1])*2} miniWidth={(varArr[2]-varArr[0])/2} miniHeight={(varArr[4]-varArr[1])/2}/>

//     }