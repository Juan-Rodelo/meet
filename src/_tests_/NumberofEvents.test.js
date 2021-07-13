import React from 'react';
import { shallow } from 'enzyme';
import NumberofEvents from '../NumberofEvents';

xdescribe('<NumberofEvents /> component', () => {

  let numberFilter;

  beforeAll(() => {
    numberFilter = shallow(<NumberofEvents />);
  });

  test('render the number of events menu', () => {
    expect(numberFilter.find('.numberOfEvents')).toHaveLength(1);
  });
});