export function removeDB(type_col, item) {
    console.log('removedb', item)
    return this.$http.delete(`/${type_col}/${item.id}.json`)
}

export function insertDB(type_col, method, url, payload) {
    console.log('insertDB', type_col, method, url, payload)
    console.log('insert2', `/${type_col}${url}`)
    console.log('$$', this.$http[method](`/${type_col}${url}`, { ...payload }))
    return this.$http[method](`/${type_col}${url}`, { ...payload })
    //return insert
}
