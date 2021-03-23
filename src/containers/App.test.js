import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import App from './App';

beforeAll(() => {
  jest.spyOn(window, 'fetch');  
});

test('renders successfully with a nice instructional message', () => {
  render(<App />);
  
  const linkElement = screen.getByText(/Click the button to hit the counter API./i);
  expect(linkElement).toBeInTheDocument();
});

test('clicking the button calls the API', async () => {
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({value: 42}) 
  });
  render(<App />);

  userEvent.click(screen.getByRole('button', {name: /Count!/i}));

  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(await screen.findByText(/The number of clicks is: 42/i)).toBeInTheDocument();
});

test('failed API call shows error message', async () => {
  window.fetch.mockResolvedValueOnce({
    ok: false
  });
  render(<App />);

  userEvent.click(screen.getByRole('button', {name: /Count!/i}));

  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(await screen.findByText(/Sorry, something unexpected happened, please try again./i)).toBeInTheDocument();
});


