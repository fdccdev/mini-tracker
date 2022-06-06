export const getInfo = async (url) => {
    const is_not_in_index_of = -1
    if (url.indexOf('staticPageId') !== is_not_in_index_of ) {
        const variable = url.slice(0, 47) + '@' + url.slice(47)
        const response = await fetch(variable + '&format=json')
        const data = await response.json()
        return data.mainSection[0].rightSection[0].JSON
    } else if(url.indexOf('isLanding') !== is_not_in_index_of){
        const response = await fetch(url + '&format=json')
        const data = await response.json()
        return data.contents[0].mainSection[0].responseContentItems[0].JSON
    }
}
