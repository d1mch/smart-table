export function initFiltering(elements) {

    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const el = document.createElement('option');
                    el.value = name;
                    el.textContent = name;
                    return el;
                })
            );
        });
    };


    const applyFiltering = (query, state, action) => {


        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const container = action.parentElement;
            const input = container.querySelector(`[name="${field}"]`);

            if (input) {
                input.value = '';
                state[field] = '';
            }
        }

        const filter = {};

        Object.keys(elements).forEach(key => {
            const el = elements[key];
            if (
                el &&
                ['INPUT', 'SELECT'].includes(el.tagName) &&
                el.value
            ) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}
