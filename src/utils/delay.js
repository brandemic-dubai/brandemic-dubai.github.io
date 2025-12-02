/**
 * Delay utility - returns a promise that resolves after n milliseconds
 * @param {number} n - Delay in milliseconds (default: 2000)
 * @returns {Promise}
 */
export function delay(n) {
    n = n || 2000;

    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

