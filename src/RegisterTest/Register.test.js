import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import Registration from "../component/Registration";

configure({adapter: new Adapter()});
const wrapper = shallow(<Registration />);
const instance = wrapper.instance();

describe('<Registration/>',() => {
     
   it('userName check',()=>
    {
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'fullName', value: 'Sube'}});
        expect(wrapper.state('fullName')).toEqual('Sube');
        expect(instance.state.props.fullName).toBe('Sube')
        expect(instance.state.isValid).toBe(true);
    })

    it('password check',()=>{
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'Sube@007'}});
        expect(wrapper.state('password')).toEqual('Sube@007');
        expect(instance.state.props.password).toBe('Sube@007')
        expect(instance.state.isValid).toBe(true);
    })

    it('register check with right data',()=>{
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'fullName', value: 'Sube'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'sube@007'}});
        expect(instance.props.state.password).toBe('sube@007')
        expect(instance.state.isValid).toBe(true);
    })

    it('register check with wrong data',()=>{
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'fullName', value: 'Sube'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'mubE@008'}});
        expect(instance.props.state.password).toBe('sube@007')
        expect(instance.state.isValid).toBe(true);
    })

    it("Checking the fullName inside the value Register Component", () => {
        const component = shallow(<Registration />);
        const form = component.find('fullName');
        form.props().onChange({target: { name: 'fullName',value: 'Subedar' }});
        expect(component.state('fullName')).toEqual('Subedar');
      });
 
    it('change handler working ', () => {
        wrapper.find(TextField).simulate('change',{target: {name:'fullName',value: 'Subedar'}})
        wrapper.find(TextField).simulate('change',{target: {name:'password',value: 'sube@007'}})
        expect(instance.state.props.fullName).toBe('Subedar')
        expect(instance.state.props.password).toBe('sube@007')
        expect(instance.state.isValid).toBe(true);
    })

});