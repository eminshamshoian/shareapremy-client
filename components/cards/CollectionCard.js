import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CollectionCard = ({ collection }) => {
  const { name, creator, price, image, slug, paid, category } = collection;
  return (
    <Link href={`/collection/${slug}`}>
      <a>
        <Card
          className='mb-4'
          style={{
            border: "none",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.103)",
            color: "#646464",
          }}
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />
          }
        >
          <h4 className='text-uppercase'>{name}</h4>
          <p className='text-uppercase'>by {creator.name}</p>
          <Badge
            count={category}
            style={{
              backgroundColor: "#1d0053",
              borderRadius: "0",
            }}
            className='mr-2 text-uppercase'
          />
          <h4 className='pt-2'>
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CollectionCard;
