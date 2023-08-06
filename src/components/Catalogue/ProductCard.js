import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
      <div className="card" key={product.id} onClick={() => { navigate(`/product/${product.id}`) }} style={{ cursor: "pointer" }}>
        <img className="card-img" src={product.otherImages[0]} alt={product.name} />
        <div className="card-title">{product.name}</div>
        <p>{product.description}</p>
        <div style={{ fontSize: 16 }}>Rs.{product.finalPrice} <span className="cut"> {product.strickPrice}</span> <span style={{ color: "#d61b60" }}>{product.discount}% OFF</span></div>
      </div>
  );
}

export default ProductCard;
