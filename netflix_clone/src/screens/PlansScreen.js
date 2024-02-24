import { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase.js";
import { selectUser } from "../features/userSlice.js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      const dbFirestore = getFirestore();
      const subscriptionsCollection = collection(
        dbFirestore,
        "customers",
        user.uid,
        "subscription"
      );

      getDocs(subscriptionsCollection)
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            setSubscription({
              role: subscription.data().role,
              current_period_end:
                subscription.data().current_period_end.seconds,
              current_period_start:
                subscription.data().current_period_start.seconds,
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching subscription", error);
        });
    }
  }, []);

  useEffect(() => {
    const dbFirestore = getFirestore();
    const productsCollection = collection(dbFirestore, "products");

    getDocs(productsCollection).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        // const priceSnap = await productDoc.ref.collection("prices").get();
        //Kodunuzda, productDoc.ref.collection("prices") ifadesini kullanarak prices koleksiyonuna erişmeye çalışıyorsunuz. Ancak Firestore Lite'da collection fonksiyonunu doğrudan bir belge referansına uygulamak mümkün değildir.
        // Bu hatayı düzeltmek için, belge referansını kullanarak collection fonksiyonunu çağırmak yerine doğrudan koleksiyon yolunu belirtmeniz gerekir.
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  console.log(products);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51OkrcgDzXZLfcrTblx2OkMXsCslmMYBZxX6OrX347BPhwMWAU2Jbrdizbd4BrXgj9xsrkHolCYX869vMugsV1L1G00gZ6BQTZn"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        //add some logic to check if the user`s subscription is active...

        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            // className={`${isCurrentPackage && "planScreen__plan--disabled"} "planScreen__plan`}
            className={
              isCurrentPackage
                ? "plansScreen__plan--disabled plansScreen__plan"
                : "plansScreen__plan"
            }
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                isCurrentPackage && loadCheckout(productData?.prices?.priceId)
              }
            >
              {!isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
