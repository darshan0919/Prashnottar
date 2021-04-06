module.exports = {
    asyncFindIndex: async (elements, cb) => {
        for (const [index, element] of elements.entries()) {
            if (await cb(element, index, elements)) {
                return index;
            }
        }
        return -1;
    },
};
