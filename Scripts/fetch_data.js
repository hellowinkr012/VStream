async function fetchData(file) {
    try {
        let response=await fetch(file);
        let response_data=await response.json();
        return response_data;
    }
    catch(error) {
        console.error(`Data extraction error : ${error}`);
    }
};
