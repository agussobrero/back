import { BrowserRouter,Routes,Route } from "react-router-dom"
import ListaProductos from "../components/ListaProductos"
import AddProduct from "../components/AddProducto"
import UpdateProducto from "../components/UpdateProducto"
import DeleteProduct from "../components/DeleteProducto"
import ListaProductosQl from "../components/ListaProductosQl"
import AddProductQl from "../components/AddProductoQl"
import UpdateProductQl from "../components/UpdateProductoQl"
import DeleteProductQl from "../components/DeleteProductoQl"
import ListaProductosQlApollo from "../components/ListaProductosQlApollo"
import AddProductoQlApollo from "../components/AddProductoQlApollo"
import UpdateProductoQlApollo from "../components/UpdateProductoQlApollo"
import DeleteProductoQlApollo from "../components/DeleteProductoQlApollo"

const Rout = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/productos' element={<ListaProductos/>}/>
                <Route path='/addProducto' element={<AddProduct/>}/>
                <Route path="/updateProducto" element={<UpdateProducto/>}/>
                <Route path="/deleteProducto" element={<DeleteProduct/>}/>
                <Route path='/graphql' element={<ListaProductosQl/>}/>
                <Route path='/addProductoQl' element={<AddProductQl/>}/>
                <Route path='/updateProductoQl' element={<UpdateProductQl/>}/>
                <Route path="/deleteProductoQl" element={<DeleteProductQl/>}/>
                <Route path='/listaProductosQlApollo' element={<ListaProductosQlApollo/>}/>
                <Route path='/addProductoQlApollo' element={<AddProductoQlApollo/>}/>
                <Route path='/updateProductoQlApollo' element={<UpdateProductoQlApollo/>}/>
                <Route path='/deleteProductoQlApollo' element={<DeleteProductoQlApollo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rout