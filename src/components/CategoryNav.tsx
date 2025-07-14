
interface props{
    categories:{slug:string, name:string}[];
    activeCat: string | null;
    handleCategoryClick: (slug:string) => void;
    categoryWrapperRefs: React.MutableRefObject<HTMLElement | null>;
    catWrapperClass: string | null;
}

const CategoryNav = ((props:props) => {

    const {categories, activeCat, handleCategoryClick, categoryWrapperRefs, catWrapperClass } = props;

    return (
        <>
            <ul ref={(el) => {categoryWrapperRefs.current= el}} className={`category-wrapper hidden md:block ${
                catWrapperClass === "fixed"
                ? "fixed shadow-md transition-all duration-300 ease-in-out" 
                : "relative transition-all duration-300 ease-in-out"
                } w-full md:flex md:justify-center md:gap-6 p-2 bg-gray-500 text-white`}>
                {categories.map((categoryslug) => {

                    return (
                        <li 
                            key={categoryslug.slug}
                            onClick={()=> handleCategoryClick(categoryslug.slug)}
                            className={`${categoryslug.slug} pl-3 pr-3 pb-1 cursor-pointer`}
                        >{categoryslug.name}</li>
                    )
                })}
            </ul>
            {catWrapperClass === "fixed" && (
                <div className="h-[50px]"></div>
            )}
        </>
    )

});

export default CategoryNav;