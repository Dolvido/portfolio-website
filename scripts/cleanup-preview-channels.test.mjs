import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanupPreviewChannels, previewPullNumber } from './cleanup-preview-channels.mjs';

const name = (id) => `projects/98314792537/sites/lukepayne/channels/${id}`;
const response = (body, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

test('never selects live, custom, malformed or another site/project channels', () => {
  for (const value of [name('live'), name('staging'), name('pr0-test'), name('pr1-../live'), name('pr1-test').replace('lukepayne', 'other'), name('pr1-test').replace('98314792537', '123'), undefined]) {
    assert.equal(previewPullNumber(value), null);
  }
  assert.equal(previewPullNumber(name('pr51-openclaw-native-fina')), 51);
});

test('paginates before cleanup and preserves open PRs and non-PR channels', async () => {
  const calls = [];
  const request = async (url, options) => {
    calls.push([String(url), options.method]);
    if (options.method === 'DELETE') return response({});
    if (String(url).includes('/pulls/')) return response({ number: Number(String(url).split('/').at(-1)), state: String(url).endsWith('/2') ? 'open' : 'closed' });
    return String(url).includes('pageToken=')
      ? response({ channels: [{ name: name('pr3-test') }] })
      : response({ channels: ['live', 'pr1-test', 'pr2-test', 'custom'].map(id => ({ name: name(id) })), nextPageToken: 'next' });
  };
  assert.equal(await cleanupPreviewChannels({ firebaseToken: 'test', githubToken: 'test', request, log() {} }), 2);
  assert.ok(calls[1][0].includes('pageToken=next'));
  assert.deepEqual(calls.filter(([, method]) => method === 'DELETE').map(([url]) => url.split('/').at(-1)), ['pr1-test', 'pr3-test']);
});

test('GitHub lookup failure aborts without deleting an unverified channel', async () => {
  let deleted = false;
  await assert.rejects(cleanupPreviewChannels({ firebaseToken: 'test', githubToken: 'test', log() {}, request: async (url, options) => {
    if (options.method === 'DELETE') deleted = true;
    return String(url).includes('/pulls/') ? response({}, 403) : response({ channels: [{ name: name('pr1-test') }] });
  } }), /HTTP 403/);
  assert.equal(deleted, false);
});

test('concurrent deletion tolerates 404 but fails on denied deletion', async () => {
  for (const status of [404, 403]) {
    const run = cleanupPreviewChannels({ firebaseToken: 'test', githubToken: 'test', log() {}, request: async (url, options) => {
      if (options.method === 'DELETE') return response({}, status);
      return response(String(url).includes('/pulls/') ? { number: 1, state: 'closed' } : { channels: [{ name: name('pr1-test') }] });
    } });
    if (status === 404) assert.equal(await run, 1);
    else await assert.rejects(run, /HTTP 403/);
  }
});
