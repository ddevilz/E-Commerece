class CustomError extends Error {
    constructor(code, message) {
        this.code = code
        this.message = message
    }
}

export default CustomError