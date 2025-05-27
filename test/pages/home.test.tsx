import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/home';

describe('Home Component', () => {
  const mockRouter = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders home component correctly', () => {
    render(<Home router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
  });

  test('navigates to News page when News link is clicked', () => {
    render(<Home router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);
    
    fireEvent.click(screen.getByText('News'));
    
    expect(mockRouter).toHaveBeenCalledWith('/news');
  });

  test('navigates to Algorithm page when Algorithm link is clicked', () => {
    render(<Home router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);
    
    fireEvent.click(screen.getByText('Algorithm'));
    
    expect(mockRouter).toHaveBeenCalledWith('/algorithm');
  });
});
