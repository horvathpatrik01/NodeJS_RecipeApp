/**
 * Egy object repo-ból tölti be az függőséget
 * @param objectRepository maga az object repo
 * @param propertyName függőség neve
 * @return {*}
 */

function reqOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
}

module.exports.reqOption = reqOption;