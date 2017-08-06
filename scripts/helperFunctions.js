function cloneObject(oldObject) {
    /*
     * Returns a clone of an object
     */
    return JSON.parse(JSON.stringify(oldObject));
}
