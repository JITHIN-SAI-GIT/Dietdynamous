import { useState, useMemo } from "react";
import { 
  ShoppingCart, Search, Filter, Plus, Minus, Trash2, 
  CreditCard, ChevronRight, AlertTriangle, Leaf, Flame, 
  Heart, Activity, Info, X, Check 
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

// --- DATA: GROCERY STORE CATALOG ---
const GROCERY_CATALOG = [
  {
    id: "vegetables",
    name: "Vegetables",
    icon: "🥦",
    description: "Base of Every Healthy Diet",
    benefits: "Low calories, high fiber, vitamins, minerals.",
    subcategories: [
      { name: "Leafy Greens", items: [
          { name: "Spinach", price: 40, unit: "bunch", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "diabetes", "heart", "vegan"] },
          { name: "Kale", price: 80, unit: "bunch", image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "diabetes", "vegan"] },
          { name: "Lettuce", price: 50, unit: "head", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "vegan"] },
          { name: "Fenugreek (Methi)", price: 30, unit: "bunch", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=300&q=80", tags: ["diabetes", "vegan"] },
          { name: "Cabbage", price: 40, unit: "kg", image: "https://images.unsplash.com/photo-1551163901-526229eb9678?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "vegan"] }
      ]},
      { name: "Cruciferous", items: [
          { name: "Broccoli", price: 120, unit: "kg", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=300&q=80", tags: ["muscle-gain", "weight-loss", "vegan"] },
          { name: "Cauliflower", price: 60, unit: "kg", image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "vegan"] },
      ]},
      { name: "Other", items: [
          { name: "Carrot", price: 50, unit: "kg", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80", tags: ["eye-health", "vegan"] },
          { name: "Beetroot", price: 40, unit: "kg", image: "https://images.unsplash.com/photo-1593161434389-5142be6af67d?auto=format&fit=crop&w=300&q=80", tags: ["heart", "vegan"] },
          { name: "Tomato", price: 30, unit: "kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80", tags: ["heart", "vegan"] },
          { name: "Bell Peppers", price: 80, unit: "kg", image: "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "vegan"] },
          { name: "Cucumber", price: 40, unit: "kg", image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "hydration", "vegan"] }
      ]}
    ]
  },
  {
    id: "fruits",
    name: "Fruits",
    icon: "🍎",
    description: "Natural Energy & Antioxidants",
    benefits: "Rich in vitamins, natural sugars, and fiber.",
    subcategories: [
      { name: "Low Sugar", items: [
          { name: "Apple", price: 150, unit: "kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80", tags: ["weight-loss", "diabetes", "vegan"] },
          { name: "Pear", price: 160, unit: "kg", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=300&q=80", tags: ["fiber", "vegan"] },
          { name: "Kiwi", price: 200, unit: "kg", image: "https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=300&q=80", tags: ["immunity", "vegan"] },
          { name: "Guava", price: 60, unit: "kg", image: "https://images.unsplash.com/photo-1536489379685-6453664324f1?auto=format&fit=crop&w=300&q=80", tags: ["diabetes", "vegan"] }
      ]},
      { name: "High Antioxidant", items: [
          { name: "Blueberries", price: 400, unit: "box", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=300&q=80", tags: ["brain-health", "vegan"] },
          { name: "Strawberries", price: 250, unit: "box", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&q=80", tags: ["skin", "vegan"] },
          { name: "Pomegranate", price: 180, unit: "kg", image: "https://images.unsplash.com/photo-1615485925694-a03beaaa64da?auto=format&fit=crop&w=300&q=80", tags: ["heart", "vegan"] }
      ]},
      { name: "Everyday", items: [
          { name: "Banana", price: 60, unit: "dozen", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=300&q=80", tags: ["energy", "run", "vegan"] },
          { name: "Orange", price: 80, unit: "kg", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=300&q=80", tags: ["immunity", "vegan"] },
          { name: "Papaya", price: 50, unit: "kg", image: "https://images.unsplash.com/photo-1617112848923-cc5ac5d69aa2?auto=format&fit=crop&w=300&q=80", tags: ["digestion", "vegan"] },
          { name: "Watermelon", price: 40, unit: "kg", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80", tags: ["hydration", "vegan"] }
      ]}
    ]
  },
  {
      id: "grains",
      name: "Whole Grains",
      icon: "🌾",
      description: "Sustained Energy & Digestion",
      benefits: "Provide sustained energy and better digestion.",
      subcategories: [
          { name: "Staples", items: [
              { name: "Brown Rice", price: 80, unit: "kg", image: "https://images.unsplash.com/photo-1563861826-6b6535fa8430?auto=format&fit=crop&w=300&q=80", tags: ["fiber", "vegan", "gluten-free"] },
              { name: "Oats", price: 150, unit: "kg", image: "https://images.unsplash.com/photo-1517093722953-ce0358f36be3?auto=format&fit=crop&w=300&q=80", tags: ["heart", "vegan", "breakfast"] },
              { name: "Quinoa", price: 300, unit: "kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80", tags: ["protein", "vegan", "gluten-free"] },
              { name: "Combined Millets (Ragi, Jowar)", price: 60, unit: "kg", image: "https://images.unsplash.com/photo-1606757366575-b6574b59695d?auto=format&fit=crop&w=300&q=80", tags: ["diabetes", "vegan", "gluten-free"] }
          ]}
      ]
  },
  {
      id: "protein",
      name: "Protein & Meat",
      icon: "🥚",
      description: "Muscle & Recovery",
      benefits: "Essential for muscle growth, repair, and metabolism.",
      subcategories: [
          { name: "Animal Based", items: [
              { name: "Eggs (12)", price: 80, unit: "dozen", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&q=80", tags: ["muscle-gain", "vegetarian"] },
              { name: "Chicken Breast", price: 300, unit: "kg", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80", tags: ["muscle-gain", "lean"] },
              { name: "Salmon", price: 800, unit: "kg", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=300&q=80", tags: ["brain-health", "heart"] },
          ]},
          { name: "Plant Based", items: [
              { name: "Lentils (Dal)", price: 120, unit: "kg", image: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?auto=format&fit=crop&w=300&q=80", tags: ["vegan", "fiber"] },
              { name: "Chickpeas", price: 100, unit: "kg", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=300&q=80", tags: ["vegan", "muscle-gain"] },
              { name: "Tofu", price: 150, unit: "pack", image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=300&q=80", tags: ["vegan", "muscle-gain"] },
              { name: "Paneer (Low Fat)", price: 400, unit: "kg", image: "https://images.unsplash.com/photo-1631452902999-52e463510521?auto=format&fit=crop&w=300&q=80", tags: ["vegetarian", "calcium"] },
          ]}
      ]
  },
  {
      id: "supplements",
      name: "Protein Powder",
      icon: "🥤",
      description: "Supplement Store",
      benefits: "Concentrated protein for recovery and growth.",
      subcategories: [
          { name: "Whey Protein", items: [
              { name: "Isolate (Vanilla)", price: 2500, unit: "2lb", image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=300&q=80", tags: ["muscle-gain", "recovery"] },
              { name: "Concentrate (Chocolate)", price: 2000, unit: "2lb", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=300&q=80", tags: ["muscle-gain"] },
          ]},
          { name: "Plant Protein", items: [
              { name: "Pea Protein", price: 1800, unit: "2lb", image: "https://images.unsplash.com/photo-1598463943314-e0b6d39d9154?auto=format&fit=crop&w=300&q=80", tags: ["vegan", "lactose-free"] },
              { name: "Hemp/Rice Blend", price: 2200, unit: "2lb", image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=300&q=80", tags: ["vegan"] },
          ]},
          { name: "Casein", items: [
              { name: "Micellar Casein", price: 2800, unit: "2lb", image: "https://images.unsplash.com/photo-1590424744265-7170c8aa115d?auto=format&fit=crop&w=300&q=80", tags: ["night-recovery", "muscle-preservation"] },
          ]}
      ]
  }
];

// --- HELPER COMPONENTS ---

function FilterTag({ label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                active 
                ? "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/20 shadow-lg" 
                : "bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-300"
            }`}
        >
            {label}
        </button>
    );
}

function ProductCard({ item, onAdd }) {
    return (
        <Card variant="glass" className="group overflow-hidden relative border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
             <div className="md:h-40 h-32 w-full overflow-hidden relative">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 {item.tags.includes("vegan") && (
                     <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-lg">Vegan</span>
                 )}
                 {item.tags.includes("muscle-gain") && (
                     <span className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-lg">Protein</span>
                 )}
             </div>
             
             <div className="p-4">
                 <div className="flex justify-between items-start mb-2">
                     <div>
                        <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{item.name}</h3>
                        <p className="text-xs text-slate-400 font-medium">{item.unit}</p>
                     </div>
                     <span className="font-black text-emerald-600">₹{item.price}</span>
                 </div>
                 
                 <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all"
                    onClick={() => onAdd(item)}
                    icon={Plus}
                 >
                     Add
                 </Button>
             </div>
        </Card>
    );
}

export default function GroceryStore() {
    const [activeCategory, setActiveCategory] = useState("vegetables");
    const [cart, setCart] = useState({});
    const [isCartOpen, setCartOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // --- CART LOGIC ---
    const addToCart = (product) => {
        setCart(prev => {
           const existing = prev[product.name];
           const quantity = existing ? existing.quantity + 1 : 1;
           return {
               ...prev,
               [product.name]: { ...product, quantity }
           };
        });
        setCartOpen(true);
    };

    const removeFromCart = (productName) => {
        setCart(prev => {
            const newCart = { ...prev };
            delete newCart[productName];
            return newCart;
        });
    };

    const updateQuantity = (productName, delta) => {
        setCart(prev => {
            const existing = prev[productName];
            if (!existing) return prev;
            
            const newQty = existing.quantity + delta;
            if (newQty <= 0) {
                const newCart = { ...prev };
                delete newCart[productName];
                return newCart;
            }
            
            return {
                ...prev,
                [productName]: { ...existing, quantity: newQty }
            };
        });
    };

    const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

    // --- FILTER LOGIC ---
    const selectedCategoryData = GROCERY_CATALOG.find(c => c.id === activeCategory);
    
    // Flatten items for rendering
    const allItems = selectedCategoryData.subcategories.flatMap(sub => 
        sub.items.map(i => ({...i, subcategory: sub.name}))
    );

    const filteredItems = allItems.filter(item => {
        // Search Filter
        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        // Tag Filter
        if (activeFilter !== "all" && !item.tags.includes(activeFilter)) return false;
        
        return true;
    });

    const filters = [
        { id: "all", label: "All Items" },
        { id: "vegan", label: "Vegan" },
        { id: "muscle-gain", label: "Muscle Gain" },
        { id: "weight-loss", label: "Weight Loss" },
        { id: "diabetes", label: "Diabetes Friendly" },
        { id: "lactose-free", label: "Lactose Free" },
    ];

    return (
        <div className="flex h-[calc(100vh-100px)] relative gap-6">
            
            {/* LEFT SIDEBAR - CATEGORIES */}
            <div className="w-64 flex-shrink-0 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hidden md:flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-emerald-500" /> Categories
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {GROCERY_CATALOG.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all group ${
                                activeCategory === cat.id 
                                ? "bg-emerald-50 text-emerald-700 font-bold shadow-sm" 
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                                <span>{cat.name}</span>
                            </div>
                            {activeCategory === cat.id && <ChevronRight className="w-4 h-4 text-emerald-500" />}
                        </button>
                    ))}
                </div>
                
                {/* Weekly Bundle Promo */}
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
                    <h3 className="font-bold relative z-10">Weekly "Buy This List"</h3>
                    <p className="text-xs text-indigo-100 mb-2 relative z-10">Curated for Weight Loss</p>
                    <Button size="xs" variant="secondary" className="w-full relative z-10">View Bundle</Button>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </div>

            {/* MAIN CONTENT Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* TOP BAR */}
                <div className="mb-6 space-y-4">
                     {/* Category Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-1">
                                <span className="text-4xl">{selectedCategoryData.icon}</span> 
                                {selectedCategoryData.name}
                            </h1>
                            <p className="text-slate-500 text-sm max-w-2xl">{selectedCategoryData.benefits}</p>
                        </div>
                        <Button 
                            className="bg-slate-900 text-white md:hidden" 
                            icon={ShoppingCart}
                            onClick={() => setCartOpen(true)}
                        >
                            {cartCount}
                        </Button>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 w-full">
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        </div>
                        
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {filters.map(f => (
                                <FilterTag 
                                    key={f.id} 
                                    label={f.label} 
                                    active={activeFilter === f.id} 
                                    onClick={() => setActiveFilter(f.id)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <div className="flex-1 overflow-y-auto pr-2 pb-20">
                     {filteredItems.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                             <Search className="w-16 h-16 mb-4 opacity-20" />
                             <p>No products found matching your criteria.</p>
                         </div>
                     ) : (
                         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                             {filteredItems.map((item, idx) => (
                                 <ProductCard key={idx} item={item} onAdd={addToCart} />
                             ))}
                         </div>
                     )}
                     
                     {/* Safety Warning */}
                     <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                         <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                         <div>
                             <h4 className="font-bold text-yellow-800 text-sm">Important Safety Info</h4>
                             <p className="text-yellow-700 text-xs mt-1">
                                 Daily intake limit based on your profile. Consult a professional before using supplements.
                                 Check for milk, soy, and egg allergies.
                             </p>
                         </div>
                     </div>
                </div>
            </div>

            {/* CART DRAWER (Slide Over) */}
            <div className={`
                fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col
                ${isCartOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-emerald-500 text-white">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <h2 className="font-bold text-lg">Your Cart</h2>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">{cartCount} items</span>
                    </div>
                    <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {Object.values(cart).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
                            <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-medium">Your cart is empty</p>
                            <p className="text-sm mt-1">Start adding healthy items!</p>
                        </div>
                    ) : (
                        Object.values(cart).map((item) => (
                            <div key={item.name} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-white" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
                                    <p className="text-xs text-slate-500">₹{item.price} / {item.unit}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button 
                                            onClick={() => updateQuantity(item.name, -1)}
                                            className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-emerald-500 text-slate-500"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-bold text-slate-700 text-sm w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.name, 1)}
                                            className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-emerald-500 text-emerald-600"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-emerald-600">₹{item.price * item.quantity}</p>
                                    <button 
                                        onClick={() => removeFromCart(item.name)}
                                        className="text-slate-300 hover:text-red-500 mt-2 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                    <div className="flex justify-between items-center text-slate-500 text-sm">
                        <span>Subtotal</span>
                        <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 text-sm">
                        <span>Delivery</span>
                        <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    
                    <div className="flex justify-between items-end pt-2 border-t border-slate-200">
                        <span className="font-bold text-slate-800 text-lg">Total</span>
                        <span className="font-black text-3xl text-slate-900">₹{cartTotal}</span>
                    </div>

                    <Button className="w-full py-4 text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" icon={CreditCard}>
                        Checkout Now
                    </Button>
                </div>
            </div>
            
            {/* Cart Toggle Button (Floating) */}
            {!isCartOpen && cartCount > 0 && (
                <button 
                    onClick={() => setCartOpen(true)}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform animate-bounce-in"
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                        {cartCount}
                    </span>
                </button>
            )}
        </div>
    );
}
