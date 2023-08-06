import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';

import { InputBase, Button } from "@mui/material";
import { useContext, useState } from "react";
import productsContext from "../../context/products.context";
import filterProductsContext from "../../context/filterProducts.context";

let searchBtnStyle = {
    color: "grey",
    backgroundColor: "#f5f5f6",
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    padding: "7px",
    paddingBottom: "8px"
}

const SearchContainer = styled(InputBase)`
    
    width:400px;
    border: 0.5px solid #f5f5f6;
    background: #f5f5f6;
    border-top-left-radius: 21px;
	border-bottom-left-radius: 21px;
    font-size: 14px;
    height: 45px;
    padding: 12px;
    color:#696e79;

`

function Search() {
    const { productList } = useContext(productsContext);
    const { setFilterProducts } = useContext(filterProductsContext);
    const [searchProd, setSearchProd] = useState("");

    if (searchProd === "") {
        setFilterProducts(productList)
    }


    const handleSearch = (e) => {

        const searchTerm = e.target.value.toLowerCase();
        setSearchProd(searchTerm);
        const newFilterProds = productList.reduce((newItem, item) => {
            if (item.name.toLowerCase().includes(searchTerm)) {
                newItem.push(item);
            }
            return newItem;
        }, []);

        setFilterProducts(newFilterProds);
    };

    return (
        <>
            <SearchContainer onChange={handleSearch} placeholder="Search for products" />
            <Button style={searchBtnStyle}>
                <SearchIcon style={{ fontSize: 30 }} />
            </Button>
        </>
    )

}
export default Search;