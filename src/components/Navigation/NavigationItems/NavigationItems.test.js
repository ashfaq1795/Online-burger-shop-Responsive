import React from 'react';
//enzyme testing tool allow us just to render componet standalone independently rather than render entire application for one component.
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//jest testing tool give two functions. describe() and it(). also it doesn't need to import.
//two  arguments. first one is testing bundle that file hold which we want to render in console. the 2nd one is original testing function.
describe("<NavigationItems />", ()=>{
    let wrapper;
    //beforeEach is a helper function which execute before each test.
    //there is also afterEach function used to cleanup all tests.
    beforeEach(()=>{
          //shallow is a function provided by enzyme to render component with all content but not deeply. deeply mean not child component.
        wrapper= shallow(<NavigationItems />);
    })
    //main test.
    //it allow us to write one individual test.
    //it takes two arguments. first one string just appear in console. the 2nd one is actual testing function where we write testing logic.
    it("should render two <NavigationItem/> elements if not authenticated",()=>{
        //now we can have look into wrapper where NavigationItems rendered.
        //we now write our expection that is another globally available method  provided by jest testing.
        //find is a utility function provided by enzyme used to look into wrapper.
        //NavigationItem is not now a jsx element. it's just a normal exported function.
        //find method is used what we want to serach and toHaveLength method is our expectation. here our expection is the NavigationItem must be 2 if is IsAuthenticated is false. As we rendered NavigationItems in wrapper constant without passing any props. As isAuthenticated is not passed to NavigationItems component so it will be consider as false and test will be passed.  
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    //2nd test
    //2nd test is used to check the whether the NavigationItems are 3  or not if isAuthenticated prop is true. passing "isAuthenticated" directly will be consider is true.
    it("should render three <NavigationItem/> elements if authenticated",()=>{
        //wrapper= shallow(<NavigationItems isAuthenticated />); or
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    //3rd test
    //in test 3 we  write setProps again because each test run independently.
    //test 3 is just like test 2 but here we specify that logout NavigationItem rendered only if isAuthenticated is true.
    it("logout should only be rendered if authenticated is true.",()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout"> logout </NavigationItem>)).toEqual(true);
    });
});