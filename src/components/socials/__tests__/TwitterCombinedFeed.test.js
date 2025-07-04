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
      json: () => Promise.resolve([{ id: '1' }, { id: '2' }]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders tweets from API', async () => {
  render(
    <ProfileProvider>
      <TwitterCombinedFeed handles={['a', 'b']} />
    </ProfileProvider>
  );
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});
