import { render, screen } from '@testing-library/react';
import App from './App';

test('renders banking portal login screen', () => {
  render(<App />);

  expect(screen.getByText(/secure access for your financial dashboard/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /tpipay hero/i })).toBeInTheDocument();
});
