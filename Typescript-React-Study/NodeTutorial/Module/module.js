const moduleFunction = (name) => {
    return name;
}

const moduleObjectMap = (object) => {
    object.map(i => {
        console.log("Output");
    });
};

module.exports = {moduleFunction,moduleObjectMap};