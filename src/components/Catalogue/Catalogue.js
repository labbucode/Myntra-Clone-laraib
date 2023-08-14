
import { Radio } from "@mui/material"
import { pink } from "@mui/material/colors";

import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productsContext from "../../context/products.context";
import filterProductsContext from "../../context/filterProducts.context";
function Catalogue() {

    const brands = ["HERE&NOW", "HIGHLANDER", "Roadster",
     "Dennis Lingo", "WROGN", "Mast & Harbour", "SASSAFRAS",
      "Kook N Keech","GAP","Berrylush", "Style Quotient", "KASSUALLY",
      "English Navy","GANT"]; 
    const [selectedBrands, setSelectedBrands] = useState([]);
    const { productList } = useContext(productsContext);
    const { filterProducts } = useContext(filterProductsContext)
    const [newFilterProds, setNewFilterProds] = useState(productList);

    useEffect(() => {
        setNewFilterProds(filterProducts);
    }, [filterProducts])

    const [gender, setGender] = useState("all");

    const handelGender = (event) => {
        const value = event.target.value;
        setGender(value);
        if (value === "all") {
            setNewFilterProds(productList);
        }
        else {
            const filteredData = productList.filter((item) => item.gender === value)
            setNewFilterProds(filteredData);

        }

    }

    

  const handelCheckBox = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedBrands((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedBrands((prevSelected) => prevSelected.filter((brand) => brand !== value));
    }
  };


    const handelPriceFilter = (e) => {
        const value = e.target.value;
        if (value === "option1") {
            setNewFilterProds(productList);
        } else if (value === "option2") {
            const sortedProducts = [...newFilterProds].sort(
                (a, b) => a.finalPrice - b.finalPrice
            );
            setNewFilterProds(sortedProducts);
        } else if (value === "option3") {
            const sortedProducts = [...newFilterProds].sort(
                (a, b) => b.finalPrice - a.finalPrice
            );
            setNewFilterProds(sortedProducts);
        } else {
            const sortedProducts = [...newFilterProds].sort(
                (a, b) => b.discount - a.discount
            );
            setNewFilterProds(sortedProducts);
        }
    };

    const handelClearAll = () => {
        setNewFilterProds(productList);
        setGender("all");
        setSelectedBrands([])
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        })

    }

    useEffect(() => {
        let filteredData = productList;
    
        if (selectedBrands.length > 0) {
          filteredData = productList.filter((item) =>
            selectedBrands.includes(item.name)
          );
        }
    
        if (gender !== "all") {
          filteredData = filteredData.filter((item) => item.gender === gender);
        }
    
        setNewFilterProds(filteredData);
      }, [selectedBrands, gender, productList]);



    return (
        <div className="catalogue">
            <div className="catalogue-menu">
                <div className="clear-filter">
                    <p>Filters {newFilterProds.length}</p>
                    <button onClick={handelClearAll}>CLEAR All</button>
                </div>
                <div className="gender">
                    <label htmlFor="gender" style={{ padding: "10px 5px", fontWeight: "bold" }}>Gender</label>
                    <div>
                        <Radio size="medium" value="all"
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                                padding: "5px"
                            }}
                            checked={gender === "all"}
                            onClick={handelGender}
                        />
                        <label htmlFor="men">All</label>
                    </div>
                    <div>
                        <Radio size="medium" value="M"
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                                padding: "5px"
                            }}
                            checked={gender === "M"}
                            onClick={handelGender}
                        />
                        <label htmlFor="men">Men</label>
                    </div>
                    <div>
                        <Radio size="medium" value="F"
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                                padding: "5px"
                            }}
                            checked={gender === "F"}
                            onClick={handelGender}
                        />
                        <label htmlFor="women">Women</label>
                    </div>
                </div>

                <div className="categories">
                    <label htmlFor="categories" style={{ padding: "10px 5px", fontWeight: "bold" }}>Brands</label>
                    {
                        brands.map((brand) => {
                            return (
                                <label key={brand} class="checkbox-container" onClick={handelCheckBox}>
                                    <input type="checkbox" value={brand} />
                                    <span class="checkmark"></span>
                                    {brand}
                                </label>
                            )
                        })
                    }
                </div>
            </div>


            <div className="display-products">
                <div className="dropdown-container">

                    <select className="dropdown" onChange={handelPriceFilter}>
                        Sort by:
                        <option value="option1">Recommended</option>
                        <option value="option2">Price: Low To High</option>
                        <option value="option3">Price: High To Low</option>
                        <option value="option4">Better Discount</option>
                    </select>
                </div>
                <div className="all-card">
                    {
                        newFilterProds.map((product) => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}
export default Catalogue;
