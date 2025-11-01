import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../Hero';
import { ProfileProvider } from '../../ProfileContext';
import '../../i18n';

test('renders hero section', () => {
  render(
    <MemoryRouter>
      <ProfileProvider>
        <Hero />
      </ProfileProvider>
    </MemoryRouter>
  );
  expect(
    screen.getByText(/footballer and software engineer\./i),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /follow on x \(@juangunner4\)/i })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /follow on instagram \(@juangunner4\)/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /follow on tiktok/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /explore projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /about juan/i })).toBeInTheDocument();
});
