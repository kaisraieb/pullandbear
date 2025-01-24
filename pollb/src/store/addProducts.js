import {defineStore} from "pinia";

export const useAddProductsStore = defineStore("products", {
    state: () => ({
        products: [
            {
                id: 1,
                genre: "homme",
                category: "baggy",
                img1: "/jeans-homme/baggy1.webp",
                img2: "/jeans-homme/baggy11.webp",
                name: "Jean baggy loose",
                price: 159,
                qte: 0,
            },
            {
                id: 2,
                genre: "homme",
                category: "baggy",
                img1: "/jeans-homme/baggy2.webp",
                img2: "/jeans-homme/baggy21.webp",
                name: "Jean baggy",
                price: 199,
                qte: 0,
            },
            {
                id: 3,
                genre: "homme",
                category: "baggy",
                img1: "/jeans-homme/baggy3.webp",
                img2: "/jeans-homme/baggy31.webp",
                name: "Jean loose fit",
                price: 159,
                qte: 0,
            },
            {
                id: 4,
                genre: "homme",
                category: "superbaggy",
                img1: "/jeans-homme/superbaggy1.webp",
                img2: "/jeans-homme/superbaggy11.webp",
                name: "Jean super baggy",
                price: 219,
                qte: 0,
            },
            {
                id: 5,
                genre: "homme",
                category: "superbaggy",
                img1: "/jeans-homme/superbaggy2.webp",
                img2: "/jeans-homme/superbaggy12.webp",
                name: "Jean super baggy",
                price: 199,
                qte: 0,
            },
            {
                id: 6,
                genre: "homme",
                category: "skater",
                img1: "/jeans-homme/skater1.webp",
                img2: "/jeans-homme/skater11.webp",
                name: "Jean skater",
                price: 159,
                qte: 0,
            },
            {
                id: 7,
                genre: "homme",
                category: "skater",
                img1: "/jeans-homme/skater2.webp",
                img2: "/jeans-homme/skater21.webp",
                name: "Jean skater",
                price: 159,
                qte: 0,
            },
            {
                id: 8,
                genre: "homme",
                category: "standard",
                img1: "/jeans-homme/standard1.webp",
                img2: "/jeans-homme/standard11.jpg",
                name: "Jean standard",
                price: 139,
                qte: 0,
            },
            {
                id: 9,
                genre: "homme",
                category: "standard",
                img1: "/jeans-homme/standard2.jpg",
                img2: "/jeans-homme/standard21.jpg",
                name: "Jean standard",
                price: 139,
                qte: 0,
            },
            {
                id: 10,
                genre: "homme",
                category: "standard",
                img1: "/jeans-homme/standard3.jpg",
                img2: "/jeans-homme/standard31.jpg",
                name: "Jean standard",
                price: 139,
                qte: 0,
            },
            {
                id: 11,
                genre: "homme",
                category: "standard",
                img1: "/jeans-homme/standard4.jpg",
                img2: "/jeans-homme/standard41.jpg",
                name: "Jean standard",
                price: 139,
                qte: 0,
            },
            {
                id: 12,
                genre: "homme",
                category: "straight",
                img1: "/jeans-homme/straight1.webp",
                img2: "/jeans-homme/straight11.webp",
                name: "Jean straight",
                price: 139,
                qte: 0,
            },
            {
                id: 13,
                genre: "homme",
                category: "straight",
                img1: "/jeans-homme/straight2.jpg",
                img2: "/jeans-homme/straight21.jpg",
                name: "Jean straight",
                price: 159,
                qte: 0,
            },
            {
                id: 14,
                genre: "homme",
                category: "straight",
                img1: "/jeans-homme/straight3.jpg",
                img2: "/jeans-homme/straight31.jpg",
                name: "Jean straight",
                price: 159,
                qte: 0,
            },
        ],
        favoriteProducts: [],
        addedProducts: [],
    }),
    getters: {
        getAllProducts: (state) => state.products,
        getFavoriteProducts: (state) => state.favoriteProducts,
        getAddedProducts: (state) => state.addedProducts,
        getFavoriteProductsCount: (state) => state.favoriteProducts.length,
        getAddedProductsCount: (state) => state.addedProducts.length,
        getTotalPrice: (state) => {
            return state.addedProducts.reduce((total, product) => {
                return total + product.price * product.qte;
            }, 0);
        },
    },
    actions: {
        addFavoriteProduct(product) {
            this.favoriteProducts.push(product);
        },
        addAddedProduct(product) {
            const existingProduct = this.addedProducts.find((p) => p.id === product.id);

            if (existingProduct) {
                existingProduct.qte += 1;
            } else {
                this.addedProducts.push({...product, qte: 1});
            }
        },
        removeAddedProduct(addedProduct) {
            this.addedProducts = this.addedProducts.filter(
                (product) => product.id !== addedProduct.id
            );
        },
        removeFavoriteProduct(favoriteProduct) {
            this.favoriteProducts = this.favoriteProducts.filter(
                (product) => product.id !== favoriteProduct.id
            );
        },
        filterProducts(genre, category) {
            if (!category || category === "/") {
                return this.products.filter((product) => product.genre === genre);
            }
            return this.products.filter(
                (product) => product.genre === genre && product.category === category
            );
        },
    },
});