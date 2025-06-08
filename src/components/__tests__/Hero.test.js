import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

test('renders hero section', () => {
  render(<Hero />);
  expect(screen.getByText(/welcome to juangunner4/i)).toBeInTheDocument();
});
