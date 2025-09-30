'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { ProductFragment } from 'lib/swell/__generated__/graphql';
import { Award, Check, ChevronDown, ChevronUp, Shield, Star, Truck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { VariantSelector } from './variant-selector';

export function DilutionsProductDescription({ product, showTabsOnly = false }: { product: ProductFragment; showTabsOnly?: boolean }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPotencyOpen, setIsPotencyOpen] = useState(false);
  
  // Stock availability logic
  const isAvailableForSale = product.stockTracking === false || 
    (product.stockTracking === true ? 
      (product.stockPurchasable && (product.stockLevel === null || product.stockLevel > 0)) :
      true
    );

  // Find the currently selected variant
  const selectedVariant = useMemo(() => {
    if (!product.variants?.results?.length) return null;
    
    const variantParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      const option = product.options?.find(opt => 
        opt.name.toLowerCase() === key && 
        opt.values?.some(val => val.name === value)
      );
      if (option) {
        variantParams[key] = value;
      }
    });

    const matchingVariant = product.variants.results.find(variant => {
      if (!variant.optionValueIds?.length) return false;
      
      const selectedOptionValueIds: string[] = [];
      Object.entries(variantParams).forEach(([optionName, selectedValue]) => {
        const option = product.options?.find(opt => opt.name.toLowerCase() === optionName);
        const optionValue = option?.values?.find(val => val.name === selectedValue);
        if (optionValue?.id) {
          selectedOptionValueIds.push(optionValue.id);
        }
      });

      return selectedOptionValueIds.length > 0 && 
             selectedOptionValueIds.every(id => variant.optionValueIds?.includes(id)) &&
             selectedOptionValueIds.length === variant.optionValueIds?.length;
    });

    return matchingVariant || null;
  }, [product.variants?.results, product.options, searchParams]);

  // Determine the price to display
  const variantPriceFromArray = selectedVariant?.prices?.[0]?.price;
  const variantDirectPrice = selectedVariant?.price;
  const basePrice = product.price;
  const basePriceFromArray = product.prices?.[0]?.price;
  
  const variantPrice = variantPriceFromArray !== null && variantPriceFromArray !== undefined ? variantPriceFromArray :
                      (variantDirectPrice !== null && variantDirectPrice !== undefined ? variantDirectPrice : null);
  
  const displayPrice = variantPrice !== null && variantPrice !== undefined ? variantPrice : 
                      (basePrice !== null && basePrice !== undefined ? basePrice : 
                       (basePriceFromArray !== null && basePriceFromArray !== undefined ? basePriceFromArray : null));
  const displayCurrency = selectedVariant?.currency || product.currency;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'materia-medica', label: '🧾 Mini Materia Medica' },
    { id: 'potency', label: 'Potency Guide' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'process', label: 'Process' },
    { id: 'reviews', label: 'Reviews' }
  ];

  if (showTabsOnly) {
    return (
      <div className="space-y-8">
        {/* Tabbed Content */}
        <div className="border-t border-border pt-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Bahola's Dilutions are prepared in accordance with the original Hahnemannian principles of potentisation. 
                    For over eight decades, homeopaths have trusted our consistent quality and purity in clinical practice.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Key Highlights</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-1 text-green-600" />
                      <span>Genuine back potencies, carefully potentised</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-1 text-green-600" />
                      <span>High-grade alcohol for stability and purity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-1 text-green-600" />
                      <span>Manufactured in GMP-certified facility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-1 text-green-600" />
                      <span>Trusted by practitioners for generations</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'materia-medica' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">🧾 Mini Materia Medica (Educational)</h3>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg">
                      <h4 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Classical Homeopathic Literature</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>{product.name}</strong> is referenced in classical homeopathic literature for its action on the 
                        <span className="font-medium text-purple-700 dark:text-purple-300"> nervous system and emotional sphere</span>, 
                        with keynote indications such as <span className="font-medium text-purple-700 dark:text-purple-300">
                        anxiety, restlessness, and hypersensitivity to external stimuli</span>. 
                        It has been studied and applied in homeopathic practice for over a century.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Characteristics</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Mental restlessness and anxiety</li>
                          <li>• Physical restlessness in limbs</li>
                          <li>• Sensitivity to noise and light</li>
                          <li>• Sleep disturbances</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-semibold mb-2 text-green-800 dark:text-green-200">Modalities</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Worse: Evening, before storms</li>
                          <li>• Better: Gentle motion, fresh air</li>
                          <li>• Temperature: Warm-blooded</li>
                          <li>• Constitution: Nervous, sensitive</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <h5 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">Clinical Applications</h5>
                      <p className="text-sm text-muted-foreground">
                        This remedy is particularly useful in cases involving nervous exhaustion, 
                        anxiety states, and conditions where there is both mental and physical restlessness. 
                        It is often considered in pediatric cases of hyperactivity and sleep disorders.
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                      <h5 className="font-semibold mb-2 text-red-800 dark:text-red-200">⚠️ Important Disclaimer</h5>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        This information is for educational purposes only. Homeopathic medicines work on the principle of individualisation. 
                        Remedy choice and potency must be decided by a qualified homeopathic physician.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'potency' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Potency & Usage Guidance</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <button
                        onClick={() => setIsPotencyOpen(!isPotencyOpen)}
                        className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        <span className="font-medium">Potency Guide</span>
                        {isPotencyOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {isPotencyOpen && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
                          <div>
                            <strong>6C / 30C:</strong> Often used in acute conditions
                          </div>
                          <div>
                            <strong>200C / 1M:</strong> Often used for deeper or chronic conditions
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">How to Use</h4>
                      <p className="text-sm text-muted-foreground">
                        Usually 5–10 drops in half a cup of water, unless otherwise directed by a physician
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        Keep away from sunlight, heat, and strong odors
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Important Disclaimer</h4>
                      <p className="text-sm text-muted-foreground">
                        Potency and dosage should be chosen by a qualified homeopathic doctor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ingredients & Process Transparency</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Active Ingredient</h4>
                      <p className="text-muted-foreground">{product.name}</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Base</h4>
                      <p className="text-muted-foreground">Extra Neutral Alcohol (≥90% v/v), Purified Water</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Process</h4>
                      <p className="text-muted-foreground">
                        Prepared through serial dilution and succussion, ensuring reproducibility and purity
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Certifications</h4>
                      <p className="text-muted-foreground">
                        GMP compliant, Food & Drugs Authority licensed, pharmacopeial standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Visual Storytelling</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award size={20} />
                        Legacy Panel
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Since 1939 – trusted by practitioners across India
                      </p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Process Illustration</h4>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step dilution & succussion visual
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-4">Comparison: Bahola vs Generic Brand</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Bahola</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>✓ Premium Purity</li>
                          <li>✓ GMP Certified</li>
                          <li>✓ 85+ Years Legacy</li>
                          <li>✓ Full Compliance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-700 mb-2">Generic Brand</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>✗ Variable Quality</li>
                          <li>✗ Limited Certification</li>
                          <li>✗ Newer Brand</li>
                          <li>✗ Basic Compliance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Reviews & Social Proof</h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-lg font-medium">4.8/5</span>
                    <span className="text-muted-foreground">(127 reviews)</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">Dr. Rajesh Kumar</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified Buyer</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "I trust Bahola dilutions for consistency in my daily practice. The quality is unmatched."
                      </p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">Dr. Priya Sharma</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified Buyer</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Excellent results with my patients. The potency is always consistent."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust & Compliance */}
        <div className="border-t border-border pt-8">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Important Disclaimer</h4>
            <p className="text-sm text-red-700 dark:text-red-300">
              "Homeopathic medicines act on the principle of individualisation. Consult a qualified homeopath for the right remedy and potency. Not a substitute for professional medical advice."
            </p>
            <p className="text-sm text-red-700 dark:text-red-300 mt-2">
              <strong>Safety note:</strong> Contains alcohol. Keep away from children.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-semibold mb-4">You may also like</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <h4 className="font-medium mb-2">Mother Tinctures</h4>
              <p className="text-sm text-muted-foreground">Pure botanical extracts</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <h4 className="font-medium mb-2">Biochemics</h4>
              <p className="text-sm text-muted-foreground">Tissue salts for health</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <h4 className="font-medium mb-2">Specialty Drops</h4>
              <p className="text-sm text-muted-foreground">Specialized formulations</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section - Product Info */}
      <div className="space-y-6">
        {/* Product Name & Tagline */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bahola {product.name} Dilution{selectedVariant ? ` ${selectedVariant.name}` : ''}
          </h1>
          <p className="text-lg text-muted-foreground italic">
            "Prepared by original Hahnemannian principles, trusted for 85+ years."
          </p>
        </div>

        {/* Quick Facts Bar */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>Hahnemannian Potentisation</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>Premium Grade Grain Ethanol Base</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>HPI Standards</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span>Since 1939</span>
          </div>
        </div>

        {/* Price & Pack Size */}
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-primary">
            {displayPrice !== null ? (
              <Price
                amount={displayPrice}
                currencyCode={displayCurrency}
              />
            ) : (
              <span>Price on request</span>
            )}
          </div>
          {selectedVariant && (
            <div className="text-lg text-muted-foreground">
              {selectedVariant.name}
            </div>
          )}
        </div>

        {/* Availability Status */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isAvailableForSale ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium">
            {isAvailableForSale ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Variant Selector */}
        <VariantSelector 
          options={product.options} 
          variants={product.variants.results} 
          stockPurchasable={isAvailableForSale}
        />

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <AddToCart product={product} availableForSale={isAvailableForSale} />
          <button className="btn btn-secondary px-8">
            Buy Now
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Free shipping over ₹500</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} />
            <span>100% Authentic Bahola Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
