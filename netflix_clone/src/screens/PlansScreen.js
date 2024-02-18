import { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase.js";
import { selectUser } from "../features/userSlice.js";
import {loadStripe} from "@stripe/stripe-js"
import { useSelector } from 'react-redux';

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const[subscription, setSubscription] = useState(null);

  useEffect(() => {
if(user && user.uid){db.collection("customers")
.doc(user.uid)
.collection("subscription")
.get()
.then((querySnapshot) => {
  querySnapshot.forEach(async (subscription)=>{

    setSubscription({
      role: subscription.data().role,
      current_period_end: subscription.data().current_period_end.seconds,
      current_period_start: subscription.data().current_period_start.seconds,
    });

  });
})
.cath(error=>{
  console.error("Error fetching subscription", error);
})}
    

  }, [user]);


  useEffect(() => {
    db.collection("products") //Provides access to the "products" collection in Firestore.
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        //Iterates over each document inside the querySnapshot.
        // Creates an object for each document, where the key is the document's id, and the value is the document's data.
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          //Burada, querySnapshot bir Firebase Firestore sorgusu sonucu elde edilen bir "snapshot"tir. Bu snapshot, belirli bir sorgu sonucu elde edilen belgelerin bir koleksiyonunu içerir. forEach döngüsü, her belgeyi temsil eden productDoc değişkeni ile çalışır.

          // productDoc değişkeni, her döngü adımında, koleksiyon içindeki bir belgeyi temsil eder. Yani, "products" koleksiyonundan her bir belge, bu döngü içinde productDoc değişkenine atanır. Bu belgelerin içerdiği verilere erişmek için productDoc.data() kullanılır.

          // Özetle, productDoc değeri, her bir belgeyi temsil eder ve bu belgeler, Firestore koleksiyonundan alınan bir sorgu sonucu olan querySnapshot içinde bulunur. Bu döngü, koleksiyon içindeki her belge üzerinde çalışır ve belgelerin verilerini işler.
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
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


    const docRef= await db.collection("customers").doc(user.uid).collection("checkout_sessions")
    .add({

      price:priceId,
      success_url:window.location.origin,
      cancel_url:window.location.origin,

    });

    docRef.onSnapshot(async(snap) => {

      const { error, sessionId } =snap.data();

      if(error)
      {
        alert(`An error occured: ${error.message}`);
      }

      if(sessionId)
      {
        const stripe= await loadStripe('pk_test_51OkrcgDzXZLfcrTblx2OkMXsCslmMYBZxX6OrX347BPhwMWAU2Jbrdizbd4BrXgj9xsrkHolCYX869vMugsV1L1G00gZ6BQTZn');

        stripe.redirectToCheckout({ sessionId });

      }

    })

  };

  return (
    <div className="plansScreen">
      <br/>

   {subscription && (
   <p>
    Renewal date: {" "}
    {new Date(
      subscription?.current_period_end*1000).toLocalDateString()}</p>
   )}

      {Object.entries(products).map(([productId, productData]) => {
        //add some logic to check if the user`s subscription is active...

        const isCurrentPackage = productData.name?.toLowerCase().inclueds(subscription?.role);
        return (
          <div 
          key={productId}
          className={`${isCurrentPackage &&
            "planScreen__plan--disabled"} "planScreen__plan"}`}>

            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => isCurrentPackage && loadCheckout(productData?.prices?.priceId)}>
              {!isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
