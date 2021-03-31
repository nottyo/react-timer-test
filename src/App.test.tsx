import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';

test('renders click me button', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('click-me')).toBeInTheDocument();
});

test('name appears when click me', async () => {
  // given
  const response = {
    userId: 1,
    id: 1,
    title: 'nottyo',
    completed: false,
  }
  const firstResponse = {
    userId: 1,
    id: 1,
    title: 'abc',
    completed: false,
  }
  const mockFetchResponse = {
    json: jest.fn().mockReturnValueOnce(firstResponse).mockReturnValue(response),
  }
  window.fetch = jest.fn().mockReturnValue(mockFetchResponse)
  // when
  const { getByTestId } = render(<App />);
  fireEvent.click(getByTestId('click-me'))
  // then
  await waitFor(() => {
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(getByTestId('name')).toHaveTextContent('nottyo');
  }, {
    timeout: 3000, // number of setInterval() interval * number of retry time + 1 sec
  })
})