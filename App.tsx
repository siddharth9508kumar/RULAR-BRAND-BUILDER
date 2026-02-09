
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import { ProjectCategory, BrandState, ProjectOption } from './types';
import { PROJECT_OPTIONS } from './constants';
import { getBrandSuggestions, generateImageAsset } from './services/gemini';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState<BrandState>({
    category: null,
    businessName: '',
    slogan: '',
    description: '',
    colors: [],
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    logoUrl: null,
    posterUrl: null,
  });

  const selectedOption = PROJECT_OPTIONS.find(opt => opt.id === brand.category);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 6));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const updateBrand = (updates: Partial<BrandState>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  const handleGenerateIdentity = async () => {
    if (!brand.category || !brand.businessName) return;
    setLoading(true);
    try {
      const suggestions = await getBrandSuggestions(brand.category, brand.businessName);
      updateBrand({
        slogan: suggestions.slogan,
        description: suggestions.description,
        colors: suggestions.colors,
        headingFont: suggestions.headingFont,
        bodyFont: suggestions.bodyFont,
      });
      handleNext();
    } catch (error) {
      console.error(error);
      alert("Failed to generate brand identity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLogo = async () => {
    setLoading(true);
    try {
      const prompt = `A clean, professional minimalist vector logo for a rural business named "${brand.businessName}". 
      Logo style: simple icon related to ${selectedOption?.logoIdeas.join(' or ')}. 
      Primary colors: ${brand.colors.join(', ')}. Flat design, white background, no text.`;
      const url = await generateImageAsset(prompt, "1:1");
      updateBrand({ logoUrl: url });
      handleNext();
    } catch (error) {
      console.error(error);
      alert("Logo generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePoster = async () => {
    setLoading(true);
    try {
      const prompt = `A vibrant promotional ${brand.category === ProjectCategory.GOVT_SCHOOL ? 'awareness' : 'marketing'} poster for "${brand.businessName}". 
      Message: "${brand.slogan}". 
      Vibe: Rural, community-focused, trustworthy. 
      Colors used: ${brand.colors.join(', ')}. 
      Composition: Central subject representing the business, clear title at the top, call to action at the bottom.`;
      const url = await generateImageAsset(prompt, "9:16");
      updateBrand({ posterUrl: url });
      handleNext();
    } catch (error) {
      console.error(error);
      alert("Poster generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <StepIndicator currentStep={step} />

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[500px] overflow-hidden">
          {/* Step 1: Select Category */}
          {step === 1 && (
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">What are you creating today?</h2>
              <p className="text-slate-500 mb-8">Select one of the five categories from your final project guide.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      updateBrand({ category: opt.id });
                      handleNext();
                    }}
                    className={`text-left p-6 rounded-2xl border-2 transition-all group ${
                      brand.category === opt.id 
                        ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50' 
                        : 'border-slate-100 hover:border-indigo-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <i className={`fa-solid ${opt.icon} text-xl`}></i>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">{opt.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Name & Basics */}
          {step === 2 && (
            <div className="p-8 md:p-12 max-w-2xl mx-auto text-center">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-4 uppercase tracking-wider">
                  <i className={`fa-solid ${selectedOption?.icon}`}></i> {selectedOption?.title}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Let's name your business</h2>
                <p className="text-slate-500">Pick a name that resonates with your local community.</p>
              </div>

              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Business or Initiative Name</label>
                  <input
                    type="text"
                    value={brand.businessName}
                    onChange={(e) => updateBrand({ businessName: e.target.value })}
                    placeholder="e.g. Shanti Stitching Center"
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-lg font-medium"
                  />
                </div>
                <div className="flex gap-4 pt-8">
                  <button onClick={handleBack} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-800 transition-colors">Go Back</button>
                  <button 
                    disabled={!brand.businessName || loading}
                    onClick={handleGenerateIdentity}
                    className="flex-[2] bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                  >
                    {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : null}
                    Generate Brand Concept
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Brand Identity (Colors/Fonts/Slogan) */}
          {step === 3 && (
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Your Brand Identity</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <section>
                    <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-4">Slogan & Description</label>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2 italic">"{brand.slogan}"</h3>
                      <p className="text-slate-600 leading-relaxed">{brand.description}</p>
                    </div>
                  </section>

                  <section>
                    <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-4">Color Palette</label>
                    <div className="flex flex-wrap gap-4">
                      {brand.colors.map((color, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div 
                            className="w-20 h-20 rounded-2xl shadow-sm border border-black/5" 
                            style={{ backgroundColor: color }}
                          />
                          <span className="mt-2 text-[10px] font-mono font-bold text-slate-400 uppercase">{color}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section>
                    <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-4">Typography Selection</label>
                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl border-2 border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Heading Font</span>
                        <p className="text-3xl font-bold" style={{ fontFamily: brand.headingFont }}>{brand.businessName}</p>
                      </div>
                      <div className="p-6 rounded-2xl border-2 border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Body Font</span>
                        <p className="text-base leading-relaxed" style={{ fontFamily: brand.bodyFont }}>
                          Building trust and creating impact in our community through quality work.
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="flex gap-4 pt-8">
                    <button onClick={handleBack} className="flex-1 py-4 font-bold text-slate-500">Edit Details</button>
                    <button 
                      onClick={handleGenerateLogo}
                      disabled={loading}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                    >
                      {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : null}
                      Design My Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Logo Designer */}
          {step === 4 && (
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Designing Your Symbol</h2>
              <p className="text-slate-500 mb-12">We're using AI to create a unique icon based on your brand goals.</p>
              
              <div className="max-w-md mx-auto aspect-square rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shadow-inner group">
                {brand.logoUrl ? (
                  <img src={brand.logoUrl} alt="Generated Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center p-12">
                    <i className="fa-solid fa-wand-magic-sparkles text-slate-300 text-6xl mb-4 group-hover:scale-110 transition-transform duration-500"></i>
                    <p className="text-slate-400 font-medium">Click generate to see your logo</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 max-w-md mx-auto mt-12">
                <button onClick={handleBack} className="flex-1 py-4 font-bold text-slate-500">Back</button>
                <button 
                  onClick={brand.logoUrl ? handleNext : handleGenerateLogo}
                  disabled={loading}
                  className="flex-[2] bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
                >
                   {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : (brand.logoUrl ? "Review Guidelines" : "Try Again")}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Brand Guidelines Summary */}
          {step === 5 && (
            <div className="p-8 md:p-12 bg-slate-900 text-white min-h-[600px] flex flex-col justify-center">
              <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: brand.headingFont }}>{brand.businessName}</h1>
                  <p className="text-xl text-indigo-300 font-medium italic mb-8">"{brand.slogan}"</p>
                  
                  <div className="space-y-6 mb-12">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Purpose</h4>
                      <p className="text-slate-400">{brand.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {brand.colors.map((c, i) => (
                        <div key={i} className="flex flex-col items-center">
                           <div className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: c }}></div>
                           <span className="text-[8px] mt-1 font-mono text-slate-500">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={handleGeneratePoster}
                      disabled={loading}
                      className="px-8 py-4 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400 transition-all"
                    >
                      {loading ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : "Generate Final Poster"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 bg-white rounded-3xl flex items-center justify-center p-8 shadow-2xl shadow-indigo-500/20">
                    <img src={brand.logoUrl || ''} alt="Brand Logo" className="w-full h-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Final Poster */}
          {step === 6 && (
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              <h2 className="text-4xl font-black text-slate-800 mb-2">Brand Launch Ready!</h2>
              <p className="text-slate-500 mb-12">Your promotional poster is generated and ready to share.</p>

              <div className="max-w-sm w-full aspect-[9/16] rounded-3xl bg-slate-100 overflow-hidden shadow-2xl border-4 border-white">
                 {brand.posterUrl ? (
                   <img src={brand.posterUrl} alt="Promotional Poster" className="w-full h-full object-cover" />
                 ) : (
                   <div className="h-full flex items-center justify-center">
                     <i className="fa-solid fa-spinner fa-spin text-4xl text-indigo-500"></i>
                   </div>
                 )}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <button 
                  onClick={() => window.print()} 
                  className="flex-1 py-4 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-download"></i> Download Kit
                </button>
                <button 
                  onClick={() => { setStep(1); updateBrand({ logoUrl: null, posterUrl: null }); }} 
                  className="flex-1 py-4 px-6 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                >
                  Start New
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-40 grayscale">
             <i className="fa-solid fa-passport text-3xl"></i>
             <span className="font-bold text-xl uppercase tracking-tighter">Passport to Earning</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            This tool helps rural entrepreneurs build professional visual identities using modern AI, completing the final project of the Branding course.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
