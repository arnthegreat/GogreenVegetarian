import aeonlogo from "@/assets/logo/aeon.png"
import cambodiatrade from "@/assets/logo/cambodiatrade.png"
import chipmong from "@/assets/logo/chipmong.png"
import sbaireoungmart from "@/assets/logo/sbaireoungmart.png"
import thaihuot from "@/assets/logo/thaihuot.png"
import vegetarianrestaurant from "@/assets/logo/vegetarianrestaurants.png"
import weemarkethub from "@/assets/logo/weemarkethub.png"
import wholesalevegetarianogo from "@/assets/logo/wholesalevegetariangroceries.png"
import { IMG } from '@/data/site'

export const PRODUCTS = [
  {
    img: IMG.p1,
    name: "Prahok Ktis (Plant-Based)",
    desc: "Our signature plant-based take on Cambodia's beloved fermented paste — rich, umami-forward, and completely animal-free.",
    tag: "Bestseller",
  },
  {
    img: IMG.p2,
    name: "Prahok Kapi Pao",
    desc: "A slow-roasted, smoky Kapi-style paste made entirely from fermented plant ingredients and aromatic Cambodian spices.",
    tag: "Signature",
  },
  {
    img: IMG.p3,
    name: "Fermented Soybean Paste",
    desc: "Traditionally fermented for depth and complexity — an all-purpose Cambodian condiment packed with probiotic goodness.",
    tag: "Traditional",
  },
  {
    img: IMG.p4,
    name: "Herb & Lemongrass Blend",
    desc: "A fresh, fragrant seasoning paste of lemongrass, galangal, kaffir lime, and green herbs — ready to cook with.",
    tag: "New",
  },
  {
    img: IMG.p5,
    name: "Preserved Herb Jar",
    desc: "Cambodian herbs preserved in natural brine — zero additives, packed with probiotic plant cultures.",
    tag: "Artisan",
  },
  {
    img: IMG.p6,
    name: "Chilli Kapi Oil",
    desc: "A bold, aromatic plant-based chilli oil infused with Cambodian Kapi spices — perfect as a dipping sauce or cooking base.",
    tag: "Spicy",
  },
]

export const VISIBLE = 4

export const STORES = [
  {
    name: "Aeon Supermarket",
    type: "Supermarket",
    logo: "",
    logoImage: aeonlogo,
    address: "Ground Floor, AEON Mall Sen Sok, Russian Blvd, Phnom Penh",
    hours: "9am–10pm",
  },
  {
    name: "Thai Huot Supermarket",
    type: "Supermarket",
    logoImage: thaihuot,
    address: "123 Monivong Blvd, BKK1, Phnom Penh",
    hours: "7am–9pm",
  },
  {
    name: "Chip Mong Supermarket",
    type: "Supermarket",
    logoImage: chipmong,
    address: "Chip Mong 271 Mall, St 271, Phnom Penh",
    hours: "8am–9pm",
  },
  {
    name: "CambodiaTrade",
    type: "Trade Partner",
    logoImage: cambodiatrade,
    address: "No. 45, Preah Norodom Blvd, Phnom Penh",
    hours: "8am–6pm Mon–Sat",
  },
  {
    name: "Wee Market Hub",
    type: "Market Hub",
    logoImage: weemarkethub,
    address: "Olympia Mall, Monivong Blvd, Phnom Penh",
    hours: "10am–9pm",
  },
  {
    name: "Wholesale Vegetarian Groceries",
    type: "Wholesaler",
    logoImage: wholesalevegetarianogo,
    address: "No. 88, St 182, Phnom Penh",
    hours: "6am–6pm",
  },
  {
    name: "Vegetarian Restaurants",
    type: "Food Service",
    logoImage: vegetarianrestaurant,
    address: "Various locations across Phnom Penh",
    hours: "7am–8pm",
  },
  {
    name: "Sbai Reoung Mart",
    type: "Convenience Store",
    logoImage: sbaireoungmart,
    address: "No. 12, St 63, Daun Penh, Phnom Penh",
    hours: "6am–9pm",
  },
]

export type StoreItem = typeof STORES[number]

export type ProductItem = typeof PRODUCTS[number]

export const PRODUCT_DETAILS: Record<string, {
  about: string
  howToUse: string
  pairWith: string
  howToCook: string
  ingredients: string
}> = {
  "Prahok Ktis (Plant-Based)": {
    about:
      "Prahok Ktis is Cambodia's most beloved fermented condiment, now reimagined entirely from plants. Our plant-based version captures the deep, funky umami of the original using fermented soybean, sea vegetables, and aromatic Cambodian spices — achieving the same complex flavour profile without any animal ingredients. Made in small batches in Phnom Penh.",
    howToUse:
      "Use directly as a condiment alongside steamed rice, or mix into soups and stews for an instant depth of flavour. A small spoonful goes a long way — it is intensely savoury and concentrated. It can also be diluted with water or coconut milk to create a flavouring base.",
    pairWith:
      "Pairs beautifully with steamed jasmine rice, raw vegetable platters, amok tofu, green mango salad, and fresh rice paper rolls. It also complements roasted aubergine and grilled corn.",
    howToCook:
      "Sauté one teaspoon with shallots, lemongrass, and galangal in coconut oil for two minutes to create a fragrant cooking base. Use this as the foundation for stir-fries, noodle broths, or coconut curries.",
    ingredients:
      "Fermented soybean, sea vegetable extract, lemongrass, galangal, kaffir lime leaf, chilli, sea salt, palm sugar. No artificial preservatives. Store refrigerated after opening.",
  },
  "Prahok Kapi Pao": {
    about:
      "A deeply aromatic, slow-roasted plant-based paste inspired by traditional Cambodian Kapi Pao. Our version replaces shrimp paste with fermented sea vegetables and black beans, roasted low-and-slow until rich and smoky. The result is a complex, umami-laden condiment that honours the spirit of the original.",
    howToUse:
      "Use as a flavouring paste in stir-fries, fried rice, or noodle dishes. Can be thinned into a dipping sauce with lime juice and coconut sugar. Adds immediate depth to any Cambodian or Southeast Asian dish.",
    pairWith:
      "Excellent with fried rice, pad see ew, grilled tofu, roasted pumpkin, and spring rolls. Also pairs well with jasmine rice and steamed vegetables.",
    howToCook:
      "Heat one tablespoon in a wok with oil until fragrant. Add garlic and shallots, then incorporate your vegetables or protein. The paste blooms beautifully with high heat.",
    ingredients:
      "Roasted black soybean, fermented sea vegetable, garlic, shallot, dried chilli, palm sugar, coconut vinegar, sea salt. Slow roasted. No MSG. Refrigerate after opening.",
  },
  "Fermented Soybean Paste": {
    about:
      "Our Fermented Soybean Paste is a living condiment — produced using traditional Cambodian fermentation methods and aged over several weeks. Rich in natural probiotics, it has a complex, savoury depth similar to miso but with distinctly Khmer character. An indispensable pantry staple for plant-based Cambodian cooking.",
    howToUse:
      "Dissolve a spoonful into warm broth for a quick flavour boost, or mix directly into dressings and marinades. Use raw in small amounts — the live cultures are preserved when not overheated.",
    pairWith:
      "Perfect alongside congee, steamed tofu, cucumber slices, and fresh herbs. Stir into sesame noodles or use as a base for miso-style glazes on roasted vegetables.",
    howToCook:
      "For a simple dipping sauce: combine two teaspoons of paste with lime juice, a touch of coconut sugar, and minced chilli. For a broth: whisk one tablespoon into hot (not boiling) water with dried mushrooms.",
    ingredients:
      "Whole soybeans, sea salt, filtered water. Naturally fermented. No additives. No preservatives. Live cultures present. Keep refrigerated.",
  },
  "Herb & Lemongrass Blend": {
    about:
      "A vibrant, freshly prepared herb and lemongrass paste capturing the essential aromatics of Cambodian cuisine. Made from freshly harvested lemongrass, galangal, kaffir lime leaf, turmeric, and green herbs — all blended together without cooking to preserve maximum freshness and fragrance.",
    howToUse:
      "Use directly as a marinade for tofu, tempeh, or jackfruit. Stir into coconut milk for a quick curry base, or mix with oil and citrus for a fresh herb dressing.",
    pairWith:
      "Pairs well with grilled tofu skewers, coconut rice, fresh spring rolls, green papaya salad, and steamed sticky rice with mango.",
    howToCook:
      "Sauté two tablespoons of the blend in coconut oil for three minutes before adding coconut milk and vegetables. For a soup base, add to simmering broth with mushrooms and tofu.",
    ingredients:
      "Fresh lemongrass, galangal, kaffir lime leaf, fresh turmeric, green chilli, coriander root, shallots, garlic, coconut oil, sea salt. No artificial flavour. Refrigerate immediately.",
  },
  "Preserved Herb Jar": {
    about:
      "A traditional Cambodian preservation of fresh herbs — lacto-fermented in natural brine over two weeks. The result is a tangy, probiotic-rich jar of preserved herbs that keeps for months in the fridge and adds a bright, complex dimension to any dish. Zero additives, nothing artificial.",
    howToUse:
      "Use the preserved herbs as a condiment, pickle, or garnish. The brine itself is a versatile ingredient — use it as a seasoning liquid in soups, dressings, or marinades.",
    pairWith:
      "Excellent alongside steamed rice, grilled vegetables, noodle soups, and charcuterie-style plant-based boards. The tangy brine pairs especially well with rich, fatty dishes.",
    howToCook:
      "Add to fried rice at the end of cooking for brightness. Stir the brine into lentil soup for depth. Use the herbs as a topping on grilled corn or roasted cauliflower.",
    ingredients:
      "Cambodian fresh herbs (lemongrass, kaffir lime, holy basil, pandan), filtered water, sea salt. Lacto-fermented. Live cultures. No vinegar. No sugar. Refrigerate.",
  },
  "Chilli Kapi Oil": {
    about:
      "A bold, slow-infused plant-based chilli oil inspired by Cambodian Kapi-style condiments. We combine dried Cambodian chillies with aromatic spices — star anise, cardamom, and fermented sea vegetable — and steep them in golden sunflower oil for 48 hours. The result is a deeply layered, umami-rich oil with a warming, lingering heat.",
    howToUse:
      "Drizzle over congee, noodles, dumplings, fried rice, or steamed tofu. Use as a finishing oil on soups and salads. Also works beautifully as a dipping sauce base — just add a splash of soy and lime.",
    pairWith:
      "Perfect with dim sum-style dishes, steamed buns, plain congee, fried rice, spring rolls, and roasted broccoli. Also excellent on pizza or as a pasta sauce component.",
    howToCook:
      "Use as a cooking oil for stir-fries needing a chilli kick. Add to fried rice at the beginning for a smoky, spiced base. Drizzle cold over finished dishes as a garnish oil.",
    ingredients:
      "Sunflower oil, dried Cambodian chilli, fermented sea vegetable, star anise, Sichuan pepper, cardamom, garlic, shallot, sea salt. No artificial colour. Vegan.",
  },
}
