import { render, screen, waitFor } from '@testing-library/react';
import TwitterCombinedFeed from '../TwitterCombinedFeed';

jest.mock('react-twitter-embed', () => ({
  TwitterTweetEmbed: ({ tweetId }) => <div>tweet-{tweetId}</div>,
}));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: '1' }, { id: '2' }]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders tweets from API', async () => {
  render(<TwitterCombinedFeed handles={['a', 'b']} />);
  await waitFor(() => {
    expect(screen.getByText('tweet-1')).toBeInTheDocument();
    expect(screen.getByText('tweet-2')).toBeInTheDocument();
  });
});
