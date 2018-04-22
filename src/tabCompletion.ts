export interface Options {
    /**
     * Minimum length for the user input to match a value.
     * Default: 3
     */
    minLength: number;
}

/**
 * Get the maximum length of 'search' that fits in 'text'.
 * @param {string} text
 * @param {string} search
 * @return {number}
 */
const maxLength = (text: string, search: string): number => {
    for (let i = search.length; i > 0; i--) {
        const length = text.includes(search.slice(0, i)) ? i : 0;
        if (length > 0) {
            return i;
        }
    }
    return 0;
};

/**
 * Returns the Levenshtein distance between two strings.
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const levenshteinDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    if (a.length > b.length) {
        let swap = a;
        a = b;
        b = swap;
    }

    let row = Array(a.length + 1);
    for (let i = 0; i <= a.length; i++) {
        row[i] = i;
    }

    for (let i = 1; i <= b.length; i++) {
        let previous = i;
        for (let j = 1; j <= a.length; j++) {
            let value;
            if (b[i - 1] === a[j - 1]) {
                value = row[j - 1];
            } else {
                value = Math.min(row[j - 1] + 1,
                    Math.min(previous + 1,
                        row[j] + 1));
            }
            row[j - 1] = previous;
            previous = value;
        }
        row[a.length] = previous;
    }
    return row[a.length];
};

/**
 * Returns the best value based on the input or null if no match was found.
 * @param {string[]} values - The possible values to choose from.
 * @param {string} input - The user input.
 * @param {Options} options - The options.
 * @returns {(string|null)} - If a match was found, the corresponding value will be returned. Otherwise, null.
 */
export const tabComplete = (values: string[], input: string, options?: Options): string | null => {
    const minLength = options && options.minLength || 3;
    let matchDistance: number = Number.MAX_VALUE;
    let match: string | null = null;
    values.forEach(value => {
        if (maxLength(value, input) >= minLength) {
            const distance = levenshteinDistance(value, input);
            if (distance < matchDistance) {
                matchDistance = distance;
                match = value;
            }
        }
    });
    return match;
};
