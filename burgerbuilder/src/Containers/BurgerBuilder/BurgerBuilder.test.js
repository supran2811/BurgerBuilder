import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';


configure({adapter : new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder downloadIngredients = {() => {}} />);
    })

    it('should not render <BuildControls /> when there is no ingredients' , () => {
         
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    })

    it('should  render <BuildControls /> when there is  ingredients' , () => {
        wrapper.setProps({ingredients:{salad:0}}) 
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})