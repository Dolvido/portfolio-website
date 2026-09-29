import { pathToFileURL } from 'node:url';

const channelRoot = 'https://firebasehosting.googleapis.com/v1beta1/projects/lukepayne/sites/lukepayne/channels';
const pullRoot = 'https://api.github.com/repos/Dolvido/portfolio-website/pulls';

// Only channels made by this repository's PR deploy action are eligible.
export function previewPullNumber(name) {
  const match = /^projects\/(?:lukepayne|98314792537)\/sites\/lukepayne\/channels\/pr([1-9][0-9]*)-[a-z0-9-]+$/.exec(name ?? '');
  return match ? Number(match[1]) : null;
}

export async function cleanupPreviewChannels({ firebaseToken, githubToken, request = fetch, log = console.log }) {
  async function read(url, token, method = 'GET') {
    const response = await request(url, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(30000),
    });
    // Another preview run may have removed this same closed-PR channel.
    if (method === 'DELETE' && response.status === 404) return {};
    if (!response.ok) throw new Error(`${method} ${new URL(url).hostname} failed (HTTP ${response.status})`);
    return response.json();
  }

  // Finish pagination before deleting so deletion cannot shift page boundaries.
  const channels = [];
  const seenTokens = new Set();
  let pageToken = '';
  do {
    const url = new URL(channelRoot);
    url.searchParams.set('pageSize', '100');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const page = await read(url, firebaseToken);
    channels.push(...(page.channels ?? []));
    pageToken = page.nextPageToken ?? '';
    if (pageToken && seenTokens.has(pageToken)) throw new Error('Repeated channel page token');
    seenTokens.add(pageToken);
  } while (pageToken);

  let deleted = 0;
  for (const channel of channels) {
    const number = previewPullNumber(channel.name);
    if (number === null) continue;
    const pull = await read(`${pullRoot}/${number}`, githubToken);
    if (pull.number !== number || pull.state !== 'closed') continue;
    const channelId = channel.name.split('/').at(-1);
    await read(`${channelRoot}/${channelId}`, firebaseToken, 'DELETE');
    log(`Removed closed PR #${number} preview: ${channelId}`);
    deleted += 1;
  }
  log(`Preview cleanup complete: ${deleted} closed-PR channels removed.`);
  return deleted;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT || !process.env.GITHUB_TOKEN) {
      throw new Error('Preview cleanup requires Firebase and GitHub credentials');
    }
    const { cert } = await import('firebase-admin/app');
    const credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
    const { access_token: firebaseToken } = await credential.getAccessToken();
    await cleanupPreviewChannels({ firebaseToken, githubToken: process.env.GITHUB_TOKEN });
  } catch (error) {
    // Do not print SDK error objects, which can contain credential material.
    console.error('Preview cleanup failed. Check Firebase Hosting permissions and API availability.');
    process.exitCode = 1;
  }
}
