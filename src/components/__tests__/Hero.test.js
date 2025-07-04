import { render, screen } from '@testing-library/react';
import Hero from '../Hero';
import { ProfileProvider } from '../../ProfileContext';
import '../../i18n';

test('renders hero section', () => {
  render(
    <ProfileProvider>
      <Hero />
    </ProfileProvider>
  );
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/my name is juan/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument();
});
