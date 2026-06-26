import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Check, CornerDownRight, Tag, Gift, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percent
  const [couponMessage, setCouponMessage] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const shippingCharge = subtotal >= 500 || subtotal === 0 ? 0 : 60;
  const grandTotal = subtotal - discountAmount + shippingCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GLOW10') {
      setAppliedDiscount(10);
      setCouponSuccess(true);
      setCouponMessage('YAY! "GLOW10" (10% Off) applied successfully.');
    } else {
      setCouponSuccess(false);
      setCouponMessage('Invalid code. Try using: GLOW10');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const generatedOrder = 'GLW-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrder);
    setCheckoutComplete(true);
  };

  const handleCloseReceipt = () => {
    setCheckoutComplete(false);
    setAppliedDiscount(0);
    setCouponCode('');
    setCouponMessage('');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="cart-drawer-root">
      
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Main Panel Drawer */}
        <div className="w-screen max-w-md bg-white border-l border-stone-200/60 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-5 py-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h2 className="text-lg font-serif font-bold text-stone-900">Your Shopping Cart</h2>
              <span className="bg-stone-100 font-mono text-[11px] font-bold px-2 py-0.5 rounded text-stone-600">
                {cartItems.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-stone-50 hover:bg-stone-150 text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Completed screen overlay */}
          {checkoutComplete ? (
            <div className="flex-grow overflow-y-auto p-6 flex flex-col justify-center items-center text-center space-y-6 animate-fadeIn" id="cart-checkout-success">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-stone-900">Order Placed Successfully!</h3>
                <p className="text-xs text-stone-400 font-mono font-semibold uppercase tracking-wider">Order ID: {orderId}</p>
                <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Your batch of Glowistry organic formulations is registered. We are preparing your parcels right now to ship to your address!
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-4 border border-stone-150 rounded-xl bg-stone-50 text-left text-xs w-full space-y-2 font-mono">
                <h4 className="font-semibold text-stone-800 text-center border-b border-stone-200 pb-1.5 uppercase font-sans">Payment Receipt</h4>
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-[11px] text-stone-605">
                    <span className="truncate max-w-[180px]">{item.product.name} x{item.quantity}</span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                
                <div className="border-t border-stone-200 pt-1.5 space-y-1 text-stone-500 text-[11px]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount (10%):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-dashed border-stone-300 pt-1.5">
                  <span className="font-sans">Grand Total:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 italic">
                A confirmation email has been dispatched with delivery route details.
              </p>

              <button
                onClick={handleCloseReceipt}
                className="w-full bg-stone-900 hover:bg-stone-850 text-amber-100 font-medium py-3 rounded-lg text-sm transition"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            <>
              {/* Products List Scroll Container */}
              <div className="flex-grow overflow-y-auto px-5 py-4 divide-y divide-stone-100">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-20">
                    <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 border border-stone-200/50">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-stone-830">Your cart is empty</h4>
                      <p className="text-xs text-stone-450 mt-1 max-w-[220px]">
                        Add items from our catalog to begin nourishing your skin!
                      </p>
                    </div>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 first:pt-0 group">
                      
                      {/* image thumb */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 rounded-lg object-cover border border-stone-200/60 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* item meta */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-stone-900 leading-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-stone-400 hover:text-red-600 p-0.5"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-stone-400 font-mono mt-0.5 uppercase font-semibold">
                            {item.product.size} • ₹{item.product.price} each
                          </p>
                        </div>

                        {/* quantity and subtotal modifiers */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 px-2 text-stone-600 hover:bg-stone-200 cursor-pointer text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 font-mono text-xs text-stone-850 font-bold select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 px-2 text-stone-600 hover:bg-stone-200 cursor-pointer text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-bold font-mono text-stone-900">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>

                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Calculations and Checkout actions footer */}
              {cartItems.length > 0 && (
                <div className="px-5 py-6 bg-stone-50 border-t border-stone-200 border-stone-50 space-y-4">
                  
                  {/* Coupon section */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (eg. GLOW10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-white border border-stone-250 rounded-lg px-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
                    />
                    <button
                      type="submit"
                      className="bg-stone-800 text-amber-100 hover:bg-stone-850 rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponMessage && (
                    <p className={`text-[11px] font-medium flex items-center gap-1 leading-none ${couponSuccess ? 'text-emerald-700' : 'text-red-650'}`}>
                      <Tag className="w-3 h-3" />
                      {couponMessage}
                    </p>
                  )}

                  {/* Calculations breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-605 pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span className="flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> Coupon Discount (10%)</span>
                        <span className="font-mono">-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping Delivery</span>
                      <span className="font-mono">
                        {shippingCharge === 0 ? (
                          <span className="text-emerald-700 font-semibold uppercase tracking-wider">Free Delivery</span>
                        ) : (
                          `₹${shippingCharge}`
                        )}
                      </span>
                    </div>

                    {shippingCharge > 0 && (
                      <p className="text-[10px] text-stone-400 italic text-right">
                        Add ₹{500 - subtotal} more to qualify for Free Shipping!
                      </p>
                    )}
                  </div>

                  {/* Grand total */}
                  <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-stone-900 uppercase tracking-wide">Grand Total</span>
                    <span className="text-xl font-black font-mono text-stone-950">₹{grandTotal}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-stone-900 hover:bg-stone-850 text-amber-100 font-semibold py-3.5 rounded-lg text-sm transition tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Place Order (COD)
                  </button>

                  <p className="text-[10px] text-stone-400 text-center leading-normal max-w-xs mx-auto">
                    We currently support Cash On Delivery (COD) for all orders within India to guarantee checkout satisfaction.
                  </p>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}
