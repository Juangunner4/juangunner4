import { render, screen, fireEvent } from '@testing-library/react';
import SocialTabs from '../socials/SocialTabs';

test('switches tabs', () => {
  render(<SocialTabs />);
  expect(screen.getByText(/follow me on x/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: /instagram/i }));
  expect(screen.getByText(/follow me on instagram/i)).toBeInTheDocument();
});
