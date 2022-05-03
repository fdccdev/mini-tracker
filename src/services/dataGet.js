export const getInfo = async (url) => {
    const variable = url.slice(0, 47) + '@' + url.slice(47)
    const response = await fetch(variable + '&format=json')
    const data = await response.json()
    return data.mainSection[0].rightSection[0].JSON
}
