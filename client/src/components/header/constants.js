export const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: 'womens-dresses',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: 'tops',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                }
            ],
            sections: [
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { id: "Lingerie", name: 'Lingerie', href: 'lingerie' },
                        { id: "Beauty & Makeup", name: 'Beauty & Makeup', href: 'beauty-&-makeup' },
                        { id: "Women's Footwear", name: "Women's Footwear", href: "women's-footwear" },
                        { id: "Jewellery", name: 'Jewellery', href: 'jewellery' },
                        { id: "Handbags", name: 'Handbags', href: 'handbags' },
                        { id: "Eyewear", name: 'Eyewear', href: 'eyewear' }
                    ]
                },
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { id: "Women's Active Wear", name: "Women's Active Wear", href: "women's-active-wear" },
                        { id: "Women's Ethnic Wear", name: "Women's Ethnic Wear", href: "women's-ethnic-wear" },
                        { id: "Western Wear", name: 'Western Wear', href: 'western-wear' },
                        { id: "Casual Styles", name: 'Casual Styles', href: 'casual-styles' },
                        { id: "Lounge Wear", name: 'Lounge Wear', href: 'lounge-wear' },
                        { id: "WFH Casual Wear", name: 'WFH Casual Wear', href: 'wfh-casual-wear' },
                        { id: "Inner Wear", name: 'Inner Wear', href: 'inner-wear' },
                        { id: "Inclusive Styles", name: 'Inclusive Styles', href: 'inclusive-styles' },
                        { id: "Sleepwear", name: 'Sleepwear', href: 'sleepwear' },
                        { id: "Sports Wear", name: 'Sports Wear', href: 'sports-wear' },
                        { id: "Office Wear", name: 'Office Wear', href: 'office-wear' }
                    ]
                }
            ]
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: 'mens-shirts',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: 'mens-shirts',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
                }
            ],
            sections: [
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { id: "Men's Footwear", name: "Men's Footwear", href: "men's-footwear" },
                        { id: "Grooming", name: 'Grooming', href: 'grooming' }
                    ]
                },
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { id: "Men's Ethnic Wear", name: "Men's Ethnic Wear", href: "men's-ethnic-wear" },
                        { id: "Men's Active Wear", name: "Men's Active Wear", href: "men's-active-wear" }
                    ]
                }
            ]
        }
    ]
}