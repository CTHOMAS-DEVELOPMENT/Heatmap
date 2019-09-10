import React from "react";
import Heatmap from '../components/Heatmap';
import { shallow, configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { create } from "react-test-renderer";
configure({adapter: new Adapter()});

let container,dummy,wrapper,tree,result,daysInYear;


  describe('>>>HEATMAP component structure',()=>{
    
    beforeEach(()=>{
        daysInYear=365        
        result=[{success: 0, failure: 0, daysIntoYear: 365, colorNumber: 0, heatColor: "hsl(0, 100%, 50%)"}]
        wrapper = mount( <Heatmap  result={result} daysInYear={daysInYear}/>)
        tree=create(<Heatmap  result={result} daysInYear={daysInYear}/>).toJSON();

    })

    test('Check Prop were passed', () => {
        let { success, failure, daysIntoYear, colorNumber, heatColor}=wrapper.props().result[0]
        expect(success).toBe(0);
            expect(failure).toBe(0);
            expect(daysIntoYear).toBe(365);
            expect(colorNumber).toBe(0);
            expect(heatColor).toBe('hsl(0, 100%, 50%)');

        });
    test('Check Dom/Virtual Dom structure', () => {
        expect(tree.type).toBe('div');
        expect(tree.props.className).toBe('graph');
        expect(tree.children[0].children[0].type).toBe('li');
        expect(tree.children[0].children[0].children[0]).toBe('Jan');
        expect(tree.children[0].type).toBe('ul');
        expect(tree.children[1].type).toBe('ul');


    });    
})


  