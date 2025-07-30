import { LandingPage, LandingPageSection } from '../types';

export class HTMLExportService {
  static generateHTML(page: LandingPage): string {
    const sections = page.sections
      .sort((a, b) => a.order - b.order)
      .map(section => this.renderSectionHTML(section, page))
      .join('\\n\\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo?.title || page.name}</title>
  <meta name="description" content="${page.seo?.description || ''}">
  <meta name="keywords" content="${page.seo?.keywords?.join(', ') || ''}">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=${page.brandSettings.fonts.heading.replace(' ', '+')}:wght@300;400;500;600;700;800;900&family=${page.brandSettings.fonts.body.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Custom Styles -->
  <style>
    :root {
      --primary-color: ${page.brandSettings.colors.primary};
      --secondary-color: ${page.brandSettings.colors.secondary};
      --accent-color: ${page.brandSettings.colors.accent};
      --text-color: ${page.brandSettings.colors.text};
      --background-color: ${page.brandSettings.colors.background};
    }
    
    body {
      font-family: '${page.brandSettings.fonts.body}', system-ui, sans-serif;
      color: var(--text-color);
      background-color: var(--background-color);
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: '${page.brandSettings.fonts.heading}', system-ui, sans-serif;
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      transition: all 0.2s;
    }
    
    .btn-primary:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  </style>
  
  ${page.gtmSettings.containerId ? this.generateGTMHead(page.gtmSettings.containerId) : ''}
</head>
<body>
  ${page.gtmSettings.containerId ? this.generateGTMBody(page.gtmSettings.containerId) : ''}
  
  ${sections}
  
  <script>
    // FAQ Toggle
    function toggleFAQ(element) {
      const content = element.nextElementSibling;
      const icon = element.querySelector('.faq-icon');
      
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
      } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
      }
    }
    
    // Mobile Menu Toggle
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }
    
    // GTM Data Layer Events
    window.dataLayer = window.dataLayer || [];
    
    function gtag() {
      dataLayer.push(arguments);
    }
    
    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .cta-button').forEach(button => {
      button.addEventListener('click', function() {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: this.textContent.trim(),
          value: 1
        });
      });
    });
  </script>
</body>
</html>`;
  }

  private static generateGTMHead(containerId: string): string {
    return `
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${containerId}');</script>
  <!-- End Google Tag Manager -->`;
  }

  private static generateGTMBody(containerId: string): string {
    return `
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`;
  }

  private static renderSectionHTML(section: LandingPageSection, page: LandingPage): string {
    const sectionStyle = this.generateSectionStyle(section);
    
    switch (section.type) {
      case 'hero':
        return this.renderHeroSection(section, page, sectionStyle);
      case 'features':
        return this.renderFeaturesSection(section, page, sectionStyle);
      case 'testimonials':
        return this.renderTestimonialsSection(section, page, sectionStyle);
      case 'faq':
        return this.renderFAQSection(section, page, sectionStyle);
      case 'cta':
        return this.renderCTASection(section, page, sectionStyle);
      case 'how-it-works':
        return this.renderHowItWorksSection(section, page, sectionStyle);
      case 'pricing':
        return this.renderPricingSection(section, page, sectionStyle);
      case 'credibility':
        return this.renderCredibilitySection(section, page, sectionStyle);
      case 'header':
        return this.renderHeaderSection(section, page, sectionStyle);
      case 'leadform':
        return this.renderLeadFormSection(section, page, sectionStyle);
      default:
        return `<div class="py-16 px-6" ${sectionStyle}><div class="max-w-4xl mx-auto text-center"><p>Section type '${section.type}' not implemented in export</p></div></div>`;
    }
  }

  private static generateSectionStyle(section: LandingPageSection): string {
    const style = section.style;
    let styleString = '';
    
    if (style.backgroundColor || style.backgroundImage) {
      styleString += `style="`;
      if (style.backgroundColor) {
        styleString += `background-color: ${style.backgroundColor};`;
      }
      if (style.backgroundImage) {
        styleString += `background-image: url(${style.backgroundImage}); background-size: cover; background-position: center;`;
      }
      if (style.textColor) {
        styleString += `color: ${style.textColor};`;
      }
      styleString += `"`;
    }
    
    return styleString;
  }

  private static renderHeroSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    return `
<section class="relative py-20 px-6 text-center" ${sectionStyle}>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">${data.headline || 'Your Compelling Headline'}</h1>
    ${data.subheadline ? `<h2 class="text-xl md:text-2xl mb-8 opacity-90">${data.subheadline}</h2>` : ''}
    ${data.body ? `<p class="text-lg mb-10 max-w-2xl mx-auto opacity-80">${data.body}</p>` : ''}
    ${data.cta ? `<a href="#contact" class="btn-primary cta-button">${data.cta}</a>` : ''}
  </div>
</section>`;
  }

  private static renderFeaturesSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    const featuresHTML = data.features?.map((feature: any, index: number) => `
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <div class="text-2xl mb-4">${feature.icon || '⭐'}</div>
        <h3 class="text-xl font-semibold mb-4">${feature.title || `Feature ${index + 1}`}</h3>
        <p class="opacity-80">${feature.description || 'Feature description goes here.'}</p>
      </div>
    `).join('') || '';

    return `
<section class="py-16 px-6" ${sectionStyle}>
  <div class="max-w-6xl mx-auto">
    ${data.headline ? `<h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${data.headline}</h2>` : ''}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${featuresHTML}
    </div>
  </div>
</section>`;
  }

  private static renderTestimonialsSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    const testimonialsHTML = data.testimonials?.map((testimonial: any) => `
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div class="flex mb-4">
          ${Array.from({length: testimonial.rating || 5}, () => '⭐').join('')}
        </div>
        <blockquote class="text-lg mb-6 leading-relaxed">
          "${testimonial.content || 'This service has been amazing for our business.'}"
        </blockquote>
        <div class="flex items-center">
          <div>
            <div class="font-semibold">${testimonial.name || 'Customer Name'}</div>
            <div class="text-sm opacity-70">${testimonial.role || 'Customer'}${testimonial.company ? `, ${testimonial.company}` : ''}</div>
          </div>
        </div>
      </div>
    `).join('') || '';

    return `
<section class="py-16 px-6" ${sectionStyle}>
  <div class="max-w-6xl mx-auto">
    ${data.headline ? `<h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${data.headline}</h2>` : ''}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${testimonialsHTML}
    </div>
  </div>
</section>`;
  }

  private static renderFAQSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    const faqsHTML = data.faqs?.map((faq: any, index: number) => `
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
        <button onclick="toggleFAQ(this)" class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50">
          <h3 class="text-lg font-semibold">${faq.question || `Question ${index + 1}`}</h3>
          <span class="faq-icon transition-transform duration-200">▼</span>
        </button>
        <div class="px-6 pb-5" style="display: none;">
          <p class="text-gray-700">${faq.answer || 'Answer goes here.'}</p>
        </div>
      </div>
    `).join('') || '';

    return `
<section class="py-16 px-6" ${sectionStyle}>
  <div class="max-w-4xl mx-auto">
    ${data.headline ? `<h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${data.headline}</h2>` : ''}
    <div class="space-y-4">
      ${faqsHTML}
    </div>
  </div>
</section>`;
  }

  private static renderCTASection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    return `
<section class="py-20 px-6 text-center" ${sectionStyle}>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold mb-6">${data.headline || 'Ready to Get Started?'}</h2>
    ${data.body ? `<p class="text-xl mb-10 opacity-90 max-w-2xl mx-auto">${data.body}</p>` : ''}
    ${data.cta ? `<a href="#contact" class="btn-primary cta-button text-xl px-10 py-5">${data.cta}</a>` : ''}
  </div>
</section>`;
  }

  private static renderHowItWorksSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    const stepsHTML = data.steps?.map((step: any) => `
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6" style="background-color: ${step.color}20">
          <span class="text-2xl">${step.icon || '⚙️'}</span>
        </div>
        <h3 class="text-2xl font-bold mb-4">${step.title}</h3>
        <p class="text-lg opacity-80 mb-6">${step.description}</p>
        ${step.time ? `<span class="text-sm font-medium text-blue-600">${step.time}</span>` : ''}
      </div>
    `).join('') || '';

    return `
<section class="py-20 px-6" ${sectionStyle}>
  <div class="max-w-6xl mx-auto">
    ${data.headline ? `<h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${data.headline}</h2>` : ''}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      ${stepsHTML}
    </div>
  </div>
</section>`;
  }

  private static renderPricingSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    const plansHTML = data.plans?.map((plan: any) => `
      <div class="bg-white rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'} p-8">
        ${plan.popular ? '<div class="text-center mb-4"><span class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span></div>' : ''}
        <h3 class="text-xl font-bold mb-4">${plan.name}</h3>
        <div class="mb-6"><span class="text-4xl font-bold" style="color: var(--primary-color)">${plan.price}</span><span class="text-gray-600 ml-2">${plan.period}</span></div>
        <ul class="space-y-3 mb-8">
          ${plan.features?.map((feature: string) => `<li class="flex items-center"><span class="text-green-500 mr-3">✓</span>${feature}</li>`).join('') || ''}
        </ul>
        <a href="#contact" class="btn-primary w-full text-center cta-button">${plan.cta}</a>
      </div>
    `).join('') || '';

    return `
<section class="py-20 px-6" ${sectionStyle}>
  <div class="max-w-7xl mx-auto">
    ${data.headline ? `<h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${data.headline}</h2>` : ''}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      ${plansHTML}
    </div>
  </div>
</section>`;
  }

  private static renderCredibilitySection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    return `
<section class="py-16 px-6 bg-gray-50" ${sectionStyle}>
  <div class="max-w-6xl mx-auto text-center">
    ${data.headline ? `<h2 class="text-2xl md:text-3xl font-bold mb-12">${data.headline}</h2>` : ''}
    <p class="text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">Trusted by leading companies</p>
    <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
      <div class="text-4xl">🏢</div>
      <div class="text-4xl">⚡</div>
      <div class="text-4xl">📊</div>
      <div class="text-4xl">☁️</div>
      <div class="text-4xl">🔒</div>
      <div class="text-4xl">📈</div>
    </div>
  </div>
</section>`;
  }

  private static renderHeaderSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    const navHTML = data.navigation?.map((item: any) => `
      <a href="${item.href}" class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">${item.label}</a>
    `).join('') || '';

    return `
<header class="sticky top-0 z-50 bg-white border-b border-gray-200" ${sectionStyle}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        ${page.brandSettings.logo ? `<img src="${page.brandSettings.logo}" alt="Logo" class="h-8 w-auto">` : `<div class="text-2xl font-bold" style="color: var(--primary-color)">${data.logoText || 'Brand'}</div>`}
      </div>
      <nav class="hidden md:flex space-x-8">
        ${navHTML}
      </nav>
      <div class="hidden md:block">
        <a href="#contact" class="btn-primary">${data.cta || 'Get Started'}</a>
      </div>
      <div class="md:hidden">
        <button onclick="toggleMobileMenu()" class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">☰</button>
      </div>
    </div>
  </div>
  <div id="mobile-menu" class="md:hidden hidden border-t border-gray-200 bg-white">
    <div class="px-2 pt-2 pb-3 space-y-1">
      ${navHTML}
      <div class="px-3 py-2">
        <a href="#contact" class="btn-primary w-full text-center">${data.cta || 'Get Started'}</a>
      </div>
    </div>
  </div>
</header>`;
  }

  private static renderLeadFormSection(section: LandingPageSection, page: LandingPage, sectionStyle: string): string {
    const data = section.data;
    return `
<section id="contact" class="py-16 px-6 bg-gray-50" ${sectionStyle}>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">${data.headline || 'Get Your Free Quote'}</h2>
    <div class="bg-white p-8 rounded-lg shadow-sm">
      <form class="space-y-4">
        <input type="text" placeholder="Name" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
        <input type="email" placeholder="Email" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
        <input type="tel" placeholder="Phone" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
        <textarea placeholder="Message" class="w-full px-3 py-2 border border-gray-300 rounded-lg h-24" rows="4"></textarea>
        <button type="submit" class="btn-primary w-full">${data.cta || 'Send Request'}</button>
      </form>
    </div>
  </div>
</section>`;
  }

  static downloadHTML(page: LandingPage) {
    const html = this.generateHTML(page);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }
}