import ProductCard from '../ProductCard'
import samsungImage from '@assets/generated_images/Samsung_flagship_phone_product_aa170b09.png'

export default function ProductCardExample() {
  return (
    <div className="max-w-sm">
      <ProductCard
        id="1"
        name="Samsung Galaxy S24 Ultra 5G 256GB"
        brand="Samsung"
        price={3299000}
        compareAtPrice={3899000}
        image={samsungImage}
        rating={4.8}
        reviewCount={324}
        freeShipping={true}
        stock={15}
      />
    </div>
  )
}
