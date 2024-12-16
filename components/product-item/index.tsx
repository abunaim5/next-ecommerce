import { some } from "lodash";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import { toggleFavProduct } from "store/reducers/user";
import { addProductToWishlist } from "store/reducers/wishlist";
import type { ProductTypeList } from "types";
import Trash from '../../assets/icons/trash'

const ProductItem = ({
  discount,
  images,
  color,
  id,
  name,
  price,
  currentPrice,
}: ProductTypeList) => {
  const dispatch = useDispatch();
  let location = window.location.pathname
  console.log(location);
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      }),
    );
  };

  // add wishlist product in localstorage
  const addToWishlist = () => {
    const saveWishlistProduct: ProductTypeList = {
      id: id,
      name: name,
      price: price,
      color: color,
      images: images,
      discount: discount,
      currentPrice: currentPrice
    };

    const wishlistProductStore = {
      product: saveWishlistProduct,
    };

    dispatch(addProductToWishlist(wishlistProductStore));
  };

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={() => { toggleFav(), isFavourite ? '' : addToWishlist() }}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""} wishlist_tooltip`}
        >
          {
            location !== '/wishlist' ? <i className='icon-heart' /> : <Trash />
          }
          <span className="wishlist_tooltip_text">{location === '/wishlist' ? 'Remove Wishlist' : isFavourite ? 'Browse Wishlist' : 'Add to Wishlist'}</span>
        </button>

        <Link href={`/product/${id}`}>
          <img src={images ? images[0] : ""} alt="product" />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>
      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={`product__price ${discount ? "product__price--discount" : ""}`}
        >
          <h4>${currentPrice}</h4>

          {discount && <span>${price}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
