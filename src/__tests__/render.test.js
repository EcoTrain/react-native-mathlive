import React from 'react';
import {render} from '@testing-library/react-native';
import {Mathfield} from '../App';
import {VirtualKeyboardElement} from '../editor/keyboard/keyboard';

beforeAll(done => {
  done();
});

afterAll(done => {
  done();
});

describe('Mathfield', () => {
  it('Render code correctly', () => {
    const component = render(<Mathfield />);
    expect(component).toMatchSnapshot();
  });
});

describe('VirtualKeyboardElement', () => {
  it('Render code correctly', () => {
    const component = render(<VirtualKeyboardElement />);
    expect(component).toMatchSnapshot();
  });
});
