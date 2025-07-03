import { render, screen, fireEvent } from '@testing-library/react';
import SocialTabs from '../socials/SocialTabs';
import { ProfileProvider } from '../../ProfileContext';

test('calls setValue when different tab selected', () => {
  const setValue = jest.fn();
  render(
    <ProfileProvider>
      <SocialTabs value="x" setValue={setValue} />
    </ProfileProvider>
  );
  fireEvent.click(screen.getByRole('tab', { name: /instagram/i }));
  expect(setValue).toHaveBeenCalledWith('instagram');
});
