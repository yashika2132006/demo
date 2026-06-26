import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProductView from './components/ProductView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem } from './types';

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change for best UI transition practice
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Derive active tab highlight dynamically from URL pathname
  let activeTab: 'home' | 'about' | 'products' | 'blog' | 'contact' = 'home';
  const path = location.pathname;
  if (path === '/' || path === '/home') {
    activeTab = 'home';
  } else if (path.startsWith('/products')) {
    activeTab = 'products';
  } else if (path.startsWith('/about')) {
    activeTab = 'about';
  } else if (path.startsWith('/blog')) {
    activeTab = 'blog';
  } else if (path.startsWith('/contact')) {
    activeTab = 'contact';
  }

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Cross-page link triggers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigate('/products');
  };

  const activeCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Handle click on nav routes
  const handleSetActiveTab = (tab: 'home' | 'about' | 'products' | 'blog' | 'contact') => {
    setSelectedProduct(null);
    if (tab === 'home') {
      navigate('/');
    } else {
      navigate(`/${tab}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-950 font-sans" id="app-viewport">
      
      {/* 1. Universal Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab} 
        cartCount={activeCartCount}
        toggleCart={() => setCartOpen(!cartOpen)}
      />

      {/* 2. Main content with absolute crisp transitions mapped to true React Routes */}
      <main className="flex-grow animate-fadeIn" key={location.pathname}>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomeView 
                onExploreProducts={() => navigate('/products')} 
                onSelectProduct={handleSelectProduct}
              />
            } 
          />
          <Route 
            path="/home" 
            element={<Navigate to="/" replace />} 
          />
          <Route 
            path="/products" 
            element={
              <ProductView 
                onAddToCart={handleAddToCart}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            } 
          />
          <Route 
            path="/about" 
            element={<AboutView />} 
          />
          <Route 
            path="/blog" 
            element={
              <BlogView 
                onSelectProduct={handleSelectProduct}
                setActiveTab={handleSetActiveTab}
              />
            } 
          />
          <Route 
            path="/contact" 
            element={<ContactView />} 
          />
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </main>

      {/* 3. Universal Footer */}
      <Footer setActiveTab={handleSetActiveTab} />

      {/* 4. Sliding Interactive Cart Drawer Sheet */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
