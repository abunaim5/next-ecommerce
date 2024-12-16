import { some } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import type { ProductStoreType, ProductType, ProductTypeList } from "types";

import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import CheckboxColor from "../../products-filter/form-builder/checkbox-color";
import { addProductToWishlist, removeProductFromWishlist } from "store/reducers/wishlist";
import Trash from "assets/icons/trash";

type ProductContent = {
  product: ProductType;
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");
  const { id, name, price, color: colors, images, discount, currentPrice } = product;

  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      }),
    );
  };

  const addToCart = () => {
    const productToSave: ProductStoreType = {
      id: id,
      name: name,
      thumb: images ? images[0] : "",
      price: currentPrice,
      count,
      color,
      size: itemSize,
    };

    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(addProduct(productStore));
  };

  // add wishlist product in localstorage
  const addToWishlist = () => {
    const saveWishlistProduct: ProductTypeList = {
      id,
      name,
      price,
      color: colors,
      images,
      discount,
      currentPrice
    };

    const wishlistProductStore = {
      product: saveWishlistProduct,
    };

    dispatch(addProductToWishlist(wishlistProductStore));
  };

  // remove wishlist product from localstorage
  const removeFromWishlist = () => {
    dispatch(
      removeProductFromWishlist({
        id,
        name,
        price,
        color: colors,
        images,
        discount,
        currentPrice
      }),
    );
  };

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:
          <br />
          {product.id}
        </h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.name}</h2>

        <div className="product__prices">
          <h4>${product.currentPrice}</h4>
          {product.discount && <span>${product.price}</span>}
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {productsColors.map((type) => (
              <CheckboxColor
                key={type.id}
                type="radio"
                name="product-color"
                color={type.color}
                valueName={type.label}
                onChange={onColorSet}
              />
            ))}
          </div>
        </div>
        <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map((type) => (
                  <option key={type.id} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setCount(count - 1)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => (toggleFav(), isFavourite ? removeFromWishlist() : addToWishlist())}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""} wishlist_tooltip`}
            >
              {
                isFavourite ? <Trash /> : <i className="icon-heart" />
              }
              <span className="tooltip_top wishlist_tooltip_text">{isFavourite ? 'Remove Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
