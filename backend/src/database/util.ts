const getConnectionString = (user: string, password: string, database: string) => {
    return `mongodb+srv://${user}:${password}@cluster0.s4pcz.mongodb.net/${database}?retryWrites=true&w=majority`
}

export {
    getConnectionString
}
