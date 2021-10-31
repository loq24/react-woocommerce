import Link from "next/link";
import Image from "next/image";
import { ProductCategory } from "interfaces/interfaces";
import styles from "styles/components/CategoryList/CategoryItem.module.scss";

interface CategoryItemProps {
  category: ProductCategory;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const { image, slug, name, description } = category;
  return (
    <div className={styles.categoryItem}>
      <Link href={`/category/${slug}`}>
        <a className="relative w-full h-full">
          <Image
            src={image.sourceUrl}
            alt={image.altText}
            quality={100}
            layout="fill"
            className="clickable-img"
          />
          <div className="absolute py-2 px-3  flex flex-col bottom-4 left-4 bg-white text-black">
            <span className="font-semibold capitalize">{name}</span>
            {description && <span className="text-xs">{description}</span>}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoryItem;
