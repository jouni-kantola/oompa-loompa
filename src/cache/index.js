let inMemoryStorage = [];

let cache = {
    setItem: (key, value) => {
        inMemoryStorage.push({ key, value });
    },
    getItem: key => {
        const item = inMemoryStorage.filter(item => item.key === key)[0];
        return item ? item.value : undefined;
    },
    removeItem: key => {
        inMemoryStorage = inMemoryStorage.filter(item => item.key !== key);
    }
};

function Cache(opts) {
    if (!opts) {
        return cache;
    }

    if (opts.noCache) {
        cache = undefined;
    } else if (opts.cache) {
        cache = opts.cache;
    } else if (hasStorage()) {
        if (opts.localStorage) {
            cache = window.localStorage;
        } else if (opts.sessionStorage) {
            cache = window.sessionStorage;
        }
    }

    return cache;
}

function hasStorage() {
    try {
        const uid = new Date().getTime().toString();
        window.localStorage.setItem(uid, uid);
        const match = window.localStorage.getItem(uid) === uid;
        window.localStorage.removeItem(uid);
        return match;
    } catch (e) {
        return false;
    }
}

module.exports = Cache;