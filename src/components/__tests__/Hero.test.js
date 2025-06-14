import { render, screen } from '@testing-library/react';
import Hero from '../Hero';
import { ProfileProvider } from '../../ProfileContext';

test('renders hero section', () => {
  render(
    <ProfileProvider>
      <Hero />
    </ProfileProvider>
  );
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/my name is juan/i)).toBeInTheDocument();
});
