function init() {
    return new Promise((resolve) => {
        console.log('test config');
        process.env.MONGODB_URI = "mongodb://localhost:27017/espl-hub-test";
        process.env.PORT = 3000;
        return resolve('ok');
    })
}

export {init};