import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({adapter : new Adapter()});

describe('<NavigationItems />' , () => {

     let wrapper;

     beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
     })

     it('should render 3 <NavigationItem /> when not authenticated',() => {
         expect(wrapper.find(NavigationItem)).toHaveLength(3);
     });

     it('should render 3 <NavigationItem /> when is authenticated',() => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should render Logout when is authenticated',() => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    })
});
