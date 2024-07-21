import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { showErrorToast } from "../../utils/toast";
import { FaStar } from "react-icons/fa";

const product = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "#",
    breadcrumbs: [
        { id: 1, name: "Men", href: "#" },
        { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
            alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
            alt: "Model wearing plain black basic tee.",
        },
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
            alt: "Model wearing plain gray basic tee.",
        },
        {
            src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
            alt: "Model wearing plain white basic tee.",
        },
    ],
    colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Red", class: "bg-red-500", selectedClass: "bg-red-500" },
        { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton",
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


const categoryOptions = ['Office Wear', 'Sports Wear', "Mens's Ethnic Wear", "Men's Active Wear", "Women's Active Wear", "Sleepwear", "Inclusive Styles", "Inner Wear", "Women's Ethnic Wear", "Western Wear", "Casual Styles", "Lounge Wear", "Lingerie", "WFH Casual Wear"]

const ProductOverview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { state = {} } = useLocation();
    const { product: productState = {} } = state;
    const showSizeColor = categoryOptions?.includes(productState?.category)

    const handleAddToCart = () => {
        if (showSizeColor && !selectedColor) {
            return showErrorToast('Please select color')
        }
        if (showSizeColor && !selectedSize) {
            return showErrorToast('Please select size')
        }
        let temp = { ...productState };
        if (showSizeColor) {
            temp.size = selectedSize?.name || '';
            temp.color = selectedColor?.name || '';
        }
        dispatch(addToCart(temp));
        navigate("/cart");
    };

    const handleNavigateCategory = (categoryName) => {
        const id = categoryName?.trim()?.toLowerCase()?.replaceAll(' ', '-');
        navigate(`/${id}`, { state: { category_id: categoryName } });
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <Link to="/" className="mr-2 text-sm font-medium text-gray-900">
                                    Home
                                </Link>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <div onClick={() => handleNavigateCategory(productState?.category)} className="mr-2 text-sm font-medium text-gray-900 cursor-pointer">
                                    {productState?.category}
                                </div>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <button disabled type="button" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {productState?.title}
                            </button>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img src={productState?.images?.[0]} alt={""} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img src={productState?.images?.[1] || productState?.images?.[0]} alt={""} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img src={productState?.images?.[2] || productState?.images?.[0]} alt={""} className="h-full w-full object-cover object-center" />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img src={productState?.images?.[3] || productState?.images?.[0]} alt={""} className="h-full w-full object-cover object-center" />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productState?.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <div className="">
                            <p className="font-semibold text-slate-400">{productState?.brand}</p>
                            <p className="font-semibold text-gray-600">{productState?.title}</p>
                        </div>
                        <p className="font-semibold text-green-600">Special Price</p>
                        <div className="flex items-center gap-3 mt-3">
                            <p className="text-3xl tracking-tight text-gray-900">${productState?.discounted_price}</p>
                            <del className="text-md text-gray-900">${productState?.total_price}</del>
                            <p className="text-md font-semibold text-green-600">{productState?.discount_percentage}% Off</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h2 className="sr-only">Reviews</h2>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center bg-green-600 rounded-3xl text-white px-4 py-1 font-semibold gap-1">4.1 <FaStar /></span>
                                <span className="text-gray-500 font-semibold">{productState?.rating} Ratings and {productState?.reviews} Reviews</span>
                            </div>
                        </div>

                        <form className="mt-10">
                            {showSizeColor && (
                                <><div>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product?.colors?.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked ? "ring ring-offset-1" : "",
                                                            !active && checked ? "ring-2" : "",
                                                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                            <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size Guide</a>
                                        </div>

                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                {product?.sizes?.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        disabled={!size.inStock}
                                                        className={({ active }) =>
                                                            classNames(
                                                                size.inStock
                                                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                                active ? "ring-2 ring-indigo-500" : "",
                                                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                                            )
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                            <>
                                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                {size.inStock ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? "border" : "border-2",
                                                                            checked ? "border-indigo-500" : "border-transparent",
                                                                            "pointer-events-none absolute -inset-px rounded-md"
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                    >
                                                                        <svg
                                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                            viewBox="0 0 100 100"
                                                                            preserveAspectRatio="none"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                        </svg>
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </>
                            )}


                            <button
                                type="button"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">
                                    <b>{productState.description}</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                                    ducimus officiis nostrum ad asperiores, atque id dolores eum nihil corrupti nesciunt doloremque ipsa
                                    nulla quam consequuntur similique facilis fuga ullam autem? Voluptates iste minima at quod dolor
                                    perferendis pariatur maiores nisi porro excepturi eaque, distinctio, deserunt officiis itaque
                                    sapiente? Est.
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">
                                    <b>{productState?.description}</b> - Lorem ipsum dolor, sit amet consectetur adipisicing elit. In quos
                                    asperiores itaque dicta quas laborum ab illo assumenda, odio ipsam placeat quidem praesentium, officia
                                    neque iure explicabo! Expedita est quis nobis corporis vitae! Nihil ex ipsa vitae ab voluptatum eum,
                                    aperiam earum soluta quis suscipit tempora autem doloremque obcaecati necessitatibus?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;
