/**
 * NAIJA POT KITCHEN & GRILL LTD - CLIENT SCRIPT
 * Production-Ready Vanilla JavaScript for Static Hosting (Apache/Nginx/Shared)
 * Features:
 *  - Categorized Menu Rendering & Live Filtering / Search
 *  - Interactive Cart Drawer with LocalStorage Persistence
 *  - WhatsApp Direct Order Message Formatter & Checkout
 *  - Table Reservation System with Client-Side Validation
 *  - Quick View Dish Modal
 *  - Responsive Navigation & Accessibility Handlers
 */

(function () {
  'use strict';

  // --- BRAND & RESTAURANT CONFIGURATION ---
  const RESTAURANT_CONFIG = {
    brandName: "NAIJA POT KITCHEN & GRILL LTD",
    phone: "+44 7444 614764",
    whatsappNumber: "447342229865",
    currencySymbol: "£",
    vatRate: 0.20,
    closedDays: [1], // 1 = Monday closed for kitchen prep
  };

  // --- COMPLETE DISHES CATALOG ---
  const DISHES = [
    // Starters & Small Chops
    {
      id: "chops-1",
      name: "Lagos Street Puff Puff & Samosas",
      nativeName: "Naija Small Chops",
      category: "starters",
      price: 8.50,
      spiceLevel: 1,
      dietary: ["Halal", "Vegetarian"],
      description: "Golden fried sweet yeast puff puff balls, crispy vegetable samosas, and spicy peppered gizzard dips.",
      popular: true
    },
    {
      id: "chops-2",
      name: "Spiced Asun Goat Bites",
      nativeName: "Peppered Asun",
      category: "starters",
      price: 11.00,
      spiceLevel: 3,
      dietary: ["Halal", "Gluten-Free"],
      description: "Tender goat meat slow-roasted over woodfire, tossed with fiery scotch bonnet peppers and sliced red onions."
    },
    {
      id: "chops-3",
      name: "Honey Glazed Chicken Wings",
      nativeName: "Sweet & Pepper Wings",
      category: "starters",
      price: 9.50,
      spiceLevel: 2,
      dietary: ["Halal"],
      description: "Charcoal-crisped chicken wings tossed in our house reduction of ginger, garlic, honey, and crushed red chilies."
    },

    // Rice Dishes
    {
      id: "jollof-1",
      name: "Smoky Lagos Party Jollof",
      nativeName: "Party Jollof Rice",
      category: "rice",
      price: 15.50,
      spiceLevel: 2,
      dietary: ["Halal", "Chef Signature"],
      description: "Firewood-smoked parboiled long-grain rice infused with roasted plum tomatoes, scotch bonnets, served with dodo & grilled chicken.",
      popular: true
    },
    {
      id: "rice-2",
      name: "Special Bukka Fried Rice",
      nativeName: "Naija Fried Rice",
      category: "rice",
      price: 16.00,
      spiceLevel: 1,
      dietary: ["Halal"],
      description: "Fragrant rice stir-fried in rich beef broth with sweet corn, spring onions, diced carrots, liver, and succulent jumbo prawns."
    },
    {
      id: "rice-3",
      name: "Ayamase Designer Rice",
      nativeName: "Ofada & Ayamase Pot",
      category: "rice",
      price: 18.00,
      spiceLevel: 3,
      dietary: ["Halal", "Gluten-Free"],
      description: "Aromatic indigenous brown rice paired with bleached palm oil green pepper stew, assorted braised offals, and boiled egg."
    },

    // Charcoal Suya & Grill
    {
      id: "suya-1",
      name: "Charcoal Prime Beef Suya",
      nativeName: "Northern Yaji Suya",
      category: "grill",
      price: 12.00,
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      description: "Thinly carved British beef rubbed in roasted groundnut yaji spice, blistered over hot charcoal coals with onions and fresh tomatoes.",
      popular: true
    },
    {
      id: "grill-2",
      name: "Whole Grilled Croaker Fish",
      nativeName: "Fish Barbecue Special",
      category: "grill",
      price: 24.50,
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      description: "Fresh Atlantic croaker marinated in aromatic herbs and scotch bonnet paste, flame-charred and served with spiced yam chips."
    },
    {
      id: "grill-3",
      name: "Jumbo Prawns Suya Skewers",
      nativeName: "Grilled Prawn Suya",
      category: "grill",
      price: 16.50,
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      description: "Charcoal-kissed tiger prawns dusted with roasted peanut kuli-kuli powder, lime juice, and sweet pepper reduction."
    },

    // Traditional Soups & Swallows
    {
      id: "soup-1",
      name: "Royal Egusi Pot with Pounded Yam",
      nativeName: "Ofe Egusi & Iyan",
      category: "soups",
      price: 17.50,
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      description: "Melon seeds cooked with dry fish, iru (locust beans), and bitterleaf, simmered with goat meat and served with hot pounded yam.",
      popular: true
    },
    {
      id: "soup-2",
      name: "Efo Riro Elemi Meje",
      nativeName: "Rich Spinach Pot",
      category: "soups",
      price: 17.00,
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      description: "Tender Yoruba-style greens stewed with crayfish, shaki, stockfish flakes, and smoked turkey. Choice of Eba or Amala."
    },
    {
      id: "soup-3",
      name: "Fisherman's River Sea Soup",
      nativeName: "Niger Delta Seafood Broth",
      category: "soups",
      price: 21.00,
      spiceLevel: 3,
      dietary: ["Halal", "Gluten-Free"],
      description: "Fresh crab legs, jumbo prawns, sea snail, and catfish simmered in an aromatic hot pepper broth infused with utazi leaves."
    },

    // Drinks & Refreshments
    {
      id: "drink-1",
      name: "Signature Nigerian Chapman",
      nativeName: "Lagos Club Mocktail",
      category: "drinks",
      price: 6.50,
      spiceLevel: 0,
      dietary: ["Vegetarian", "Vegan"],
      description: "Iconic sparkling blend of citrus, pomegranate bitters, cucumber slices, fresh mint, and orange wheels."
    },
    {
      id: "drink-2",
      name: "Chilled Organic Zobo Infusion",
      nativeName: "Hibiscus & Ginger Brew",
      category: "drinks",
      price: 5.50,
      spiceLevel: 1,
      dietary: ["Vegan", "Gluten-Free"],
      description: "Slow-brewed red sorrel leaves with pressed root ginger, pineapple crown, cloves, and sweet honey nectar."
    }
  ];

  // --- APPLICATION STATE ---
  let cart = [];
  let currentCategory = "all";
  let searchQuery = "";

  // --- DOM ELEMENT REFERENCES ---
  const header = document.getElementById("header");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  const announcementBar = document.getElementById("announcementBar");
  const closeAnnouncement = document.getElementById("closeAnnouncement");
  
  const menuGrid = document.getElementById("menuGrid");
  const menuSearchInput = document.getElementById("menuSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryTabs = document.getElementById("categoryTabs");
  const noMenuResults = document.getElementById("noMenuResults");
  const resetFilterBtn = document.getElementById("resetFilterBtn");

  const openCartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartCountBadge = document.getElementById("cartCountBadge");
  const cartCountText = document.getElementById("cartCountText");
  const cartItemsList = document.getElementById("cartItemsList");
  const emptyCartState = document.getElementById("emptyCartState");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTotal = document.getElementById("cartTotal");
  const cartExploreMenuBtn = document.getElementById("cartExploreMenuBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const whatsappCheckoutBtn = document.getElementById("whatsappCheckoutBtn");

  const reservationForm = document.getElementById("reservationForm");
  const bookingSuccessBox = document.getElementById("bookingSuccessBox");
  const bookingSuccessDetails = document.getElementById("bookingSuccessDetails");
  const newBookingBtn = document.getElementById("newBookingBtn");
  const resDateInput = document.getElementById("resDate");

  const dishModalBackdrop = document.getElementById("dishModalBackdrop");
  const closeDishModal = document.getElementById("closeDishModal");
  const modalDishBody = document.getElementById("modalDishBody");

  const backToTopBtn = document.getElementById("backToTopBtn");
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMsg = document.getElementById("newsletterMsg");
  const currentYearSpan = document.getElementById("currentYear");

  // --- INITIALIZATION ---
  function init() {
    initCopyright();
    initDateRestrictions();
    loadCartFromStorage();
    renderMenu();
    attachEventListeners();
    handleScroll();
  }

  // --- COPYRIGHT YEAR ---
  function initCopyright() {
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }

  // --- MINIMUM DATE FOR RESERVATIONS ---
  function initDateRestrictions() {
    if (!resDateInput) return;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    resDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // --- LOCAL STORAGE CART PERSISTENCE ---
  function loadCartFromStorage() {
    try {
      const stored = localStorage.getItem("naija_pot_cart");
      if (stored) {
        cart = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Storage access failed, using session state.", e);
      cart = [];
    }
    updateCartUI();
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem("naija_pot_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to persist cart.", e);
    }
    updateCartUI();
  }

  // --- MENU RENDERING ---
  function renderMenu() {
    if (!menuGrid) return;

    const filtered = DISHES.filter(dish => {
      const matchesCategory = (currentCategory === "all") || (dish.category === currentCategory);
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        dish.name.toLowerCase().includes(query) ||
        dish.nativeName.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.dietary.some(d => d.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = "";
      if (noMenuResults) noMenuResults.classList.remove("hidden");
      return;
    }

    if (noMenuResults) noMenuResults.classList.add("hidden");

    menuGrid.innerHTML = filtered.map(dish => {
      const spiceIcons = dish.spiceLevel > 0 ? "🌶️".repeat(dish.spiceLevel) : "";
      const pillsHtml = dish.dietary.map(d => {
        const isHalal = d.toLowerCase().includes("halal");
        return `<span class="pill ${isHalal ? 'pill-halal' : ''}">${d}</span>`;
      }).join("");

      return `
        <article class="menu-item-card" data-dish-id="${dish.id}">
          <div class="menu-item-top">
            <div class="item-name-wrap">
              <h3>${dish.name} ${spiceIcons ? `<span title="Spice rating">${spiceIcons}</span>` : ''}</h3>
              <span class="item-native-name">${dish.nativeName}</span>
            </div>
            <span class="item-price">${RESTAURANT_CONFIG.currencySymbol}${dish.price.toFixed(2)}</span>
          </div>
          <p class="item-desc">${dish.description}</p>
          <div class="item-pills">
            ${pillsHtml}
          </div>
          <div class="item-actions">
            <button class="btn btn-sm btn-primary add-to-cart-btn" data-id="${dish.id}">
              + Add to Basket
            </button>
            <button class="btn btn-sm btn-outline view-dish-btn" data-id="${dish.id}">
              Details
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  // --- CART MANAGEMENT ---
  function addToCart(dishId) {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish) return;

    const existingIndex = cart.findIndex(item => item.id === dishId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        nativeName: dish.nativeName,
        price: dish.price,
        quantity: 1
      });
    }

    saveCartToStorage();
    openCartDrawer();
  }

  function updateItemQuantity(dishId, delta) {
    const index = cart.findIndex(item => item.id === dishId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCartToStorage();
  }

  function removeItemFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    saveCartToStorage();
  }

  function clearCart() {
    cart = [];
    saveCartToStorage();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Badges
    if (cartCountBadge) cartCountBadge.textContent = totalItems;
    if (cartCountText) cartCountText.textContent = `(${totalItems} items)`;

    // Empty state vs Cart list
    if (cart.length === 0) {
      if (emptyCartState) emptyCartState.style.display = "block";
      if (cartItemsList) cartItemsList.innerHTML = "";
      if (whatsappCheckoutBtn) whatsappCheckoutBtn.disabled = true;
      if (clearCartBtn) clearCartBtn.disabled = true;
    } else {
      if (emptyCartState) emptyCartState.style.display = "none";
      if (whatsappCheckoutBtn) whatsappCheckoutBtn.disabled = false;
      if (clearCartBtn) clearCartBtn.disabled = false;

      if (cartItemsList) {
        cartItemsList.innerHTML = cart.map(item => `
          <li class="cart-item" data-id="${item.id}">
            <div class="cart-item-row">
              <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="item-native-name">${item.nativeName || ''}</span>
              </div>
              <span class="cart-item-price">${RESTAURANT_CONFIG.currencySymbol}${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="cart-item-ctrls">
              <div class="qty-stepper">
                <button class="qty-btn dec-btn" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn inc-btn" data-id="${item.id}" aria-label="Increase quantity">&plus;</button>
              </div>
              <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
          </li>
        `).join("");
      }
    }

    // Totals
    if (cartSubtotal) cartSubtotal.textContent = `${RESTAURANT_CONFIG.currencySymbol}${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `${RESTAURANT_CONFIG.currencySymbol}${subtotal.toFixed(2)}`;
  }

  function openCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add("active");
      cartBackdrop.classList.add("active");
      cartDrawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove("active");
      cartBackdrop.classList.remove("active");
      cartDrawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  // --- WHATSAPP ORDER CHECKOUT ---
  function checkoutViaWhatsApp() {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let msg = `*NEW TAKEAWAY ORDER - ${RESTAURANT_CONFIG.brandName}*\n\n`;
    msg += `Items Ordered:\n`;
    
    cart.forEach(item => {
      msg += `• ${item.quantity}x ${item.name} (£${(item.price * item.quantity).toFixed(2)})\n`;
    });

    msg += `\n*Total (inc. VAT):* £${subtotal.toFixed(2)}\n`;
    msg += `*Order Type:* Takeaway Collection\n`;
    msg += `*Time:* Within ~30 mins\n\n`;
    msg += `Please reply with collection confirmation. Thank you!`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, "_blank");
  }

  // --- DISH MODAL QUICK VIEW ---
  function showDishModal(dishId) {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish || !dishModalBackdrop || !modalDishBody) return;

    const spiceText = dish.spiceLevel === 0 ? "Mild (No Heat)" : 
                      dish.spiceLevel === 1 ? "Mild Warmth (🌶️)" :
                      dish.spiceLevel === 2 ? "Medium Spicy (🌶️🌶️)" : "Fiery Hot (🌶️🌶️🌶️)";

    modalDishBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span style="font-size: 0.75rem; color: var(--color-gold); font-weight: 700; text-transform: uppercase;">
          ${dish.category.toUpperCase()} &bull; NAIJA POT SPECIAL
        </span>
        <h2 id="modalDishTitle" style="font-size: 1.8rem; margin: 0.3rem 0; color: var(--color-ivory);">
          ${dish.name}
        </h2>
        <p style="font-size: 0.95rem; color: var(--color-gold-bright); font-weight: 500;">
          Traditional Name: ${dish.nativeName}
        </p>
      </div>

      <p style="color: var(--color-text-body); line-height: 1.6; margin-bottom: 1.5rem;">
        ${dish.description}
      </p>

      <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
        <p style="font-size: 0.85rem; margin-bottom: 0.4rem;"><strong>Spice Profile:</strong> ${spiceText}</p>
        <p style="font-size: 0.85rem; margin-bottom: 0.4rem;"><strong>Dietary Tags:</strong> ${dish.dietary.join(", ")}</p>
        <p style="font-size: 0.85rem;"><strong>Portion:</strong> Generous Lagos Kitchen Serving</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(212,165,58,0.2); padding-top: 1.25rem;">
        <span style="font-size: 1.6rem; font-family: var(--font-serif); font-weight: 700; color: var(--color-gold);">
          ${RESTAURANT_CONFIG.currencySymbol}${dish.price.toFixed(2)}
        </span>
        <button class="btn btn-primary add-to-cart-from-modal-btn" data-id="${dish.id}">
          Add to Basket
        </button>
      </div>
    `;

    dishModalBackdrop.classList.add("active");
    dishModalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function hideDishModal() {
    if (dishModalBackdrop) {
      dishModalBackdrop.classList.remove("active");
      dishModalBackdrop.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  // --- RESERVATION VALIDATION & SUBMISSION ---
  function handleReservationSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("resName");
    const phoneInput = document.getElementById("resPhone");
    const emailInput = document.getElementById("resEmail");
    const guestsInput = document.getElementById("resGuests");
    const dateInput = document.getElementById("resDate");
    const timeInput = document.getElementById("resTime");
    const notesInput = document.getElementById("resNotes");

    let isValid = true;

    // Reset error messages
    document.querySelectorAll(".form-error").forEach(el => el.textContent = "");
    document.querySelectorAll(".form-group input, .form-group select").forEach(el => el.classList.remove("is-invalid"));

    // Name validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      document.getElementById("resNameError").textContent = "Please enter your full name.";
      nameInput.classList.add("is-invalid");
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\d\s+\-()]{8,}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      document.getElementById("resPhoneError").textContent = "Please enter a valid phone number.";
      phoneInput.classList.add("is-invalid");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById("resEmailError").textContent = "Please enter a valid email address.";
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    // Date validation
    if (!dateInput.value) {
      document.getElementById("resDateError").textContent = "Please pick a date.";
      dateInput.classList.add("is-invalid");
      isValid = false;
    } else {
      const chosenDate = new Date(dateInput.value);
      const dayOfWeek = chosenDate.getUTCDay(); // 0 is Sunday, 1 is Monday

      if (RESTAURANT_CONFIG.closedDays.includes(dayOfWeek)) {
        document.getElementById("resDateError").textContent = "We are closed on Mondays for kitchen prep. Please choose Tuesday–Sunday.";
        dateInput.classList.add("is-invalid");
        isValid = false;
      }
    }

    if (!isValid) return;

    // Display confirmation
    if (reservationForm && bookingSuccessBox && bookingSuccessDetails) {
      bookingSuccessDetails.innerHTML = `
        <strong>Name:</strong> ${escapeHtml(nameInput.value)}<br>
        <strong>Party Size:</strong> ${escapeHtml(guestsInput.value)} Guest(s)<br>
        <strong>Date & Time:</strong> ${escapeHtml(dateInput.value)} at ${escapeHtml(timeInput.value)}<br>
        <strong>Contact:</strong> ${escapeHtml(phoneInput.value)} (${escapeHtml(emailInput.value)})
      `;
      reservationForm.style.display = "none";
      bookingSuccessBox.classList.remove("hidden");
    }
  }

  function resetBookingForm() {
    if (reservationForm && bookingSuccessBox) {
      reservationForm.reset();
      reservationForm.style.display = "flex";
      bookingSuccessBox.classList.add("hidden");
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[m];
    });
  }

  // --- SCROLL & NAVBAR HANDLER ---
  function handleScroll() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      if (scrollPos > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    }
  }

  // --- EVENT LISTENERS ---
  function attachEventListeners() {
    // Window Scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Announcement Close
    if (closeAnnouncement && announcementBar) {
      closeAnnouncement.addEventListener("click", () => {
        announcementBar.style.display = "none";
      });
    }

    // Mobile Menu Toggle
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("active");
        mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
      });

      // Close mobile menu when link is clicked
      document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
          mainNav.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Category Tabs
    if (categoryTabs) {
      categoryTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".category-tab");
        if (!btn) return;

        document.querySelectorAll(".category-tab").forEach(tab => {
          tab.classList.remove("active");
          tab.setAttribute("aria-selected", "false");
        });

        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        currentCategory = btn.getAttribute("data-category") || "all";
        renderMenu();
      });
    }

    // Menu Search Input
    if (menuSearchInput) {
      menuSearchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.style.display = searchQuery ? "block" : "none";
        }
        renderMenu();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        if (menuSearchInput) menuSearchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        renderMenu();
      });
    }

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener("click", () => {
        if (menuSearchInput) menuSearchInput.value = "";
        searchQuery = "";
        if (clearSearchBtn) clearSearchBtn.style.display = "none";
        currentCategory = "all";
        
        document.querySelectorAll(".category-tab").forEach(tab => {
          tab.classList.toggle("active", tab.getAttribute("data-category") === "all");
        });
        renderMenu();
      });
    }

    // Delegated Clicks on Menu Grid
    if (menuGrid) {
      menuGrid.addEventListener("click", (e) => {
        const addBtn = e.target.closest(".add-to-cart-btn");
        if (addBtn) {
          const id = addBtn.getAttribute("data-id");
          if (id) addToCart(id);
          return;
        }

        const viewBtn = e.target.closest(".view-dish-btn");
        if (viewBtn) {
          const id = viewBtn.getAttribute("data-id");
          if (id) showDishModal(id);
        }
      });
    }

    // Direct Add from Signature Cards
    document.querySelectorAll(".add-direct-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) addToCart(id);
      });
    });

    // Cart Drawer Open/Close
    if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);
    if (cartExploreMenuBtn) cartExploreMenuBtn.addEventListener("click", closeCart);

    // Cart Steppers & Removals (Delegated)
    if (cartItemsList) {
      cartItemsList.addEventListener("click", (e) => {
        const incBtn = e.target.closest(".inc-btn");
        if (incBtn) {
          updateItemQuantity(incBtn.getAttribute("data-id"), 1);
          return;
        }

        const decBtn = e.target.closest(".dec-btn");
        if (decBtn) {
          updateItemQuantity(decBtn.getAttribute("data-id"), -1);
          return;
        }

        const removeBtn = e.target.closest(".cart-item-remove");
        if (removeBtn) {
          removeItemFromCart(removeBtn.getAttribute("data-id"));
        }
      });
    }

    if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
    if (whatsappCheckoutBtn) whatsappCheckoutBtn.addEventListener("click", checkoutViaWhatsApp);

    // Modal Events
    if (closeDishModal) closeDishModal.addEventListener("click", hideDishModal);
    if (dishModalBackdrop) {
      dishModalBackdrop.addEventListener("click", (e) => {
        if (e.target === dishModalBackdrop) hideDishModal();
      });
    }

    if (modalDishBody) {
      modalDishBody.addEventListener("click", (e) => {
        const modalAddBtn = e.target.closest(".add-to-cart-from-modal-btn");
        if (modalAddBtn) {
          const id = modalAddBtn.getAttribute("data-id");
          if (id) {
            addToCart(id);
            hideDishModal();
          }
        }
      });
    }

    // Keyboard Accessibility (Escape key)
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideDishModal();
        closeCart();
      }
    });

    // Reservations Form
    if (reservationForm) {
      reservationForm.addEventListener("submit", handleReservationSubmit);
    }
    if (newBookingBtn) {
      newBookingBtn.addEventListener("click", resetBookingForm);
    }

    // Newsletter Form
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("newsletterEmail");
        if (newsletterMsg && email) {
          newsletterMsg.textContent = `✓ Welcome to the Feast Club, ${email.value}!`;
          newsletterForm.reset();
        }
      });
    }

    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // Run immediately
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
