import { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../firebase.js";
import { selectUser } from "../features/userSlice.js";
import {loadStripe} from "@stripe/stripe.js"

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user=userSelector(selectUser);

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
      });
    setProducts(products);
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {


    const docRef= await db.collection('customers')
    .doc(user.uid).collection("checkout_sessions")
    .add({

      price:priceId,
      success_url:window.location.origin,
      cancel_url:window.location.origin,

    });

    docRef.onSnapshot(async(snap) => {

      const {error, sessionId} =snap.data();

      if(error)
      {
        alert(`An error occured: ${error.message}`);
      }

      if(sessionId)
      {
        const stripe= await loadStripe()
      }

    })

  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //add some logic to check if the user`s subscription is active...

        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData?.prices?.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}
