import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Homme from "@/views/Homme.vue";
import Femme from "@/views/Femme.vue";
import Products from "@/views/Products.vue";
import Category from "@/views/Category.vue";
import ProductView from "@/views/ProductView.vue";
import OrderCheckout from "@/views/OrderCheckout.vue"
import Login from "@/components/auth/Login.vue";
import GetCode from "@/components/auth/GetCode.vue";
import Livraison from "@/components/Livraison.vue";
import AddressForm from "@/components/AddressForm.vue";
import AddressSelection from "@/components/AddressSelection.vue"
import Paiement from "@/components/Paiement.vue";
import Visa from "@/components/Visa.vue";
import Summary from "@/components/Summary.vue";
import CommandeConfirme from "@/components/CommandeConfirme.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/homme",
            name: "Homme",
            component: Homme,
        },
        {
            path: "/femme",
            name: "Femme",
            component: Femme,
        },
        {
            path: "/products/:gendre",
            name: "Products",
            component: Products,
            props: true,
            children: [
                {
                    path: ":category",
                    name: "Category",
                    component: Category,
                    props: true,
                    children: [
                        {
                            path: ":productid",
                            name: "ProductView",
                            component: ProductView,
                            props: true,
                        },
                    ],
                },
            ],
        },
        {
            path: "/order-checkout",
            name: "OrderCheckout",
            component: OrderCheckout,
            children: [
                {
                    path: "donnees",
                    name: "Login",
                    component: Login,
                },
                {
                    path: "donnees-get-code",
                    name: "donnees-get-code",
                    component: GetCode,
                },
                {
                    path: "shipping-types",
                    name: "shipping-types",
                    component: Livraison
                },
                {
                    path: "address-form/:id?", // le ? indique que l id est optionel
                    name: "AddressForm",
                    component: AddressForm
                },
                {
                    path: "address-selection",
                    name: "AddressSelection",
                    component: AddressSelection
                },
                {
                    path: "paiement",
                    name: "Paiement",
                    component: Paiement
                },
                {
                    path: "visa",
                    name: "Visa",
                    component: Visa,
                },
                {
                    path: "summary",
                    name: "Summary",
                    component: Summary,
                },
                {
                    path: "commande-confirme",
                    name: "CommandeConfirme",
                    component: CommandeConfirme
                },
            ],
        },
    ],
});

export default router;
