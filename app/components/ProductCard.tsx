import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  slug: string; // ✅ Change id to slug
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ slug, name, price, image }) => {
  return (
    <Link
      href={`/product/${slug}`} // ✅ Use slug
      className="glass overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group"
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-purple-300">{name}</h3>
        <p className="text-pink-400 font-bold">${price.toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default ProductCard;
