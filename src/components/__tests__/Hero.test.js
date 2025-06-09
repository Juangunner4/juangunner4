import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

test('renders hero section', () => {
  render(<Hero />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/my name is juan/i)).toBeInTheDocument();
});
