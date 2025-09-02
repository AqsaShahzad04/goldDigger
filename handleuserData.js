export async function handleFormData(req) {
    let data = ''
    for await (let chunk of req) {
        data+=chunk
    }
    return JSON.parse(data)
}