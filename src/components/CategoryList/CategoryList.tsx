import { ProductCategory } from "interfaces";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: ProductCategory[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="flex flex-row flex-wrap justify-between mb-20">
      {categories.map((category) => (
        <CategoryItem key={category.slug} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
