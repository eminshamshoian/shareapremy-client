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
          <h4>{name}</h4>
          <p>by {creator.name}</p>
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className='pb-2 mr-2'
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
