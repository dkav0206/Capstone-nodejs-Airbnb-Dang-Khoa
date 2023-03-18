const getName = () => {
    console.log("Hellow world");
}

const getNumber = () => {
    console.log(213);
}

//ES export
// Export 1 thằng
// export default getName

// export {
//     getName,
//     getNumber
// }

// CommonJS export
module.exports = {
    getName,
    getNumber
}