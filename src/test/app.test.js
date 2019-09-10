import { evezyTransactions } from '../data/evezy-transactions'

describe('>>>APP FUNCTIONS',()=>{
    
    beforeEach(()=>{        
        
    })
    test('Json data loads', () => {
        expect(evezyTransactions.length).toBe(9999)
    })
})