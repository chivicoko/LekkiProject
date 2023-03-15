const { default: userService } = require("../services/userService");

const fetchData = (method, url, data) => {

    
    let pack;
    if (method === "post" || method === "put") {
        pack = {
            method,
            body: JSON.stringify(data),
            headers:{"content-type": "application/json", "Authorization": `Bearer ${userService.getToken()}`},
        } 

        // console.log(userService.getToken());
    }else{
        pack = {
            method,
            headers:{"content-type": "application/json", "Authorization": `Bearer ${userService.getToken()}`},

        }
        // console.log(userService.getToken());
    }
    
    const resp = userService.updateToken(30)
        .then(() => {
            const response = fetch(url, pack)
                .then(res => {
                    return (res.json());
                })
                .then(data => {
                    return data;
                })
                .catch((err) =>{
                    return "err";
            });

            return response;
        })
        .catch((err)=> {
            return err
        });

    return resp;
}

// userService.updateToken(fetchData);

module.exports = fetchData;