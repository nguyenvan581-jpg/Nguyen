/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Sparkles, 
  Users, 
  Calendar, 
  CalendarCheck, 
  Compass, 
  Heart, 
  ArrowRight,
  Menu,
  X,
  Send,
  CheckCircle2
} from 'lucide-react';

const sections = [
  { id: 'hero', name: 'Trang chủ' },
  { id: 'services', name: 'Chương trình' },
  { id: 'register', name: 'Đăng ký' }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfc] font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-xl font-bold font-display cursor-pointer ${isScrolled ? 'text-moss-600' : 'text-moss-600 md:text-white'}`}
            onClick={() => scrollToSection('hero')}
          >
            Coach Nguyễn Vân
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors hover:text-wood ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                {section.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('register')}
              className={`bg-moss-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-moss-600/20`}
            >
              Kết nối ngay
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-moss-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-ivory overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-left text-lg font-medium text-charcoal py-2 border-b border-ivory last:border-0"
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#e2ede5_0%,#fdfdfc_100%)] opacity-50" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-moss-600 hidden md:block rounded-l-[100px] transform translate-x-20 -skew-x-6" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-moss-100 text-moss-700 px-4 py-1 rounded-full text-xs font-semibold mb-6">
              <Sparkles size={14} />
              <span>Định Hướng Từ Tâm - Khai Minh Cộng Đồng</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-moss-800 leading-[1.1] mb-6">
              Đồng Hành & <br />
              <span className="text-wood italic">Định Hướng</span> Cùng <br />
              Coach Nguyễn Vân
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed italic border-l-4 border-wood pl-6 py-2 bg-ivory/50 rounded-r-lg">
              "Sử dụng Huyền học không phải để dự đoán tương lai, mà để soi sáng hiện tại, giúp mỗi huynh đệ tìm thấy vị trí phù hợp nhất trên hành trình rèn luyện Ba Gốc: Đạo đức – Trí tuệ – Nghị lực."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-moss-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-moss-700 transition-all shadow-xl shadow-moss-600/30"
              >
                <span>Khám phá chương trình</span>
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => scrollToSection('register')}
                className="bg-white text-moss-600 border-2 border-moss-600 px-8 py-4 rounded-xl font-bold hover:bg-moss-50 transition-all"
              >
                Liên hệ trực tiếp
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:flex justify-center relative"
          >
            {/* Visual element representing nature/growth */}
            <div className="w-80 h-[500px] border-8 border-ivory rounded-full overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-moss-700 flex items-center justify-center p-8 text-white text-center">
                <div className="space-y-6">
                  <Leaf size={64} className="mx-auto text-wood animate-pulse" />
                  <div className="space-y-2">
                    <p className="text-2xl font-display italic">"Tâm an vạn sự an"</p>
                    <p className="text-sm opacity-70 tracking-widest uppercase">Khai Minh 3.0</p>
                  </div>
                  <div className="pt-8 grid grid-cols-3 gap-2">
                    <div className="h-20 bg-ivory/20 rounded-full flex items-center justify-center"><Compass size={24}/></div>
                    <div className="h-20 bg-ivory/20 rounded-full flex items-center justify-center"><Heart size={24}/></div>
                    <div className="h-20 bg-ivory/20 rounded-full flex items-center justify-center"><Users size={24}/></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-wood/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-moss-200/40 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display text-moss-800 mb-4"
            >
              Chương Trình Đồng Hành
            </motion.h2>
            <div className="w-20 h-1 bg-wood mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto">
              Những lộ trình được thiết kế cá nhân hóa để giúp bạn thấu hiểu bản thân và chuyển hóa nội tâm bền vững.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Khai Vấn 1:1: Định Hướng",
                desc: "Dành cho các thành viên mới hoặc huynh đệ cần nhìn nhận lại chặng đường phát triển.",
                features: [
                  "Ứng dụng Thần số học, Tử Vi & Nhân tướng học",
                  "Tư vấn lộ trình học tập, hòa nhập vào Kaizen Khai Minh 3.0",
                  "Gỡ rối vướng mắc, hướng tới tự quản trị bản thân"
                ],
                icon: <Compass className="text-moss-600" size={32} />,
                btnText: "Đặt lịch ngay"
              },
              {
                id: 2,
                title: "Hành Trình Passport Hạnh Phúc",
                desc: "30 ngày đồng hành xuyên suốt để chuyển hóa nhận thức thành thói quen thực tế.",
                features: [
                  "Thực hành \"Nhật Ký Nội Tâm\" (5 bước nhận diện)",
                  "Châm sóc thế giới bên trong, kiến tạo bình an",
                  "Xây dựng vòng tròn kết nối huynh đệ chặt chẽ"
                ],
                icon: <Heart className="text-moss-600" size={32} />,
                btnText: "Tham gia hành trình",
                highlight: true
              },
              {
                id: 3,
                title: "Nghệ Thuật Thu Phục Nhân Tâm",
                desc: "Khóa huấn luyện dành cho Ban Phụng Sự, Ban Kết Nối và quản lý đội ngũ.",
                features: [
                  "Kết hợp Huyền học với triết lý quản trị \"Cách Sống\"",
                  "Xây dựng tinh thần đồng đội cho Ban Phụng Sự",
                  "Cung cấp checklist, biểu mẫu vận hành cộng đồng"
                ],
                icon: <Users className="text-moss-600" size={32} />,
                btnText: "Liên hệ tổ chức"
              }
            ].map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-3xl transition-all duration-300 flex flex-col h-full group ${
                  service.highlight 
                    ? 'bg-moss-700 text-white shadow-2xl shadow-moss-700/20 md:-translate-y-4' 
                    : 'bg-moss-50 border border-moss-100 hover:shadow-xl hover:bg-white'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  service.highlight ? 'bg-white/10' : 'bg-white'
                }`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-display mb-4 ${service.highlight ? 'text-white' : 'text-moss-800'}`}>
                  {service.title}
                </h3>
                <p className={`mb-8 text-sm leading-relaxed ${service.highlight ? 'text-moss-100' : 'text-gray-600'}`}>
                  {service.desc}
                </p>
                <ul className="space-y-3 mb-10 flex-grow">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm">
                      <div className={`mt-1 flex-shrink-0 ${service.highlight ? 'text-wood' : 'text-moss-600'}`}>
                        <CheckCircle2 size={16} />
                      </div>
                      <span className={service.highlight ? 'text-moss-50' : 'text-charcoal'}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('register')}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                    service.highlight 
                      ? 'bg-wood text-white hover:bg-opacity-90' 
                      : 'bg-moss-600 text-white hover:bg-moss-700'
                  }`}
                >
                  <span>{service.btnText}</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 bg-ivory relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-moss-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wood/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display text-moss-800 mb-6">Kết Nối Với Tôi</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Dù bạn đang ở đâu trên hành trình rèn luyện, tôi luôn ở đây để lắng nghe, chia sẻ và đồng hành cùng bạn tìm thấy ánh sáng nội tâm.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <CalendarCheck size={24}/>, title: "Linh hoạt thời gian", desc: "Sắp xếp lịch khai vấn phù hợp với lịch trình bận rộn của bạn." },
                { icon: <Users size={24}/>, title: "Cộng đồng Khai Minh", desc: "Hòa mình vào môi trường Tam Bảo: Thầy hiền trí, Bạn tốt, Sách hay." },
                { icon: <Sparkles size={24}/>, title: "Chuyển hóa thực sự", desc: "Không chỉ là lý thuyết, chúng ta cùng thực hành để thay đổi cuộc đời." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-moss-600 shadow-sm border border-moss-100 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-moss-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[40px] shadow-2xl relative"
          >
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-moss-100 text-moss-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-display text-moss-800 mb-2">Gửi thành công!</h3>
                <p className="text-gray-500">Cảm ơn huynh đệ, Coach Nguyễn Vân sẽ liên hệ sớm nhất có thể.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 ml-1">Tên của huynh đệ</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full px-5 py-4 bg-moss-50 border-none rounded-2xl focus:ring-2 focus:ring-moss-600 transition-all outline-none text-charcoal"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 ml-1">Ngày sinh (Dương/Âm)</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Kèm giờ sinh nếu có"
                      className="w-full px-5 py-4 bg-moss-50 border-none rounded-2xl focus:ring-2 focus:ring-moss-600 transition-all outline-none text-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 ml-1">Chương trình quan tâm</label>
                  <select className="w-full px-5 py-4 bg-moss-50 border-none rounded-2xl focus:ring-2 focus:ring-moss-600 transition-all outline-none text-charcoal appearance-none cursor-pointer">
                    <option value="1">Khai Vấn 1:1 Định Hướng</option>
                    <option value="2">Hành Trình Passport Hạnh Phúc</option>
                    <option value="3">Huấn Luyện Thu Phục Nhân Tâm</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 ml-1">Mong muốn chuyển hóa</label>
                  <textarea 
                    rows={4} 
                    placeholder="Hãy chia sẻ những trăn trở hoặc mong đợi của bạn..."
                    className="w-full px-5 py-4 bg-moss-50 border-none rounded-2xl focus:ring-2 focus:ring-moss-600 transition-all outline-none text-charcoal resize-none"
                  ></textarea>
                </div>

                <button 
                  disabled={formStatus === 'submitting'}
                  type="submit" 
                  className="w-full bg-moss-800 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-moss-700 transition-all shadow-xl shadow-moss-800/20 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <Sparkles className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Gửi Thông Tin Đăng Ký</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-moss-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center bg-moss-700/50 p-8 rounded-[30px] border border-white/5 mb-10">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-display mb-2">Coach Nguyễn Vân</h3>
              <p className="text-moss-200 text-sm italic max-w-sm">"Sử dụng Huyền học không phải để dự đoán tương lai, mà để soi sáng hiện tại."</p>
            </div>
            <div className="flex space-x-4">
              {['Facebook', 'YouTube', 'TikTok'].map((social) => (
                <button key={social} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-wood hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  {social === 'Facebook' && <Users size={20} />}
                  {social === 'YouTube' && <Sparkles size={20} />}
                  {social === 'TikTok' && <Leaf size={20} />}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center text-moss-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Coach Nguyễn Vân. Đồng hành cùng Cộng đồng Khai Minh.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
