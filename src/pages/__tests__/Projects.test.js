import { render, screen } from '@testing-library/react';
import Projects from '../Projects';
import { ProfileContext } from '../../ProfileContext';
import '../../i18n';

const renderWithProfile = (isWeb3) =>
  render(
    <ProfileContext.Provider value={{ isWeb3, toggleProfile: jest.fn() }}>
      <Projects />
    </ProfileContext.Provider>
  );

test('shows only web2 projects by default', () => {
  renderWithProfile(false);
  expect(screen.getByText(/angelstowinghva.com/i)).toBeInTheDocument();
  expect(screen.queryByText(/perionsol.xyz/i)).toBeNull();
});

test('shows web3 projects when profile toggled', () => {
  renderWithProfile(true);
  expect(screen.getByText(/perionsol.xyz/i)).toBeInTheDocument();
  expect(screen.queryByText(/angelstowinghva.com/i)).toBeNull();
});
