import { render, screen, waitFor } from '@testing-library/react';
import TwitterCombinedFeed from '../TwitterCombinedFeed';
import { ProfileProvider } from '../../../ProfileContext';

jest.mock('react-twitter-embed', () => ({
  TwitterTweetEmbed: ({ tweetId }) => <div>tweet-{tweetId}</div>,
}));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: '1',
              public_metrics: { like_count: 1, retweet_count: 2, reply_count: 3 },
            },
            {
              id: '2',
              public_metrics: { like_count: 4, retweet_count: 5, reply_count: 6 },
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders tweets from API', async () => {
  render(
    <ProfileProvider>
      <TwitterCombinedFeed />
    </ProfileProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('tweet-1')).toBeInTheDocument();
    expect(screen.getByText('tweet-2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
