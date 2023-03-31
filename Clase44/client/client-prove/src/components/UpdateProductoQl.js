import { useEffect} from "react";
import axios from "axios";

const UpdateProductQl = () => {
    useEffect(() => {
        const sync = async () => {
            let data = JSON.stringify({
                query: `mutation{
                    updateProduct(id:"6420a9b1c95112787c171a8d", input:{
                    price:"25000"
                    })
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

export default UpdateProductQl