import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { ProfileProvider } from '../../ProfileContext';
import '../../i18n';

const setup = () =>
  render(
    <ProfileProvider>
      <MemoryRouter initialEntries={["/profile=web2"]}>
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
  const button = screen.getByRole('button', { name: /\u2630/i });
  fireEvent.click(button);
  expect(screen.getAllByText(/home/i).length).toBeGreaterThan(1);
});

  test('language buttons present', () => {
    setup();
    expect(screen.getAllByRole('button', { name: /english/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /español/i }).length).toBeGreaterThan(0);
  });

  test('profile tag toggles between web2 and web3', () => {
    setup();
    const pfpButton = screen.getByRole('button', { name: /profile/i });
    expect(screen.getByText(/web2/i)).toBeInTheDocument();
    fireEvent.click(pfpButton);
    expect(screen.getByText(/web3/i)).toBeInTheDocument();
  });
