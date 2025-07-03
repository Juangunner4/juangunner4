import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { ProfileProvider } from '../../ProfileContext';

const setup = () =>
  render(
    <ProfileProvider>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </ProfileProvider>
  );

test('renders navigation links', () => {
  setup();
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /book now/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
});

test('opens drawer when hamburger clicked', () => {
  setup();
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getAllByText(/home/i).length).toBeGreaterThan(1);
});
