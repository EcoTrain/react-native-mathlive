import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {App} from '../App';

describe('Main page', () => {
  it('Render code correctly', () => {
    const component = render(<App />);
    expect(component).toMatchSnapshot();
  });
});
