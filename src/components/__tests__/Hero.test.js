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
  expect(screen.getByText(/welcome to my corner/i)).toBeInTheDocument();
  expect(screen.getByText(/i'm juan, a full stack developer/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument();
});
