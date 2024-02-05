function init() {
    return new Promise((resolve) => {
        console.log('prod config');
        process.env.MONGODB_URI = "mongodb+srv://leane:43frBcSIZTP76FhQ@espl-hub.ybdgitg.mongodb.net/espl-hub";
        process.env.PORT = 3000;
        process.env.SECRET_KEY = "1a10ba7b58780cf18174a1f648cb35b463345ec1f19e5c703ac4c7fb429122c7"
        return resolve('ok');
    })
}

export {init};
