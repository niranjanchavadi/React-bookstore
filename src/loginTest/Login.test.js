import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import Login from '../component/Login';

configure({adapter: new Adapter()});

describe('Checking <Login/> component',() => {
    it('checking with valid details ', () => {
        const wrapper = shallow(<Login/>);
        const instance = wrapper.instance();
     
        wrapper.find(TextField).at(0).simulate('change',{target: {name:"emailId",value: "mohan.b600@gmail.com"}})
        wrapper.find(TextField).at(1).simulate('change',{target: {name:'password',value: 'Mohan@123'}})
        expect(instance.state.fields.emailId).toBe('mohan.b600@gmail.com')
        expect(instance.state.fields.password).toBe('Mohan@123')
        expect(instance.state.isValid).toBe(true);
    })

    it('checking with invalid details ', () => {
        const wrapper = shallow(<Login/>);
        const instance = wrapper.instance();
     
        wrapper.find(TextField).at(0).simulate('change',{target: {name:"emailId",value: "mohan.@.com"}})
        wrapper.find(TextField).at(1).simulate('change',{target: {name:'password',value: 'mohan123'}})
        expect(instance.state.fields.emailId).toBe('mohan.@.com')
        expect(instance.state.fields.password).toBe('mohan123')
        expect(instance.state.isValid).toBe(true);
    })

    it('should have a btn component', ()=> {
        const wrapper = shallow(<Login />);
        
        expect(wrapper.find('Button')).toHaveLength(1);
        expect(wrapper.find('Button').type().defaultProps.type).toEqual('button');
        expect(wrapper.find('Button').text()).toEqual('Login');
    });
});
    
    