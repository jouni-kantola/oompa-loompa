import test from 'ava';
import cache from '../src/cache';

test('fallback to in memory', t => {
    t.truthy(cache().getItem);
});

test('use local storage', t => {
    t.truthy(cache({ localStorage: true }).getItem);
});

test('use session storage', t => {
    t.truthy(cache({ sessionStorage: true }).getItem);
});

test('define cache', t => {
    const own =  { cache: true };
    t.truthy(cache({ cache: own }).cache);
});

test('dont cache', t => {
    t.falsy(cache({ noCache: true }));
});
