
import React, { useState } from 'react';
import { ChevronLeft, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, History, Banknote, Landmark, Check } from 'lucide-react';
import { MOCK_USER, TRANSACTIONS } from '../constants';
import { Language } from '../index';

const WalletView: React.FC<{ onBack: () => void; lang: Language }> = ({ onBack, lang }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('apple');

  const t = {
    title: lang === 'ar' ? 'محفظتي' : 'My Wallet',
    available: lang === 'ar' ? 'الرصيد المتوفر' : 'Available Balance',
    addFunds: lang === 'ar' ? 'إضافة رصيد' : 'Add Funds',
    withdraw: lang === 'ar' ? 'سحب' : 'Withdraw',
    methods: lang === 'ar' ? 'طرق الدفع' : 'Payment Methods',
    manage: lang === 'ar' ? 'إدارة' : 'Manage',
    history: lang === 'ar' ? 'سجل العمليات' : 'Transaction History',
    linked: lang === 'ar' ? 'مرتبط بـ' : 'Linked to',
    benefitPay: lang === 'ar' ? 'بينفت بي' : 'BenefitPay',
    cash: lang === 'ar' ? 'نقداً (كاش)' : 'Cash Payment',
    fastSecure: lang === 'ar' ? 'دفع سريع وآمن' : 'Fast & Secure',
    payAtService: lang === 'ar' ? 'ادفع عند الخدمة' : 'Pay after service',
    active: lang === 'ar' ? 'نشط' : 'Active'
  };

  const paymentMethods = [
    { 
      id: 'benefit', 
      icon: <Landmark size={24} />, 
      title: t.benefitPay, 
      desc: t.fastSecure, 
      color: 'red-600', 
      isSpecial: true 
    },
    { 
      id: 'apple', 
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" className="w-10" alt="apple pay" />, 
      title: 'Apple Pay', 
      desc: lang === 'ar' ? 'مرتبط بـ **** 4242' : 'Linked to **** 4242',
      color: 'white',
      isImage: true 
    },
    { 
      id: 'cash', 
      icon: <Banknote size={24} />, 
      title: t.cash, 
      desc: t.payAtService, 
      color: 'gold' 
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronLeft className="rotate-180" size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-xl font-black">{t.title}</h2>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard size={120} className="text-gold" />
        </div>
        <div className="relative z-10">
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">{t.available}</p>
          <h3 className="text-5xl font-black text-white">
            {MOCK_USER.walletBalance.toFixed(3)} 
            <span className="text-xl font-bold ml-2 text-stone-500">{lang === 'ar' ? 'د.ب' : 'BHD'}</span>
          </h3>
          
          <div className="flex gap-4 mt-8">
            <button className="flex-1 py-4 bg-gold text-stone-950 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all active:scale-95 shadow-lg">
              <Plus size={20} /> {t.addFunds}
            </button>
            <button className="flex-1 py-4 bg-stone-800 text-white font-black rounded-2xl border border-stone-700 hover:bg-stone-700 transition-all active:scale-95">
              {t.withdraw}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{t.methods}</h3>
          <button className="text-gold text-xs font-bold uppercase tracking-widest">{t.manage}</button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const isActive = selectedMethod === method.id;
            return (
              <div 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`group relative bg-stone-900 border-2 rounded-[32px] p-5 flex items-center gap-4 transition-all cursor-pointer active:scale-[0.98] ${
                  isActive ? 'border-gold bg-stone-900 shadow-[0_15px_30px_rgba(234,179,8,0.1)]' : 'border-stone-800/50 hover:border-stone-700'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-gold text-stone-950' 
                    : method.isSpecial 
                      ? 'bg-red-600/10 text-red-500 border border-red-500/20' 
                      : method.isImage 
                        ? 'bg-white' 
                        : 'bg-stone-800 text-stone-500'
                }`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-black text-sm transition-colors ${isActive ? 'text-white' : 'text-stone-300'}`}>{method.title}</p>
                    {isActive && (
                      <span className="bg-gold/10 text-gold text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-gold/20 animate-in fade-in zoom-in">
                        {t.active}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">{method.desc}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'border-gold bg-gold' : 'border-stone-700'
                }`}>
                  {isActive && <Check size={14} className="text-stone-950" strokeWidth={4} />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* History */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <History size={18} className="text-stone-500" />
          <h3 className="font-bold">{t.history}</h3>
        </div>
        <div className="space-y-3">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="bg-stone-900/50 p-4 rounded-3xl border border-stone-800 flex items-center gap-4 hover:bg-stone-900 transition-colors">
              <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-white">{tx.title}</p>
                <p className="text-[10px] text-stone-500">{tx.date}</p>
              </div>
              <p className={`font-black ${tx.type === 'credit' ? 'text-green-500' : 'text-white'}`}>
                {tx.type === 'credit' ? '+' : '-'}{Math.abs(tx.amount).toFixed(3)} {lang === 'ar' ? 'د.ب' : 'BHD'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WalletView;
