import { daysIntoYear, daysInYear, heatMapColorforValue, sortList, groupBy } from "../common/Utils"
import { evezyTransactions } from '../data/evezy-transactions'


let transactionsArray
describe('>>>UTILITY FUNCTIONS',()=>{
    
    beforeEach(()=>{        
        transactionsArray=[
            {amount: 349.99, date: "2019-01-02", transactionType: "failed"},
            {amount: 599.99, date: "2019-01-02", transactionType: "failed"},
            {amount: 299.99, date: "2019-01-01", transactionType: "success"},
            {amount: 349.99, date: "2019-01-01", transactionType: "failed"},
            {amount: 299.99, date: "2019-01-01",transactionType: "success"}
        ]

    })
    test('sortList:', () => {
        let ordereredList=sortList(transactionsArray,"date")
        expect(ordereredList[0].date).toBe("2019-01-01")
    })
    test('daysIntoYear 1:', () => {
        let dIY=daysIntoYear(new Date("2019-01-01"))
        expect(dIY).toBe(1)
     })
     test('daysIntoYear 2:', () => {
        let dIY=daysIntoYear(new Date("2019-12-31"))
        expect(dIY).toBe(365)
     })
     test('heatMapColorforValue 1(Red):', () => {
        let successTotal=0;
        let color=heatMapColorforValue(successTotal)
        expect(color).toBe("hsl(0, 100%, 50%)")
     })
     test('heatMapColorforValue 2(Green):', () => {
        let successTotal=0.5;
        let color=heatMapColorforValue(successTotal)
        expect(color).toBe("hsl(120, 100%, 50%)")
     })
    test('groupBy:', () => {
        let ordereredList=sortList(transactionsArray,"date")
        let groupedtransactions = groupBy(ordereredList, "date")
        let arrayFromObject=Object.entries(groupedtransactions)
        
        expect(arrayFromObject.length).toBe(2)
        expect(arrayFromObject[0][0]).toBe('2019-01-01')
        expect(arrayFromObject[0][1][0].transactionType).toBe('success')
        expect(arrayFromObject[0][1][0].amount).toBe(299.99)
        expect(arrayFromObject[0][1][1].transactionType).toBe('failed')
        expect(arrayFromObject[0][1][1].amount).toBe(349.99)
    })   
})
