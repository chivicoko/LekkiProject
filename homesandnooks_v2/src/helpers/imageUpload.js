

const imageUpload = (image, url, pId) => {
    const fd = new FormData();
    fd.append('image', image);
    fd.append('id', pId);

    let pack = {
        method: "post",
        body: fd,
    }

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
}

module.exports = imageUpload;