var currentTime
var fetchTimer
var after = Date.now()
var denials = 0

imageContainer = document.getElementById("image-container")

function pollingFunction() {
    const postRequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ after }),
    }
    fetch("/latest", postRequestOptions)
        .then(handleErrors => handleErrors.json())
        .then(data => {
            after = data.timestamp
            data.images.forEach(image => {
                const img = documnet.createElement('img')
                img.src = `/uploads/${image}`
                imageContainer.prepend(img)
            })
        })
        .catch(error => {
            denials++
            if (denials == 2) {

                document.body.innerHTML = "Oops server is down. Please try again later";
                clearTimeout(fetchTimer);
            }
        });
    fetchTimer = setTimeout(pollingFunction, 5000)
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    errCount = 0;
    return response;
}

pollingFunction();
