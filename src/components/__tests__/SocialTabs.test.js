import { render, screen, fireEvent } from '@testing-library/react';
import SocialTabs from '../socials/SocialTabs';
import { ProfileProvider } from '../../ProfileContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../../i18n';

jest.mock('@mui/material/useMediaQuery');

test('calls setValue when different tab selected', () => {
  useMediaQuery.mockReturnValue(false);
  const setValue = jest.fn();
  render(
    <ProfileProvider>
      <SocialTabs value="x" setValue={setValue} />
    </ProfileProvider>
  );
  fireEvent.click(screen.getByRole('tab', { name: /instagram/i }));
  expect(setValue).toHaveBeenCalledWith('instagram');
});

test('renders scrollable tabs on small screens', () => {
  useMediaQuery.mockReturnValue(true);
  const setValue = jest.fn();
  const { container } = render(
    <ProfileProvider>
      <SocialTabs value="x" setValue={setValue} />
    </ProfileProvider>
  );
  const tabsRoot = container.querySelector('.MuiTabs-root');
  expect(tabsRoot.className).not.toMatch(/MuiTabs-centered/);
});
