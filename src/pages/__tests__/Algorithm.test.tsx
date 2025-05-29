import { NavigateFunction } from '../PageType';

describe('Algorithm Page Logic', () => {
  const mockRouter: NavigateFunction = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should navigate back to home when clicking back arrow', () => {
    mockRouter('/');
    expect(mockRouter).toHaveBeenCalledWith('/');
  });
  
  test('should solve first question correctly', () => {
    const reverseAlphabetKeepNumbers = (input: string): string => {
      const result = input.split('');
      let numberOnly = '';
      const stringOnly = result.filter((item: string) => {
        const regexAlphabet = /^[a-zA-Z]*$/;
        if (regexAlphabet.test(item)) {
          return true;
        } else {
          numberOnly += item;
          return false;
        }
      });
      const stringReverse = stringOnly.reverse().join('');
      return stringReverse + numberOnly;
    };
    
    expect(reverseAlphabetKeepNumbers('NEGIE1')).toBe('EIGEN1');
    
    expect(reverseAlphabetKeepNumbers('HELLO123')).toBe('OLLEH123');
  });
  
  test('should solve second question correctly', () => {
    const findLongestWord = (sentence: string): { word: string, length: number } => {
      const words = sentence.split(' ');
      let longestWord = '';
      words.forEach((word: string) => {
        if (word.length > longestWord.length) longestWord = word;
      });
      return { word: longestWord, length: longestWord.length };
    };
    
    const result1 = findLongestWord('Saya sangat senang mengerjakan soal algoritma');
    expect(result1.word).toBe('mengerjakan');
    expect(result1.length).toBe(11);
    
    const result2 = findLongestWord('The quick brown fox jumps over the lazy dog');
    expect(result2.word).toBe('quick');
    expect(result2.length).toBe(5);
  });
  
  test('should solve third question correctly', () => {
    const countOccurrences = (input: string[], query: string[]): number[] => {
      let result: number[] = [];
      for (const q of query) {
        let count = 0;
        for (const i of input) {
          if (q === i) count++;
        }
        result.push(count);
      }
      return result;
    };
    
    const input = ['xc', 'dz', 'bbb', 'dz'];
    const query = ['bbb', 'ac', 'dz'];
    const result = countOccurrences(input, query);
    
    expect(result).toEqual([1, 0, 2]);
  });
  
  test('should solve fourth question correctly', () => {
    const calculateDiagonalDifference = (matrix: number[][]): number => {
      let firstDiagonal = 0;
      for (let i = 0; i < matrix.length; i++) {
        firstDiagonal += matrix[i][i];
      }
      
      let secondDiagonal = 0;
      for (let i = 0; i < matrix.length; i++) {
        secondDiagonal += matrix[i][matrix.length - 1 - i];
      }
      
      return firstDiagonal - secondDiagonal;
    };
    
    const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
    const result = calculateDiagonalDifference(matrix);
    
    expect(result).toBe(3);
  });
  
  test('should validate inputs correctly', () => {
    const validateAlphanumeric = (input: string): boolean => {
      return /^[a-zA-Z0-9]*$/.test(input);
    };
    
    expect(validateAlphanumeric('NEGIE1')).toBe(true);
    expect(validateAlphanumeric('HELLO123')).toBe(true);
    
    expect(validateAlphanumeric('HELLO@#$')).toBe(false);
  });
});
