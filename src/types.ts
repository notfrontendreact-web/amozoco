export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductSpec {
  title: string;
  value: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  price: number; // in Toman
  originalPrice?: number; // original Toman price before discount
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  category: string; // e.g. "لوازم و تجهیزات آموزشی"
  categorySlug: string;
  brand: string;
  stock: number;
  isSpecialOffer?: boolean;
  specialOfferEndTime?: string; // ISO string
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  shortDescription: string;
  fullDescription: string;
  specs: ProductSpec[];
  options?: ProductOption[];
  tags: string[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name or image URL
  image: string;
  itemCount: number;
  hasStory?: boolean;
  subcategories?: { name: string; slug: string }[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgGradient: string;
  textColor: string;
  secondaryImage?: string;
  discountBadge?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productsCount: number;
}

export interface VideoShowcase {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl?: string;
  instructor: string;
  category: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
  purchasedProduct: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedOption?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscountToman: number;
  minPurchaseToman: number;
}

export interface AddressInfo {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "AMZ-98421"
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  address: AddressInfo;
  paymentMethod: 'bank_gateway' | 'card_to_card';
  bankName?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  referenceCode?: string;
  trackingCode?: string;
  createdAt: string;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  hasDiscountOnly: boolean;
  sortBy: 'popular' | 'newest' | 'price_asc' | 'price_desc' | 'rating';
}
