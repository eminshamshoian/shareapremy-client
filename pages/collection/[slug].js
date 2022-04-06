import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCollectionJumbotron from "../../components/cards/SingleCollectionJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCollectionVideos from "../../components/cards/SingleCollectionVideos";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const SingleCollection = ({ collection }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState({});
  // context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && collection) checkSub();
  }, [user, collection]);

  const checkSub = async () => {
    const { data } = await axios.get(`/api/check-sub/${collection._id}`);
    setSubscribed(data);
  };

  const router = useRouter();
  const { slug } = router.query;

  const handlePaidSub = async () => {
    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already subscribed
      if (subscribed.status)
        return router.push(`/user/collection/${subscribed.collection.slug}`);
      const { data } = await axios.post(`/api/paid-sub/${collection._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Subscription failed, try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeSub = async (e) => {
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already subscribed
      if (subscribed.status)
        return router.push(`/user/collection/${subscribed.collection.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-sub/${collection._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/collection/${data.collection.slug}`);
    } catch (err) {
      toast("Subscription failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <SingleCollectionJumbotron
        collection={collection}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidSub={handlePaidSub}
        handleFreeSub={handleFreeSub}
        subscribed={subscribed}
        setSubscribed={setSubscribed}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />

      {collection.videos && (
        <SingleCollectionVideos
          videos={collection.videos}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(
    `${process.env.API}/collection/${query.slug}`
  );
  return {
    props: {
      collection: data,
    },
  };
}

export default SingleCollection;
