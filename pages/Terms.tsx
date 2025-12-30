// Edit Version: 1.0.3
import React from 'react';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12">
        <div className="flex items-center gap-5 mb-10 border-b border-slate-100 pb-8">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl">
                <Scale size={36} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-slate-900">الشروط والأحكام</h1>
                <p className="text-slate-500 mt-1">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
            </div>
        </div>

        <div className="space-y-10 text-slate-600 leading-loose">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="p-1.5 bg-teal-100 rounded-lg text-teal-600"><ShieldCheck size={20} /></span>
                1. مقدمة
            </h2>
            <p>
              مرحباً بكم في موقع "All-news". باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. تم تصميم هذا الموقع لغرض جمع وعرض الأخبار من مصادر رسمية وموثوقة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <span className="p-1.5 bg-teal-100 rounded-lg text-teal-600"><FileText size={20} /></span>
                2. حقوق الملكية الفكرية
            </h2>
            <p>
              جميع المحتويات الإخبارية المعروضة (نصوص، صور، عناوين) هي ملك لأصحابها الأصليين. نحن نقوم فقط بعرض خلاصات RSS المتاحة للعموم مع الإشارة للمصدر.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                 <span className="p-1.5 bg-teal-100 rounded-lg text-teal-600"><Scale size={20} /></span>
                3. إخلاء المسؤولية
            </h2>
            <p>
              نحن نسعى جاهدين لضمان دقة المعلومات من خلال الجلب الآلي من المصادر الرسمية، ولكننا لا نتحمل مسؤولية أي أخطاء في المصدر الأصلي أو انقطاع في الخدمة.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};