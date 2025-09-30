'use client';

import { Gift, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { applyCouponCode, applyGiftCardCode, removeCouponCode, removeGiftCardCode } from './actions';

interface CartSummaryProps {
  cart: {
    subTotal: number;
    grandTotal: number;
    discountTotal: number;
    giftcardTotal: number;
    currency: string;
    coupon?: {
      id: string;
      code: string;
      discount: number;
    };
    giftcards?: Array<{
      id: string;
      code: string;
      amount: number;
    }>;
  };
}

export function CartSummary({ cart }: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isApplyingGiftCard, setIsApplyingGiftCard] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [giftCardError, setGiftCardError] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    setCouponError('');
    
    try {
      const error = await applyCouponCode(couponCode.trim());
      if (error) {
        setCouponError(error.message);
      } else {
        setCouponCode('');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setIsApplyingCoupon(true);
    setCouponError('');
    
    try {
      const error = await removeCouponCode();
      if (error) {
        setCouponError(error.message);
      }
    } catch (error) {
      setCouponError('Failed to remove coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleApplyGiftCard = async () => {
    if (!giftCardCode.trim()) return;
    
    setIsApplyingGiftCard(true);
    setGiftCardError('');
    
    try {
      const error = await applyGiftCardCode(giftCardCode.trim());
      if (error) {
        setGiftCardError(error.message);
      } else {
        setGiftCardCode('');
      }
    } catch (error) {
      setGiftCardError('Failed to apply gift card code');
    } finally {
      setIsApplyingGiftCard(false);
    }
  };

  const handleRemoveGiftCard = async (giftCardId: string) => {
    setIsApplyingGiftCard(true);
    setGiftCardError('');
    
    try {
      const error = await removeGiftCardCode(giftCardId);
      if (error) {
        setGiftCardError(error.message);
      }
    } catch (error) {
      setGiftCardError('Failed to remove gift card');
    } finally {
      setIsApplyingGiftCard(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: cart.currency || 'INR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Coupon Code Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Tag size={20} />
          Discount Code
        </h3>
        
        {cart.coupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-green-700 font-medium">{cart.coupon.code}</span>
              <span className="text-green-600">-{formatPrice(cart.coupon.discount)}</span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              disabled={isApplyingCoupon}
              className="text-red-500 hover:text-red-700 disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || !couponCode.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplyingCoupon ? 'Applying...' : 'Apply'}
            </button>
          </div>
        )}
        
        {couponError && (
          <p className="text-red-500 text-sm">{couponError}</p>
        )}
      </div>

      {/* Gift Card Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Gift size={20} />
          Gift Card
        </h3>
        
        {cart.giftcards && cart.giftcards.length > 0 ? (
          <div className="space-y-2">
            {cart.giftcards.map((giftCard) => (
              <div key={giftCard.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-blue-700 font-medium">{giftCard.code}</span>
                  <span className="text-blue-600">{formatPrice(giftCard.amount)}</span>
                </div>
                <button
                  onClick={() => handleRemoveGiftCard(giftCard.id)}
                  disabled={isApplyingGiftCard}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
              placeholder="Enter gift card code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApplyGiftCard}
              disabled={isApplyingGiftCard || !giftCardCode.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplyingGiftCard ? 'Applying...' : 'Apply'}
            </button>
          </div>
        )}
        
        {giftCardError && (
          <p className="text-red-500 text-sm">{giftCardError}</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(cart.subTotal)}</span>
        </div>
        
        {cart.discountTotal > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(cart.discountTotal)}</span>
          </div>
        )}
        
        {cart.giftcardTotal > 0 && (
          <div className="flex justify-between text-blue-600">
            <span>Gift Card</span>
            <span>-{formatPrice(cart.giftcardTotal)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-lg font-semibold border-t pt-3">
          <span>Total</span>
          <span>{formatPrice(cart.grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}


