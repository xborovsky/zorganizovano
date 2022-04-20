export const getChainedCategories = categories => {
    return categories.map(category => categoryToChain(category)).sort((a, b) => a.name.localeCompare(b.name));
};

const categoryToChain = category => {
    return {
        id : category.id,
        name : chainName(category)
    };
};

const chainName = category => {
    const names = [];
    let current = category;
    while (current.parent != null) {
        names.push(current.name);
        current = current.parent;
    }
    names.push(current.name);

    let result = '';
    names.reverse().forEach(name => result += name + '->');
    return result.substring(0, result.length - 2);
};