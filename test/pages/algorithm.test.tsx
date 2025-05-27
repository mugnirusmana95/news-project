import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Algorithm from '../../src/pages/algorithm';

describe('Algorithm Component', () => {
  const mockRouter = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders algorithm component correctly', () => {
    render(<Algorithm router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('Algorithm Section')).toBeInTheDocument();
  });

  test('has a back arrow icon', () => {
    render(<Algorithm router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);
    
    const backArrowContainer = screen.getByTestId('arrow-left-icon');
    expect(backArrowContainer).toBeInTheDocument();
  });

  test('handles algorithm questions', () => {
    render(<Algorithm router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);
    
    const buttons = screen.getAllByTestId('button-component');
    
    expect(buttons.length).toBeGreaterThan(0);
    
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
  });
});
