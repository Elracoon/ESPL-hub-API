function init() {
    return new Promise((resolve) => {
        console.log('dev config');
        process.env.MONGODB_URI = "mongodb+srv://leane:43frBcSIZTP76FhQ@espl-hub.ybdgitg.mongodb.net/espl-hub-dev";
        process.env.PORT = 3000;
        return resolve('ok');
    })
}

export {init};