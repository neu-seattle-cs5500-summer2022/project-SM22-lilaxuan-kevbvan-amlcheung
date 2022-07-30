// import TimeSelector from "../TimeSelector";
// import handleTimeSelect from "../TimeSelector";
// import React, { useState } from 'react';
// import { shallow } from 'enzyme';
// import Enzyme from 'enzyme';
// import { configure } from 'enzyme';
// import { Adapter } from "enzyme-adapter-react-16";

// configure({ adapter: new Adapter() });
// // Enzyme.configure({ adapter: new Adapter() });

// describe('<TimeSelector />', () => {
//   test("it should set the time", () => {
//     const myInitialState = '';

//     React.useState = jest.fn().mockReturnValue([myInitialState, {}])
//     // Enzyme.configure({ adapter: new Adapter() });
//     const wrapper = shallow(<TimeSelector />)

//     expect(wrapper.state()).toEqual("");

//     // // Cache original functionality
//     // const realUseState = React.useState
//     // // Stub the initial state
//     // const stubInitialState = "10:30"
//     // // Mock useState before rendering your component
//     // jest
//     //   .spyOn(React, 'useState')
//     //   .mockImplementationOnce(() => realUseState(stubInitialState))

//     const time = "10:30";

//     const output = "10:30";

//     expect(handleTimeSelect(time)).toEqual(output);

//   });
// });