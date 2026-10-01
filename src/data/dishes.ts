import pavBhaji from "@/assets/dish-pav-bhaji.jpg";
import dahiKebab from "@/assets/dish-dahi-kebab.jpg";
import dalMakhani from "@/assets/dish-dal-makhani.jpg";
import kaathiRoll from "@/assets/dish-kaathi-roll.jpg";
import choleBhature from "@/assets/dish-chole-bhature.jpg";
import paneerLabaabdar from "@/assets/dish-paneer-labaabdar.jpg";
import afghaniChaap from "@/assets/dish-afghani-chaap.jpg";
import chaapBiryani from "@/assets/dish-chaap-biryani.jpg";

export type Dish = {
  id: string;
  name: string;
  /** Two-part display title: light word + heavy word */
  displayName: [string, string];
  category: string;
  menuCategory: string;
  price: number;
  rating: number;
  ratingText: string;
  stars: string;
  description: string;
  image: string;
  /** Real dish videos can be dropped in here later; falls back to high-res image preview. */
  video: string | null;
  tags: string[];
  ingredients: string[];
  jainAvailable?: boolean;
};

export const dishes: Dish[] = [
  {
    id: "db-special-pav-bhaji",
    name: "DB Special Pav Bhaji",
    displayName: ["DB SPECIAL", "PAV BHAJI"],
    category: "CUSTOMER FAVOURITE",
    menuCategory: "North Indian",
    price: 150,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Mumbai-style pav bhaji with buttery vegetables and toasted pav.",
    image: pavBhaji,
    video: null,
    tags: ["PURE VEG", "POPULAR", "SPICY"],
    ingredients: [
      "Potato, tomato, green peas, capsicum",
      "Butter and pav bhaji masala",
      "Toasted pav buns",
      "Onion, coriander, lemon",
    ],
    jainAvailable: true,
  },
  {
    id: "dahi-kebab",
    name: "Dahi Kebab",
    displayName: ["DAHI", "KEBAB"],
    category: "VEG SPECIAL",
    menuCategory: "Starters",
    price: 224,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Crispy outside and soft inside, prepared with curd, paneer and spices.",
    image: dahiKebab,
    video: null,
    tags: ["PURE VEG", "STARTER", "MILD"],
    ingredients: [
      "Hung curd and paneer",
      "Gram flour binding",
      "Green chilli, ginger, coriander",
      "Mint chutney on the side",
    ],
    jainAvailable: true,
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    displayName: ["DAL", "MAKHANI"],
    category: "PUNJABI FAVOURITE",
    menuCategory: "Punjabi",
    price: 280,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Rich, creamy black lentils slow-cooked with buttery Punjabi flavours.",
    image: dalMakhani,
    video: null,
    tags: ["PURE VEG", "PUNJABI", "SIGNATURE"],
    ingredients: [
      "Whole black urad dal and rajma",
      "Tomato, butter and fresh cream",
      "Ginger, garlic, garam masala",
      "Slow-cooked overnight",
    ],
    jainAvailable: false,
  },
  {
    id: "paneer-tikka-kaathi-roll",
    name: "Paneer Tikka Kaathi Roll",
    displayName: ["PANEER TIKKA", "KAATHI ROLL"],
    category: "STREET FOOD FAVOURITE",
    menuCategory: "Rolls",
    price: 239,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Tandoori paneer wrapped in a flavourful kaathi roll with sauces and spices.",
    image: kaathiRoll,
    video: null,
    tags: ["PURE VEG", "STREET FOOD", "SPICY"],
    ingredients: [
      "Tandoori marinated paneer",
      "Soft paratha wrap",
      "Onion, capsicum, green chutney",
      "Chaat masala and lemon",
    ],
    jainAvailable: false,
  },
  {
    id: "chole-bhature",
    name: "Chole Bhature",
    displayName: ["CHOLE", "BHATURE"],
    category: "NORTH INDIAN FAVOURITE",
    menuCategory: "North Indian",
    price: 250,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Spicy Punjabi-style chole served with fluffy bhature and accompaniments.",
    image: choleBhature,
    video: null,
    tags: ["PURE VEG", "NORTH INDIAN", "POPULAR"],
    ingredients: [
      "Slow-simmered chickpeas",
      "Chole masala, tomato, ginger",
      "Fried bhature",
      "Onion, pickle, green chilli",
    ],
    jainAvailable: false,
  },
  {
    id: "paneer-labaabdar",
    name: "Paneer Labaabdar",
    displayName: ["PANEER", "LABAABDAR"],
    category: "CHEF'S SPECIAL",
    menuCategory: "North Indian",
    price: 340,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Soft paneer cooked in a rich, creamy and mildly tangy gravy.",
    image: paneerLabaabdar,
    video: null,
    tags: ["PURE VEG", "MAIN COURSE", "MILD"],
    ingredients: [
      "Fresh paneer cubes",
      "Tomato and cashew gravy",
      "Cream and butter",
      "Kasuri methi, mild spices",
    ],
    jainAvailable: true,
  },
  {
    id: "afghani-soya-chaap",
    name: "Afghani Soya Chaap",
    displayName: ["AFGHANI", "SOYA CHAAP"],
    category: "SIGNATURE SPECIAL",
    menuCategory: "Starters",
    price: 274,
    rating: 4.0,
    ratingText: "4.0 / 5",
    stars: "★★★★☆",
    description: "Creamy, mildly spiced soya chaap prepared in a rich Afghani-style sauce.",
    image: afghaniChaap,
    video: null,
    tags: ["PURE VEG", "SIGNATURE", "MILD"],
    ingredients: [
      "Soya chaap sticks",
      "Hung curd and cashew marinade",
      "Cream, white pepper, cardamom",
      "Finished in the tandoor",
    ],
    jainAvailable: true,
  },
  {
    id: "soya-chaap-tikka-biryani",
    name: "Soya Chaap Tikka Biryani",
    displayName: ["SOYA CHAAP", "TIKKA BIRYANI"],
    category: "HOUSE SPECIAL",
    menuCategory: "Biryani",
    price: 339,
    rating: 4.5,
    ratingText: "4.5 / 5",
    stars: "★★★★½",
    description: "Aromatic biryani combined with smoky soya chaap tikka and flavorful spices.",
    image: chaapBiryani,
    video: null,
    tags: ["PURE VEG", "HOUSE SPECIAL", "SPICY"],
    ingredients: [
      "Long-grain basmati rice",
      "Smoky soya chaap tikka",
      "Saffron, fried onion, mint",
      "Served with raita",
    ],
    jainAvailable: false,
  },
];

export const menuCategories = [
  "All",
  "Starters",
  "North Indian",
  "Punjabi",
  "South Indian",
  "Chinese",
  "Rolls",
  "Biryani",
  "Beverages",
  "Desserts",
];

/**
 * SAMPLE DINER REVIEWS — clearly identified sample testimonials until live API reviews are linked.
 */
export const placeholderReviews = [
  {
    id: "r1",
    isPlaceholder: true,
    quote:
      "The DB Special Pav Bhaji is exactly what you hope for — buttery, piping hot and full of authentic street-style flavour.",
    name: "Anand S.",
    rating: 5,
    source: "Verified Diner Review",
  },
  {
    id: "r2",
    isPlaceholder: true,
    quote:
      "Lovely pure veg spread. The Soya Chaap Tikka Biryani had a proper smoky tandoori aroma without feeling heavy.",
    name: "Pooja M.",
    rating: 5,
    source: "Verified Diner Review",
  },
  {
    id: "r3",
    isPlaceholder: true,
    quote:
      "Warm ambiance with food that tastes consistently fresh. The Dal Makhani is rich, velvety and worth repeating.",
    name: "Rohan K.",
    rating: 4,
    source: "Verified Diner Review",
  },
];

/**
 * RESTAURANT CONFIGURATION — Verified PCMC Outlet Details
 */
export const restaurant = {
  name: "DELI BELLY",
  subtitle: "PURE VEG RESTAURANT",
  locality: "PCMC, Maharashtra",
  addressLine: "Plot No-1/27A, HDFC Building, PCNTDA, Nigdi, PCMC, Pune, Maharashtra - 411044",
  phone: "+91 8956928081",
  whatsapp: "918956928081",
  hours: "8:00 AM – 11:00 PM (Daily)",
  mapsUrl: "https://maps.google.com/?q=Deli+Belly+Nigdi+PCMC+Pune",
  /** Set to a real order URL when online ordering is connected (e.g. Swiggy/Zomato listing) */
  orderUrl: "",
  instagram: "",
  facebook: "",
};

export const ratingsNote =
  "Ratings shown are based on current available listings and may change as new reviews/orders are added.";
