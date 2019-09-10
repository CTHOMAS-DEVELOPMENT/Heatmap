import React from "react"
import "./css/app.scss"
import Heatmap from "./components/Heatmap"
import { daysIntoYear, daysInYear, heatMapColorforValue, sortList, groupBy } from "./common/Utils"
import { evezyTransactions } from './data/evezy-transactions'

class App extends React.Component {
    state = {
        result:[],
        daysInYear:0
    };
    /**
     * transactionSuccess -
     * 
     * Param
     *  total - The aggregated object
     *  currentValue - The trade object one of potentially many that made up that day's trading
     * About/Returns - 
     *  Reducer function which is used to aggregate the success and failure attributes of the result object
     */
    transactionSuccess=(total, currentValue)=>{
        let successAmount=currentValue.transactionType==="success"?currentValue.amount:0
        let failureAmount=currentValue.transactionType==="failed"?currentValue.amount:0
        
        return { success : total.success + successAmount , failure: total.failure + failureAmount, daysIntoYear: daysIntoYear(new Date(currentValue.date)) }
    }
    /**
     * getDaysTransactionSuccess -
     * 
     * Param -
     *  dayData - A trade object
     * 
     * About/Returns -
     *  Aggregates the success and failure totals for each trading day. Adds the daysIntoYear attribute.
     */
    getDaysTransactionSuccess=(dayData)=>{
        return dayData[1].reduce(this.transactionSuccess,{ success : 0, failure : 0, daysIntoYear: 0});
    }
    /**
     * getNoTransactionDay -
     * 
     * Param -
     *  daysIntoYear - The correct "trading day" number
     * About/Returns -
     *  Returns the "No trading day" object
     * 
     */
    getNoTransactionDay=(daysIntoYear)=>{
       return {success: 0, failure: 0, daysIntoYear: daysIntoYear, colorNumber: 0, heatColor: "hsl(0, 100%, 50%)"}
    }
    /**
     * reduceTransactions -
     * 
     * Params -
     *  allData - The derived data from the json file. Ordered and Aggregated array of objects
     *  results - The result array reference
     * About/Returns - 
     *  (1) Totals success and failure for the day and adds these attributes to the "result" object
     *  allData - All the processed (Ordered/aggregated) data
     *  (2) Adds the "Days into year" value to the "result" object
     *  (3) Adds missing "No trade day object" to the "result" object
     */
    reduceTransactions=(allData,results)=>
    {
        let missingDayInsert=0;
        allData.forEach(function(dayData,index,arr) {
            let aggegatedValues=this.getDaysTransactionSuccess(dayData);

            //'Success', and the associated color, is derived from success/(success+failure) 
            aggegatedValues.colorNumber=(aggegatedValues.success/(aggegatedValues.success + aggegatedValues.failure))/2
            aggegatedValues.heatColor=heatMapColorforValue(aggegatedValues.colorNumber)

            //Was there a 'No trading day' ? 
            if(aggegatedValues.daysIntoYear > index+1+missingDayInsert)
            {
                missingDayInsert++;
                results.push(this.getNoTransactionDay(index+missingDayInsert))
            }

            results.push(aggegatedValues)
            
        },this);

        let remainingCollections=daysInYear() - results.length;

        //Append 'No trading' object to the incomplete year result set
        for (let i = 0; i<remainingCollections; i++) {
           results.push(this.getNoTransactionDay(results.length + 1))
        }
    }
    componentDidMount(){
        //Read, order and aggregate/reduce the data
        let results=[];
        let ordereredList=sortList(evezyTransactions,"date");
        
        let groupedtransactions = groupBy(ordereredList, "date")
        let arrayFromObject=Object.entries(groupedtransactions)
        this.reduceTransactions(arrayFromObject, results)
        this.setState({result:results, daysInYear: daysIntoYear(new Date(`${ new Date().getFullYear() }-12-31`))})
    
    }

    render() {
        return (
            <div className="grid-container">
                <div className="item">
                    <Heatmap result={this.state.result} daysInYear={this.state.daysInYear}/>
                </div>
             </div>
        )
    }
}

export default App
