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
  /** Real dish videos can be dropped in here later; falls back to the image. */
  video: string | null;
  tags: string[];
  ingredients: string[];
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
    tags: ["PURE VEG", "POPULAR"],
    ingredients: [
      "Potato, tomato, green peas, capsicum",
      "Butter and pav bhaji masala",
      "Toasted pav buns",
      "Onion, coriander, lemon",
    ],
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
    tags: ["PURE VEG", "STARTER"],
    ingredients: [
      "Hung curd and paneer",
      "Gram flour binding",
      "Green chilli, ginger, coriander",
      "Mint chutney on the side",
    ],
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
    tags: ["PURE VEG", "PUNJABI"],
    ingredients: [
      "Whole black urad dal and rajma",
      "Tomato, butter and fresh cream",
      "Ginger, garlic, garam masala",
      "Slow-cooked overnight",
    ],
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
    tags: ["PURE VEG", "STREET FOOD"],
    ingredients: [
      "Tandoori marinated paneer",
      "Soft paratha wrap",
      "Onion, capsicum, green chutney",
      "Chaat masala and lemon",
    ],
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
    tags: ["PURE VEG", "NORTH INDIAN"],
    ingredients: [
      "Slow-simmered chickpeas",
      "Chole masala, tomato, ginger",
      "Fried bhature",
      "Onion, pickle, green chilli",
    ],
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
    tags: ["PURE VEG", "MAIN COURSE"],
    ingredients: [
      "Fresh paneer cubes",
      "Tomato and cashew gravy",
      "Cream and butter",
      "Kasuri methi, mild spices",
    ],
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
    tags: ["PURE VEG", "SIGNATURE"],
    ingredients: [
      "Soya chaap sticks",
      "Hung curd and cashew marinade",
      "Cream, white pepper, cardamom",
      "Finished in the tandoor",
    ],
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
    tags: ["PURE VEG", "HOUSE SPECIAL"],
    ingredients: [
      "Long-grain basmati rice",
      "Smoky soya chaap tikka",
      "Saffron, fried onion, mint",
      "Served with raita",
    ],
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
 * PLACEHOLDER REVIEWS — replace with real, verified customer reviews.
 */
export const placeholderReviews = [
  {
    id: "r1",
    isPlaceholder: true,
    quote:
      "The pav bhaji is exactly what you hope for — buttery, hot and generous. Easily our weekend regular.",
    name: "Sample Reviewer",
    rating: 5,
  },
  {
    id: "r2",
    isPlaceholder: true,
    quote:
      "Lovely pure veg spread. The soya chaap tikka biryani had a proper smoky flavour without being heavy.",
    name: "Sample Reviewer",
    rating: 5,
  },
  {
    id: "r3",
    isPlaceholder: true,
    quote:
      "Warm, simple place with food that tastes home-made. The dal makhani is rich and worth the wait.",
    name: "Sample Reviewer",
    rating: 4,
  },
];

/**
 * CONFIGURATION — restaurant owner should fill these in.
 */
export const restaurant = {
  name: "DELI BELLY",
  subtitle: "PURE VEG RESTAURANT",
  locality: "PCMC, Maharashtra",
  addressLine: "Address to be added", // TODO: exact street address
  phone: "", // TODO: e.g. "+91 00000 00000"
  mapsUrl: "", // TODO: Google Maps link
  orderUrl: "", // TODO: online ordering link
  instagram: "",
  facebook: "",
};

export const ratingsNote =
  "Ratings shown are based on current available listings and may change as new reviews/orders are added.";
