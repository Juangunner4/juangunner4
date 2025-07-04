import { render, screen, waitFor } from '@testing-library/react';
import TwitchFeed from '../TwitchFeed';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            { id: '1', title: 'latest', thumbnail_url: 'thumb1' },
            { id: '2', title: 'prev1', thumbnail_url: 'thumb2' },
            { id: '3', title: 'prev2', thumbnail_url: 'thumb3' },
            { id: '4', title: 'prev3', thumbnail_url: 'thumb4' },
            { id: '5', title: 'prev4', thumbnail_url: 'thumb5' },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders latest and previous Twitch videos', async () => {
  render(<TwitchFeed />);
  await waitFor(() => {
    expect(screen.getByText(/Latest Twitch Stream/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/Previous Streams/i)).toBeInTheDocument();
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(4);
});
