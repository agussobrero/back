import { useEffect} from "react";
import axios from "axios";

const DeleteProductQl = () => {
    useEffect(() => {
        const sync = async () => {
            let data = JSON.stringify({
                query: `mutation{
                    deleteProduct(id:"640d1908ccb37fd5b969c2b0")
                    {name, price}
                    }`,
                    variables: {}
                });
            const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/graphql',
            headers: { 
            'Content-Type': 'application/json'
            },
            data : data
        };
        const resp = await axios(config)
        console.log(resp)
        }
        sync()
    })
}

export default DeleteProductQl