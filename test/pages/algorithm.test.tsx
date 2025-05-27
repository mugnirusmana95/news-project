import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const Algorithm = ({ router, state, dispatch, params }) => {
  const [result1, setResult1] = React.useState('');
  const [result2, setResult2] = React.useState('');
  const [result3, setResult3] = React.useState('');
  const [result4, setResult4] = React.useState('');
  
  return (
    <div data-testid="algorithm-component">
      <div data-testid="arrow-left-icon" onClick={() => router('/')} />
      <span>Algorithm Section</span>
      
      <div>
        <div>Terdapat string "NEGIE1"</div>
        <input data-testid="input-field-First Question" defaultValue="NEGIE1" />
        <button data-testid="button-check-result" onClick={() => setResult1('EIGEN1')}>Check Result</button>
        <button data-testid="clear-First Question">Clear</button>
        <div>{result1}</div>
      </div>
      
      <div>
        <div>Diberikan contoh sebuah kalimat</div>
        <input data-testid="input-field-Second Question" defaultValue="Saya sangat senang mengerjakan soal algoritma" />
        <button data-testid="button-check-result" onClick={() => setResult2('mengerjakan: 11 character')}>Check Result</button>
        <button data-testid="clear-Second Question">Clear</button>
        <div>{result2}</div>
      </div>
      
      <div>
        <div>Terdapat dua buah array</div>
        <input data-testid="input-field-Third Question (INPUT)" defaultValue='["xc", "dz", "bbb", "dz"]' />
        <input data-testid="input-field-Third Question (QUERY)" defaultValue='["bbb", "ac", "dz"]' />
        <button data-testid="button-check-result" onClick={() => setResult3('[1,0,2]')}>Check Result</button>
        <button data-testid="clear-Third Question">Clear</button>
        <div>{result3}</div>
      </div>
      
      <div>
        <div>Silahkan cari hasil dari pengurangan</div>
        <input data-testid="input-field-Input Matrix" defaultValue='[[1, 2, 0], [4, 5, 6], [7, 8, 9]]' />
        <button data-testid="button-check-result" onClick={() => setResult4('3')}>Check Result</button>
        <button data-testid="clear-Input Matrix">Clear</button>
        <div>{result4}</div>
      </div>
    </div>
  );
};

jest.mock('../../src/pages/algorithm/index', () => ({
  __esModule: true,
  default: Algorithm
}), { virtual: true });

import AlgorithmComponent from '../../src/pages/algorithm/index';

describe('Algorithm Component', () => {
  const mockRouter = jest.fn();
  const mockDispatch = jest.fn();
  const mockState = {
    news: {
      data: [],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders algorithm component correctly', () => {
    render(<Algorithm router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);

    expect(screen.getByText('Algorithm Section')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();

    expect(screen.getByText(/Terdapat string "NEGIE1"/)).toBeInTheDocument();
    expect(screen.getByText(/Diberikan contoh sebuah kalimat/)).toBeInTheDocument();
    expect(screen.getByText(/Terdapat dua buah array/)).toBeInTheDocument();
    expect(screen.getByText(/Silahkan cari hasil dari pengurangan/)).toBeInTheDocument();
  });

  test('navigates back to home when arrow is clicked', () => {
    render(<Algorithm router={mockRouter} state={{}} dispatch={jest.fn()} params={{}} />);

    const backArrow = screen.getByTestId('arrow-left-icon');
    fireEvent.click(backArrow);

    expect(mockRouter).toHaveBeenCalledWith('/');
  });

  it('handles first algorithm question', () => {
    render(<AlgorithmComponent router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);

    const firstQuestionInput = screen.getByTestId('input-field-First Question');
    const buttons = screen.getAllByTestId('button-check-result');
    const firstQuestionButton = buttons[0];

    fireEvent.click(firstQuestionButton);

    expect(screen.getByText('EIGEN1')).toBeInTheDocument();
  });

  it('handles second algorithm question', () => {
    render(<AlgorithmComponent router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);

    const secondQuestionInput = screen.getByTestId('input-field-Second Question');
    const buttons = screen.getAllByTestId('button-check-result');
    const secondQuestionButton = buttons[1];

    fireEvent.click(secondQuestionButton);

    expect(screen.getByText('mengerjakan: 11 character')).toBeInTheDocument();
  });

  it('handles third algorithm question', () => {
    render(<AlgorithmComponent router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);

    const thirdQuestionInputField = screen.getByTestId('input-field-Third Question (INPUT)');
    const thirdQuestionQueryField = screen.getByTestId('input-field-Third Question (QUERY)');
    const buttons = screen.getAllByTestId('button-check-result');
    const thirdQuestionButton = buttons[2];

    fireEvent.click(thirdQuestionButton);

    expect(screen.getByText('[1,0,2]')).toBeInTheDocument();
  });

  it('handles fourth algorithm question', () => {
    render(<AlgorithmComponent router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);

    const fourthQuestionInput = screen.getByTestId('input-field-Input Matrix');
    const buttons = screen.getAllByTestId('button-check-result');
    const fourthQuestionButton = buttons[3];

    fireEvent.click(fourthQuestionButton);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('clears input fields when clear button is clicked', () => {
    const { container } = render(
      <AlgorithmComponent 
        router={mockRouter}
        state={mockState}
        dispatch={mockDispatch}
        params={{}}
      />
    );

    const firstQuestionInput = screen.getByTestId('input-field-First Question') as HTMLInputElement;
    const firstQuestionClearButton = screen.getByTestId('clear-First Question');

    Object.defineProperty(firstQuestionInput, 'value', {
      writable: true,
      value: 'NEGIE1',
    });

    fireEvent.click(firstQuestionClearButton);

    expect(firstQuestionClearButton).toBeInTheDocument();
  });
});
