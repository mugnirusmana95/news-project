import React from 'react';

// Suppress console.log messages in tests
const originalLog = console.log;
console.log = function() {
  // Do nothing to suppress logs during tests
};

// Mock the components that are causing issues in tests
jest.mock('@react-icons/all-files/io5/IoPerson', () => ({
  IoPerson: () => <div data-testid="io-person-icon">IoPerson Icon</div>
}));

jest.mock('@react-icons/all-files/ai/AiOutlineArrowLeft', () => ({
  AiOutlineArrowLeft: () => <div data-testid="arrow-left-icon">Arrow Left Icon</div>
}));

// Mock the Alert component
jest.mock('../../src/components/alert', () => ({
  __esModule: true,
  default: ({ show, title, message, onClose }: any) => (
    <div data-testid="alert-component" data-show={show} data-title={title} data-message={message}>
      {title && <div>{title}</div>}
      {message && <div>{message}</div>}
      {onClose && <button onClick={onClose}>Close</button>}
    </div>
  )
}));

// Mock the Loader component
jest.mock('../../src/components/loader', () => ({
  __esModule: true,
  default: ({ show }: any) => (
    <div data-testid="loader-component" data-show={show}>
      Loading...
    </div>
  )
}));

// Mock the Input component
jest.mock('../../src/components/input', () => {
  const Input = ({ 
    value, 
    onChange, 
    onClear, 
    label, 
    placeholder, 
    isError, 
    message 
  }: any) => (
    <div data-testid="input-component">
      {label && <label>{label}</label>}
      <input 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => onChange({ 
          value: e.target.value, 
          isError: false, 
          message: '' 
        })} 
        data-error={isError} 
      />
      {message && <div>{message}</div>}
      {onClear && <button onClick={() => onClear({ value: '', isError: false, message: '' })}>Clear</button>}
    </div>
  );
  
  return {
    __esModule: true,
    default: Input,
    dataInputType: {
      value: '',
      isError: false,
      message: ''
    }
  };
});

// Mock the Button component
jest.mock('../../src/components/button', () => ({
  __esModule: true,
  default: ({ label, onClick, disabled }: any) => (
    <button 
      data-testid="button-component" 
      onClick={onClick} 
      disabled={disabled}
    >
      {label}
    </button>
  )
}));
