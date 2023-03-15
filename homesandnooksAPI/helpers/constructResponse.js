

const constructResponse = (data, message, caller) =>{
    const response = {
        status: "success",
        code: caller === "create" ? 201 : 200,
        message,
        data
    }

    return response;
}


module.exports = constructResponse;