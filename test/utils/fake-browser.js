const browserEnv = require('browser-env');
browserEnv(['window', 'document']);

let _localStorage = [];
let _sessionStorage = [];

function fakeStorage(storage) {
    return {
        setItem: (key, value) => {
            storage.push({ key, value });
        },
        getItem: key => {
            const item = storage.filter(item => item.key === key)[0];
            return item ? item.value : undefined;
        },
        removeItem: key => {
            storage = storage.filter(item => item.key !== key);
        }
    }
}

browserEnv().window.localStorage = fakeStorage(_localStorage);
browserEnv().window.sessionStorage = fakeStorage(_sessionStorage);
