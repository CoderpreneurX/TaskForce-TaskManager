import axios from "axios";

axios.get('http://127.0.0.1:8000/noteopia/note/1/get-update-delete/').then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.error(error)
})