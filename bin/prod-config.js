function init() {
    return new Promise((resolve) => {
        console.log('prod config');
        process.env.MONGODB_URI = "mongodb+srv://leane:43frBcSIZTP76FhQ@espl-hub.ybdgitg.mongodb.net/?retryWrites=true&w=majority/espl-hub";
        process.env.PORT = 3000;
        return resolve('ok');
    })
}

export {init};