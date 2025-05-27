# News App Test Suite

This directory contains unit tests for the News App React application.

## Test Structure

The tests are organized as follows:

- `pages/`: Contains tests for React components in the pages directory
  - `home.test.tsx`: Tests for the Home page
  - `news.test.tsx`: Tests for the News page
  - `news-detail.test.tsx`: Tests for the News Detail page
  - `all-news.test.tsx`: Tests for the All News page (news list)
  - `algorithm.test.tsx`: Tests for the Algorithm page

- `mocks/`: Contains mock implementations for testing
  - `redux-mock.ts`: Mock implementation of Redux store

- `utils/`: Contains utility functions for testing
  - `test-utils.tsx`: Custom render function for testing React components

- `setupTests.js`: Jest setup file
- `jest.config.js`: Jest configuration file

## Running Tests

You can run the tests using the following command:

```bash
npm run test:custom
```

This will run all the tests using the custom Jest configuration.

To run a specific test file, you can use:

```bash
npm run test:custom -- test/pages/home.test.tsx
```

## Test Coverage

The tests cover the following functionality:

1. **Home Page**:
   - Rendering of the component
   - Navigation to News and Algorithm pages

2. **News Page**:
   - Rendering of the component
   - API call on component mount
   - Navigation between pages
   - Display of news data
   - Error handling

3. **News Detail Page**:
   - Rendering of the component
   - Display of news detail data
   - Navigation between pages
   - Error handling

4. **All News Page (News List)**:
   - Rendering of the component
   - API call on component mount
   - Infinite scrolling functionality
   - Category filtering
   - Navigation between pages
   - Error handling

5. **Algorithm Page**:
   - Rendering of the component
   - Navigation back to home
   - Algorithm functionality for all questions
   - Input validation
