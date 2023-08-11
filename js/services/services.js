const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })
    return await res.json()
}
const getResources = async (url) => {
    const result = await fetch(url)
    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status} `)
    }

    return await result.json()
}

export {postData, getResources} 