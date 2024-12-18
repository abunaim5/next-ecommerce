import Layout from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import ProductItem from "components/product-item";
import type { ProductTypeList } from "types";
import { clearWishlist } from "store/reducers/wishlist";
import { toggleFavProduct } from "store/reducers/user";

const WishlistProducts = () => {
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  // clear favorite list when clicking clear all wishlist product
  const toggleFav = (id: string) => {
    dispatch(
      toggleFavProduct({
        id
      }),
    );
  };

  // clear all wishlist products
  const clearAllWishlist = () => {
    dispatch(
      clearWishlist()
    );
  };

  return (
    <Layout>
      <section className='wishlist'>
        <div className='container'>
          <div className='wishlist__intro'>
            <h1 className='wishlist__title'>Wishlist</h1>
            <button onClick={() => (clearAllWishlist(), wishlistItems.map(item => toggleFav(item.id)))} className={`btn btn--rounded btn--yellow ${wishlistItems.length === 0 ? 'btn--disabled' : ''}`}>Clear</button>
          </div>

          <div className='products-list'>
            {
              wishlistItems.length > 0 ? (wishlistItems.map((item: ProductTypeList, idx: number) => <ProductItem
                key={idx}
                id={item.id}
                name={item.name}
                price={item.price}
                color={item.color}
                currentPrice={item.currentPrice}
                images={item.images}
              />)) : (<div>Your wishlist is empty</div>)
            }
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WishlistProducts;