// ==========================================
// لؤلؤ البحر الأولى - المنطق البرمجي للواجهة
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 0. إدارة مبدل المظهر (Dark/Light Pearl Mode)
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    
    // جلب وحفظ الثيم المفضل للمستخدم في المتصفح
    const currentTheme = localStorage.getItem("pearl-theme") || "dark";
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            
            // تحديد الثيم الحالي لحفظه
            let theme = "dark";
            if (document.body.classList.contains("light-theme")) {
                theme = "light";
            }
            localStorage.setItem("pearl-theme", theme);
        });
    }

    // 1. إدارة شريط التنقل وتأثير التمرير
    const header = document.getElementById("main-header");
    const navLinks = document.querySelectorAll(".nav-link");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // تحديث الرابط النشط بناءً على التمرير
        let currentSection = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // 2. قائمة الهاتف المحمول (Hamburger Menu)
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 3. فلترة المنتجات في معرض المبيعات
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const filterValue = button.getAttribute("data-filter");
            
            productCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // 4. محاكي تقييم الهواتف الذكية التفاعلي
    const steps = document.querySelectorAll(".step-content");
    const stepIndicators = document.querySelectorAll(".step-indicator");
    const progressBarFill = document.getElementById("progress-bar-fill");
    
    const prevBtn = document.getElementById("prev-step-btn");
    const nextBtn = document.getElementById("next-step-btn");
    const restartBtn = document.getElementById("restart-simulator-btn");
    const navButtonsContainer = document.getElementById("simulator-nav-btns");
    const modelOptionsContainer = document.getElementById("model-options-container");
    
    let currentStep = 1;
    
    const devicePricingData = {
        Apple: [
            { id: "iphone15pm", label: "iPhone 15 Pro Max", baseMin: 4600, baseMax: 5900 },
            { id: "iphone15p", label: "iPhone 15 Pro", baseMin: 3900, baseMax: 4900 },
            { id: "iphone14pm", label: "iPhone 14 Pro Max", baseMin: 3300, baseMax: 4300 },
            { id: "iphone13pm", label: "iPhone 13 Pro Max", baseMin: 2500, baseMax: 3200 },
            { id: "iphone12p", label: "iPhone 12 Pro", baseMin: 1650, baseMax: 2200 }
        ],
        Samsung: [
            { id: "s24u", label: "Galaxy S24 Ultra", baseMin: 4100, baseMax: 5300 },
            { id: "s23u", label: "Galaxy S23 Ultra", baseMin: 2900, baseMax: 3800 },
            { id: "s22u", label: "Galaxy S22 Ultra", baseMin: 1900, baseMax: 2500 },
            { id: "zfold5", label: "Galaxy Z Fold 5", baseMin: 3600, baseMax: 4800 },
            { id: "a54", label: "Galaxy A54", baseMin: 850, baseMax: 1250 }
        ],
        Other: [
            { id: "xiaomi14u", label: "Xiaomi 14 Ultra", baseMin: 3400, baseMax: 4500 },
            { id: "huaweip60p", label: "Huawei P60 Pro", baseMin: 2500, baseMax: 3400 },
            { id: "pixel8p", label: "Pixel 8 Pro", baseMin: 2200, baseMax: 2900 },
            { id: "oneplus12", label: "OnePlus 12", baseMin: 2600, baseMax: 3500 },
            { id: "generic", label: "موديل آخر حديث", baseMin: 600, baseMax: 1800 }
        ]
    };

    function populateModelOptions(brand) {
        if (!modelOptionsContainer) return;
        modelOptionsContainer.innerHTML = "";
        
        const models = devicePricingData[brand] || [];
        
        models.forEach((model, index) => {
            const isRequired = index === 0 ? "required" : "";
            const optionHtml = `
                <label class="option-card" id="label-model-${model.id}">
                    <input type="radio" name="model" value="${model.id}" data-label="${model.label}" class="hidden-radio" ${isRequired}>
                    <span class="option-icon"><i class="fas fa-mobile-alt"></i></span>
                    <span class="option-label">${model.label}</span>
                </label>
            `;
            modelOptionsContainer.insertAdjacentHTML("beforeend", optionHtml);
        });
        
        bindOptionCardEvents();
    }

    function bindOptionCardEvents() {
        const optionCards = document.querySelectorAll(".option-card");
        
        optionCards.forEach(card => {
            card.onclick = null;
            card.onclick = function() {
                const radio = this.querySelector('input[type="radio"]');
                const name = radio.getAttribute("name");
                
                document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
                    const parent = input.closest(".option-card");
                    if (parent) parent.classList.remove("selected");
                });
                
                radio.checked = true;
                this.classList.add("selected");
                
                if (name === "brand") {
                    populateModelOptions(radio.value);
                    setTimeout(() => { goToStep(2); }, 300);
                } else if (name === "storage") {
                    setTimeout(() => { goToStep(4); }, 300);
                }
            };
        });
    }

    function goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 5) return;
        
        steps.forEach(step => step.classList.remove("active"));
        const activeStepContent = document.querySelector(`.step-content[data-step="${stepNumber}"]`);
        if (activeStepContent) activeStepContent.classList.add("active");
        
        stepIndicators.forEach(ind => {
            const indStep = parseInt(ind.getAttribute("data-step"));
            ind.classList.remove("active", "completed");
            if (indStep === stepNumber) {
                ind.classList.add("active");
            } else if (indStep < stepNumber) {
                ind.classList.add("completed");
            }
        });
        
        if (progressBarFill) {
            const progressPercent = ((stepNumber - 1) / 4) * 100;
            progressBarFill.style.width = `${progressPercent}%`;
        }
        
        currentStep = stepNumber;
        
        if (currentStep === 1) {
            prevBtn.disabled = true;
            nextBtn.style.display = "block";
        } else if (currentStep === 5) {
            navButtonsContainer.style.display = "none";
            calculateAndShowResult();
        } else {
            prevBtn.disabled = false;
            nextBtn.style.display = "block";
            navButtonsContainer.style.display = "flex";
        }
    }

    function validateCurrentStep() {
        const activeStepElement = document.querySelector(`.step-content[data-step="${currentStep}"]`);
        if (!activeStepElement) return false;
        
        const checkedInput = activeStepElement.querySelector('input[type="radio"]:checked');
        if (!checkedInput) {
            alert("الرجاء اختيار أحد الخيارات المتاحة للمتابعة.");
            return false;
        }
        return true;
    }

    function calculateAndShowResult() {
        const brandInput = document.querySelector('input[name="brand"]:checked');
        const modelInput = document.querySelector('input[name="model"]:checked');
        const storageInput = document.querySelector('input[name="storage"]:checked');
        const conditionInput = document.querySelector('input[name="condition"]:checked');
        
        if (!brandInput || !modelInput || !storageInput || !conditionInput) return;
        
        const brandValue = brandInput.value;
        const modelId = modelInput.value;
        const storageValue = storageInput.value;
        const conditionValue = conditionInput.value;
        
        const brandModels = devicePricingData[brandValue] || [];
        const modelData = brandModels.find(m => m.id === modelId) || { baseMin: 500, baseMax: 1500, label: "جهاز حديث" };
        
        let minPrice = modelData.baseMin;
        let maxPrice = modelData.baseMax;
        
        let storageMultiplier = 1.0;
        if (storageValue === "128GB") {
            storageMultiplier = 0.9;
        } else if (storageValue === "512GB") {
            storageMultiplier = 1.15;
        }
        
        minPrice *= storageMultiplier;
        maxPrice *= storageMultiplier;
        
        let conditionMultiplier = 1.0;
        if (conditionValue === "excellent") {
            conditionMultiplier = 0.88;
        } else if (conditionValue === "good") {
            conditionMultiplier = 0.75;
        }
        
        minPrice *= conditionMultiplier;
        maxPrice *= conditionMultiplier;
        
        minPrice = Math.round(minPrice / 50) * 50;
        maxPrice = Math.round(maxPrice / 50) * 50;
        
        document.getElementById("price-min").textContent = minPrice.toLocaleString();
        document.getElementById("price-max").textContent = maxPrice.toLocaleString();
        
        const modelLabel = modelInput.getAttribute("data-label");
        let conditionLabel = "كالجديد";
        if (conditionValue === "excellent") conditionLabel = "ممتاز";
        if (conditionValue === "good") conditionLabel = "مستعمل نظيف";
        
        const whatsappMsg = `مرحباً لؤلؤ البحر الأولى، قمت بتقييم هاتف عبر موقعكم الإلكتروني وأرغب في بيعه أو استبداله بالصالة:
- الجهاز: ${brandValue} ${modelLabel}
- السعة: ${storageValue}
- الحالة: ${conditionLabel}
- التقييم التقريبي: ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} دينار ليبي
أود حجز موعد لفحص الهاتف في الصالة بشارع المدار.`;
        
        const whatsappLink = `https://wa.me/218917001415?text=${encodeURIComponent(whatsappMsg)}`;
        const whatsappBtn = document.getElementById("submit-valuation-whatsapp");
        if (whatsappBtn) {
            whatsappBtn.href = whatsappLink;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (validateCurrentStep()) {
                goToStep(currentStep + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            goToStep(currentStep - 1);
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            const form = document.getElementById("simulator-form");
            if (form) form.reset();
            
            document.querySelectorAll(".option-card").forEach(card => card.classList.remove("selected"));
            
            navButtonsContainer.style.display = "flex";
            goToStep(1);
        });
    }

    bindOptionCardEvents();

    // 5. تفاعلية الأسئلة الشائعة (FAQ Accordion)
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentNode;
            const isActive = item.classList.contains("active");
            
            // إغلاق أي أسئلة أخرى مفتوحة
            document.querySelectorAll(".faq-item").forEach(faqItem => {
                faqItem.classList.remove("active");
            });
            
            // فتح السؤال الحالي إذا لم يكن مفتوحاً
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // 6. شريط آراء العملاء (Testimonials Slider)
    const track = document.getElementById("testimonials-track");
    const dots = document.querySelectorAll(".slider-dot");
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoPlayInterval;

    function moveToSlide(slideIndex) {
        if (!track) return;
        currentSlide = slideIndex;
        
        // في RTL، نقوم بالإزاحة الموجبة لعرض الشرائح التالية (تتحرك لليمين لتجلب الشريحة اليسرى)
        track.style.transform = `translateX(${currentSlide * 100}%)`;
        
        // تحديث نقاط التحكم (dots)
        dots.forEach(dot => dot.classList.remove("active"));
        const activeDot = document.querySelector(`.slider-dot[data-index="${currentSlide}"]`);
        if (activeDot) activeDot.classList.add("active");
    }

    // إعداد الضغط على النقاط
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"));
            moveToSlide(index);
            resetAutoPlay();
        });
    });

    // تشغيل تلقائي
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= totalSlides) {
                nextSlide = 0;
            }
            moveToSlide(nextSlide);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    if (track && totalSlides > 0) {
        startAutoPlay();
    }

    // 7. تهيئة الخريطة التفاعلية (Leaflet Map)
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
        const locationCoords = [32.8820, 13.1790];
        
        const map = L.map("map", {
            center: locationCoords,
            zoom: 16,
            scrollWheelZoom: false
        });
        
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        const goldIcon = L.divIcon({
            html: '<div class="custom-marker"><i class="fas fa-gem" style="color: #c5a85c; font-size: 1.8rem; text-shadow: 0 0 10px rgba(197,168,92,0.8);"></i></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            className: 'my-div-icon'
        });

        const marker = L.marker(locationCoords, { icon: goldIcon }).addTo(map);
        
        marker.bindPopup(`
            <div style="font-family: 'Cairo', sans-serif; text-align: right; color: #fff; background: #111522; border-radius: 8px; padding: 5px;">
                <h4 style="margin: 0 0 5px 0; color: #c5a85c; font-size: 1.05rem;">لؤلؤ البحر الأولى</h4>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.4; color: #94a3b8;">شارع المدار، طرابلس، ليبيا<br>بجانب شركة المدار الجديد</p>
                <a href="https://maps.google.com/?q=${locationCoords[0]},${locationCoords[1]}" target="_blank" style="display: inline-block; margin-top: 8px; font-size: 0.8rem; color: #3b8e90; font-weight: 600;">افتح في خرائط جوجل &larr;</a>
            </div>
        `).openPopup();

        map.on("focus", () => { map.scrollWheelZoom.enable(); });
        map.on("blur", () => { map.scrollWheelZoom.disable(); });
    }
});
