import Footer from "components/footer";
import Layout from "../layouts/Main";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ProductItem from "components/product-item";
import { ProductTypeList } from "types";

const WishlistProducts = () => {
    const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
    // console.log('Wishlist items', wishlistItems);

    return (
        <Layout>
            <section className='wishlist'>
                <div className='container'>
                    <h1 className='wishlist__title'>Wishlist</h1>
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
            <Footer />
        </Layout>
    );
};

export default WishlistProducts;