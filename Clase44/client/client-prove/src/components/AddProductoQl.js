import { useEffect } from "react";
import axios from "axios";

const AddProductQl = () => {

    useEffect(() => {
        const sync = async () => {
            let data = JSON.stringify({
                query: `mutation{
                createProduct(input:{
                name: "indicaDream",
                price: "18200"
                })
                {
                id,name, price
                }
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

export default AddProductQl