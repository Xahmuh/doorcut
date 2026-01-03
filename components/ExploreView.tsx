
import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, Scissors, Sparkles, Wifi, Clock, CheckCircle2, ChevronLeft, ChevronRight, Info, CalendarCheck } from 'lucide-react';
import { SERVICES, BARBERS, CategorizedService } from '../constants';
import { Language } from '../index';

const ExploreView: React.FC<{ onBookNow: (serviceId?: string) => void; lang: Language }> = ({ onBookNow, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCatId, setActiveCatId] = useState('All');
  const [filterOnline, setFilterOnline] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [selectedService, setSelectedService] = useState<CategorizedService | null>(null);

  const categories = [
    { id: 'All', label: lang === 'ar' ? 'الكل' : 'All' },
    { id: 'Haircut', label: lang === 'ar' ? 'قصات الشعر' : 'Haircuts' },
    { id: 'Beard', label: lang === 'ar' ? 'اللحية' : 'Beard' },
    { id: 'Kids', label: lang === 'ar' ? 'الأطفال' : 'Kids' },
    { id: 'Premium', label: lang === 'ar' ? 'السبا' : 'Spa' },
    { id: 'Packages', label: lang === 'ar' ? 'الباقات' : 'Packages' },
  ];

  const t = {
    title: lang === 'ar' ? 'استكشف الخدمات' : 'Explore Services',
    searchPlaceholder: lang === 'ar' ? 'ابحث عن خدمة، عرض، أو حلاق' : 'Search services, bundles, or barbers',
    onlineNow: lang === 'ar' ? 'متصل الآن' : 'Online Now',
    rated: lang === 'ar' ? '+4.8 تقييم' : '4.8+ Rated',
    trending: lang === 'ar' ? 'دليل الخدمات المتاحة' : 'Professional Service Guide',
    results: lang === 'ar' ? 'نتائج' : 'Results',
    masterBarbers: lang === 'ar' ? 'كبار الحلاقين' : 'Master Barbers',
    available: lang === 'ar' ? 'متاح' : 'Available',
    bookNow: lang === 'ar' ? 'حجز الموعد' : 'Book Session',
    noResults: lang === 'ar' ? 'لم يتم العثور على نتائج لـ' : 'No matches found for',
    clearFilters: lang === 'ar' ? 'إعادة ضبط' : 'Clear Filters',
    mins: lang === 'ar' ? 'دقيقة' : 'mins',
    fastTrack: lang === 'ar' ? 'مسار سريع' : 'Fast track',
    currency: lang === 'ar' ? 'د.ب' : 'BHD',
    price: lang === 'ar' ? 'السعر' : 'Price',
    idealFor: lang === 'ar' ? 'مثالي لـ' : 'Ideal for',
    serviceDetails: lang === 'ar' ? 'تفاصيل الخدمة' : 'Service Details',
    description: lang === 'ar' ? 'حول الخدمة' : 'About Service',
    back: lang === 'ar' ? 'رجوع' : 'Back',
    bookThis: lang === 'ar' ? 'احجز هذه الخدمة' : 'Book This Service',
  };

  const getLocalizedText = (enText: string) => {
    const translations: Record<string, string> = {
      'Men’s Classic Haircut': 'حلاقة رجالية كلاسيكية',
      'Modern Haircut (Fade / Taper / Undercut)': 'حلاقة عصرية (فيد / تيبر)',
      'Express Haircut': 'حلاقة سريعة',
      'Kids Haircut': 'حلاقة للأطفال',
      'Kids Haircut (Sensitive / First Time)': 'حلاقة للأطفال (لأول مرة / حساسة)',
      'Haircut with Style Consultation': 'حلاقة مع استشارة مظهر',
      'Beard Trim': 'تحديد اللحية',
      'Beard Shape & Line-Up': 'رسم وتحديد اللحية',
      'Hot Towel Beard Service': 'خدمة اللحية بالمنشفة الساخنة',
      'Full Beard Grooming': 'عناية كاملة باللحية',
      'Mustache Trim': 'تحديد الشارب',
      'Kids Haircut with Cartoon Experience': 'حلاقة للأطفال مع تجربة كرتونية',
      'Kids Haircut + Small Gift': 'حلاقة للأطفال + هدية صغيرة',
      'Stress-Free Kids Haircut': 'حلاقة هادئة للأطفال',
      'Kids Hair Styling': 'تصفيف شعر للأطفال',
      'Scalp Massage': 'مساج فروة الرأس',
      'Hair Wash & Blow Dry': 'غسيل شعر وتجفيف',
      'Hair Styling': 'تصفيف شعر',
      'Face Clean-Up After Haircut': 'تنظيف الوجه بعد الحلاقة',
      'Hair Coloring / Beard Coloring': 'صبغ الشعر / اللحية',
      'Father & Son Package': 'باقة الأب والابن',
      'Family Haircut Package': 'باقة العائلة',
      'Special Occasion Grooming (Weddings / Events)': 'عناية للمناسبات الخاصة',
      'Premium Grooming Package': 'باقة العناية الفاخرة',
      'Monthly Haircut Subscription': 'اشتراك حلاقة شهري',
    };
    return lang === 'ar' ? (translations[enText] || enText) : enText;
  };

  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCatId === 'All' || service.category === activeCatId;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCatId]);

  const filteredBarbers = useMemo(() => {
    return BARBERS.filter(barber => {
      const matchesSearch = barber.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOnline = !filterOnline || barber.isOnline;
      const matchesRating = barber.rating >= minRating;
      return matchesSearch && matchesOnline && matchesRating;
    });
  }, [searchTerm, filterOnline, minRating]);

  if (selectedService) {
    return (
      <div className="fixed inset-0 z-[120] bg-stone-950 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto">
        <div className="relative h-72 flex-shrink-0">
          <img src={selectedService.image} className="w-full h-full object-cover brightness-50" alt={selectedService.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
          <button 
            onClick={() => setSelectedService(null)}
            className={`absolute top-6 ${lang === 'ar' ? 'right-6' : 'left-6'} p-3 bg-stone-900/80 backdrop-blur-md rounded-full text-white border border-white/10 shadow-2xl active:scale-90 transition-transform`}
          >
            {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>

        <div className="flex-1 px-6 -mt-12 relative z-10 pb-32">
          <div className="bg-stone-900 border border-stone-800 rounded-[40px] p-8 shadow-2xl space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full border border-gold/20 text-[10px] font-black text-gold uppercase tracking-widest">
                <Scissors size={12} />
                {selectedService.category}
              </div>
              <h1 className="text-3xl font-black text-white leading-tight">{getLocalizedText(selectedService.name)}</h1>
              <div className="flex items-center gap-4 text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-gold" />
                  <span className="text-xs font-black uppercase tracking-wider">{selectedService.duration} {t.mins}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-gold fill-gold" />
                  <span className="text-xs font-black text-white">4.9/5.0</span>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-stone-800"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <Info size={18} className="text-gold" />
                <h3 className="font-black text-sm uppercase tracking-widest">{t.description}</h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed font-medium">
                {selectedService.description}
              </p>
            </div>

            <div className="p-6 bg-stone-800/30 rounded-3xl border border-stone-800 flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">{t.idealFor}</h4>
                <p className="text-stone-500 text-xs font-bold leading-relaxed">{selectedService.idealFor}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-stone-500 font-black text-sm uppercase tracking-widest">{t.price}</span>
              <div className="text-right">
                <span className="text-4xl font-black text-gold">{selectedService.price.toFixed(3)}</span>
                <span className="text-sm font-black text-stone-600 ml-2">{t.currency}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-stone-950/80 backdrop-blur-xl border-t border-stone-900 z-[130]">
          <button 
            onClick={() => { onBookNow(selectedService.id); setSelectedService(null); }}
            className="w-full py-6 bg-gold text-stone-950 font-black rounded-[32px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:bg-yellow-500 transition-all active:scale-95 text-lg uppercase tracking-widest"
          >
            <CalendarCheck size={24} />
            {t.bookThis}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-white">{t.title}</h2>
        
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-stone-500`} size={18} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-stone-900 border border-stone-800 rounded-2xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right font-medium' : 'pl-12 pr-4 font-medium'} focus:outline-none focus:border-gold transition-all text-stone-100 shadow-inner`}
            />
          </div>
          <button 
            className={`p-4 rounded-2xl border transition-all ${filterOnline || minRating > 0 ? 'bg-gold border-gold text-stone-950 shadow-lg' : 'bg-stone-900 border-stone-800 text-gold'}`}
            onClick={() => {
              if (filterOnline || minRating > 0) {
                setFilterOnline(false);
                setMinRating(0);
              } else {
                setFilterOnline(true);
              }
            }}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setFilterOnline(!filterOnline)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${filterOnline ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'}`}
          >
            <Wifi size={12} /> {t.onlineNow}
          </button>
          <button 
            onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${minRating >= 4.8 ? 'bg-gold/10 border-gold text-gold shadow-md' : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'}`}
          >
            <Star size={12} fill={minRating >= 4.8 ? "currentColor" : "none"} /> {t.rated}
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCatId(cat.id)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest border-2 ${activeCatId === cat.id ? 'bg-gold border-gold text-stone-950 shadow-lg scale-105' : 'bg-stone-900 border-stone-800 text-stone-500 hover:border-stone-700'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg font-black text-white">{t.trending}</h3>
          <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{filteredServices.length} {t.results}</span>
        </div>
        
        <div className="space-y-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="group relative bg-stone-900 border border-stone-800 rounded-[40px] p-5 flex flex-col gap-4 hover:border-gold/50 transition-all cursor-pointer shadow-2xl active:scale-[0.98]"
              >
                <div className="flex gap-5">
                  <div className="relative flex-shrink-0">
                    <img src={service.image} className="w-24 h-24 rounded-[24px] object-cover shadow-xl group-hover:scale-105 transition-transform duration-500" alt={service.name} />
                    <div className={`absolute top-2 ${lang === 'ar' ? 'right-2' : 'left-2'} bg-stone-950/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10`}>
                      <Scissors size={12} className="text-gold" />
                    </div>
                  </div>
                  
                  <div className={`flex-1 flex flex-col justify-between py-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-black text-white text-lg group-hover:text-gold transition-colors">{getLocalizedText(service.name)}</h4>
                      </div>
                      <p className="text-stone-400 text-xs font-medium mt-1 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Clock size={14} className="text-gold" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{service.duration} {t.mins}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                         <span className="text-[10px] font-black uppercase tracking-wider">{t.fastTrack}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-1 border-t border-stone-800 flex items-center justify-between">
                  <div className={`flex flex-col ${lang === 'ar' ? 'items-start' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 text-gold/80 mb-0.5">
                      <CheckCircle2 size={12} />
                      <span className="text-[9px] font-black uppercase tracking-widest">{t.idealFor}</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-bold italic line-clamp-1">{service.idealFor}</p>
                  </div>
                  <div className="text-right">
                     <span className="text-2xl font-black text-white">{service.price.toFixed(3)}</span>
                     <span className="text-[10px] font-black text-stone-600 uppercase ml-1">{t.currency}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-stone-900/30 border border-dashed border-stone-800 rounded-[40px] p-12 text-center flex flex-col items-center space-y-4">
              <div className="p-4 bg-stone-800/50 rounded-full text-stone-600">
                <Search size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-stone-400 font-bold">{t.noResults} "{searchTerm}"</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCatId('All'); }}
                  className="text-gold text-[10px] font-black uppercase tracking-widest mt-4 hover:underline"
                >
                  {t.clearFilters}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {activeCatId === 'All' && searchTerm === '' && (
        <section className="pt-4">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-lg font-black text-white">{t.masterBarbers}</h3>
            <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{filteredBarbers.length} {t.available}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {filteredBarbers.map(barber => (
              <div key={barber.id} className="bg-stone-900 border border-stone-800 rounded-[32px] p-5 text-center group hover:border-gold/30 transition-all shadow-md">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img src={barber.image} className="w-full h-full rounded-[24px] object-cover border-2 border-transparent group-hover:border-gold/20 transition-all" alt={barber.name} />
                  {barber.isOnline && (
                    <span className={`absolute -bottom-1 ${lang === 'ar' ? '-left-1' : '-right-1'} w-6 h-6 bg-green-500 rounded-full border-[4px] border-stone-900 flex items-center justify-center shadow-lg`}>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </span>
                  )}
                </div>
                <h4 className="font-black text-sm text-white truncate">{barber.name}</h4>
                <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mt-1">{barber.role}</p>
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <Star size={12} className="fill-gold text-gold" />
                  <span className="text-xs font-black text-white">{barber.rating}</span>
                </div>
                <button 
                  onClick={() => onBookNow()}
                  className="w-full mt-5 py-3 bg-stone-800 hover:bg-gold hover:text-stone-950 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-inner active:scale-95"
                >
                  {t.bookNow}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExploreView;
