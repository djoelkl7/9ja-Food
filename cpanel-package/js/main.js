/**
 * NAIJA POT KITCHEN & GRILL LTD - SHARED HOSTING CLIENT SCRIPT
 * Multi-page architecture with persistent WhatsApp Ordering Cart,
 * Live Menu Filtering, Table Booking Engine & Form Validation.
 */

(function () {
  'use strict';

  // ==========================================================================
  // RESTAURANT CONFIGURATION & PLACEHOLDERS
  // (Update these placeholders when official contact & details are finalized)
  // ==========================================================================
  const RESTAURANT_CONFIG = {
    brandName: "NAIJA POT KITCHEN & GRILL LTD",
    // NOTE FOR CPANEL ADMIN: Replace this with your official WhatsApp number without '+' or spaces:
    whatsappNumber: "447342229865", // [Placeholder WhatsApp Number: +44 7342 229865]
    phoneFormatted: "+44 7444 614764", // [Placeholder Direct Line]
    addressFormatted: "14 Heritage Parade, High Street, London E1 6AN", // [Placeholder Address]
    currencySymbol: "£",
    vatRate: 0.20,
    closedDays: [1], // 1 = Monday closed for kitchen prep
  };

  // ==========================================================================
  // DISHES CATALOG WITH REALISTIC PHOTOGRAPHY & PLACEHOLDER PRICES
  // ==========================================================================
  const DISHES = [
    // Rice Dishes
    {
      id: "jollof-1",
      name: "Smoky Lagos Party Jollof",
      nativeName: "Party Jollof Rice",
      category: "rice",
      price: 15.50, // [Placeholder Price]
      spiceLevel: 2,
      dietary: ["Halal", "Chef Signature"],
      image: "images/food_jollof_party_platter_1792356258654.jpg",
      description: "Firewood-smoked parboiled long-grain rice infused with roasted plum tomatoes and scotch bonnets. Served with sweet fried plantain (dodo) & grilled chicken.",
      popular: true
    },
    {
      id: "rice-2",
      name: "Special Bukka Fried Rice",
      nativeName: "Naija Fried Rice",
      category: "rice",
      price: 16.00, // [Placeholder Price]
      spiceLevel: 1,
      dietary: ["Halal"],
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80",
      description: "Fragrant rice stir-fried in rich beef broth with sweet corn, spring onions, diced carrots, liver, and succulent jumbo prawns."
    },
    {
      id: "rice-3",
      name: "Ayamase Designer Rice Pot",
      nativeName: "Ofada & Ayamase",
      category: "rice",
      price: 18.00, // [Placeholder Price]
      spiceLevel: 3,
      dietary: ["Halal", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
      description: "Aromatic indigenous brown rice paired with bleached palm oil green scotch bonnet stew, assorted braised offals, and boiled egg."
    },

    // Suya & Charcoal Grill
    {
      id: "suya-1",
      name: "Charcoal Prime Beef Suya",
      nativeName: "Northern Yaji Suya",
      category: "grill",
      price: 12.00, // [Placeholder Price]
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      image: "images/food_beef_suya_grill_1792356257070.jpg",
      description: "Thinly carved British beef rubbed in roasted groundnut yaji spice, charred over hot coals with sliced red onions and ripe plum tomatoes.",
      popular: true
    },
    {
      id: "grill-2",
      name: "Whole Flame-Charred Croaker Fish",
      nativeName: "Barbecue Croaker",
      category: "grill",
      price: 24.50, // [Placeholder Price]
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
      description: "Fresh Atlantic croaker marinated in aromatic garlic, ginger and habanero paste, flame-grilled and served with seasoned fried yam cubes."
    },
    {
      id: "grill-3",
      name: "Grilled Jumbo Prawns Suya",
      nativeName: "King Prawn Suya",
      category: "grill",
      price: 16.50, // [Placeholder Price]
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=700&q=80",
      description: "Charcoal-kissed tiger prawns dusted with authentic northern peanut kuli-kuli powder, fresh lime juice, and sweet pepper reduction."
    },

    // Soups & Traditional Swallows
    {
      id: "soup-1",
      name: "Royal Egusi Pot with Pounded Yam",
      nativeName: "Ofe Egusi & Iyan",
      category: "soups",
      price: 17.50, // [Placeholder Price]
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      image: "images/food_egusi_soup_yam_1792356257944.jpg",
      description: "Melon seed broth thickened with bitterleaf and spinach, slow-simmered with slow-braised assorted beef, stockfish, and shaki. Served with hot pounded yam.",
      popular: true
    },
    {
      id: "soup-2",
      name: "Rich Efo Riro Elemi Meje",
      nativeName: "Lagos Bukka Spinach Pot",
      category: "soups",
      price: 17.00, // [Placeholder Price]
      spiceLevel: 2,
      dietary: ["Halal", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
      description: "Tender Yoruba-style leafy greens stewed with dry crayfish, smoked turkey, shaki, and locust beans. Choice of warm Eba, Amala, or Pounded Yam."
    },
    {
      id: "soup-3",
      name: "River Delta Fisherman's Soup",
      nativeName: "Niger Delta Seafood Broth",
      category: "soups",
      price: 21.00, // [Placeholder Price]
      spiceLevel: 3,
      dietary: ["Halal", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80",
      description: "Fresh crab claws, jumbo prawns, sea snail, and catfish simmered in an aromatic hot pepper broth infused with native utazi leaves."
    },

    // Small Chops & Starters
    {
      id: "chops-1",
      name: "Lagos Street Puff Puff & Samosas",
      nativeName: "Naija Small Chops Basket",
      category: "starters",
      price: 8.50, // [Placeholder Price]
      spiceLevel: 1,
      dietary: ["Halal", "Vegetarian"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
      description: "Golden fried sweet yeast puff puff balls, crispy vegetable samosas, and spicy peppered gizzard dips.",
      popular: true
    },
    {
      id: "chops-2",
      name: "Fiery Asun Goat Meat Bites",
      nativeName: "Peppered Asun",
      category: "starters",
      price: 11.00, // [Placeholder Price]
      spiceLevel: 3,
      dietary: ["Halal", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
      description: "Tender goat meat slow-roasted over woodfire, tossed with fiery scotch bonnet peppers and sliced red onions."
    },

    // Drinks & Refreshments
    {
      id: "drink-1",
      name: "Signature Nigerian Chapman",
      nativeName: "Lagos Club Mocktail",
      category: "drinks",
      price: 6.50, // [Placeholder Price]
      spiceLevel: 0,
      dietary: ["Vegetarian", "Vegan"],
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
      description: "Iconic sparkling blend of citrus, pomegranate bitters, cucumber ribbons, fresh mint, and orange slices."
    },
    {
      id: "drink-2",
      name: "Chilled Organic Zobo Infusion",
      nativeName: "Hibiscus & Ginger Brew",
      category: "drinks",
      price: 5.50, // [Placeholder Price]
      spiceLevel: 1,
      dietary: ["Vegan", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
      description: "Slow-brewed red sorrel leaves with pressed root ginger, pineapple crown, cloves, and sweet honey nectar."
    }
  ];

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  let cart = [];
  let currentCategory = "all";
  let searchQuery = "";

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    loadCart();
    setupHeaderAndNav();
    setupCartBadge();
    setupMenuPage();
    setupOrderPage();
    setupReservationPage();
    setupContactPage();
    setupModalsAndToasts();
    setupFooter();
  }

  // --- CART PERSISTENCE ---
  function loadCart() {
    try {
      const stored = localStorage.getItem("naijapot_cart_items");
      if (stored) {
        cart = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read local storage.", e);
      cart = [];
    }
    updateCartBadges();
  }

  function saveCart() {
    try {
      localStorage.setItem("naijapot_cart_items", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not write to local storage.", e);
    }
    updateCartBadges();
  }

  function addToCart(dishId, qty = 1) {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish) return;

    const existingIndex = cart.findIndex(item => item.id === dishId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        nativeName: dish.nativeName,
        price: dish.price,
        quantity: qty
      });
    }

    saveCart();
    showToast(`Added ${dish.name} to your WhatsApp order!`);

    // If currently on order.html, refresh table
    if (document.getElementById("orderTableBody")) {
      renderOrderTable();
    }
  }

  function updateQuantity(dishId, delta) {
    const index = cart.findIndex(item => item.id === dishId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();

    if (document.getElementById("orderTableBody")) {
      renderOrderTable();
    }
  }

  function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    saveCart();
    if (document.getElementById("orderTableBody")) {
      renderOrderTable();
    }
  }

  function clearCart() {
    cart = [];
    saveCart();
    if (document.getElementById("orderTableBody")) {
      renderOrderTable();
    }
  }

  function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-badge").forEach(badge => {
      badge.textContent = totalCount;
    });
  }

  // --- HEADER & NAVIGATION ---
  function setupHeaderAndNav() {
    const header = document.querySelector(".site-header");
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("mainNav");
    const announcementClose = document.getElementById("closeAnnouncement");
    const announcementBar = document.getElementById("announcementBar");

    window.addEventListener("scroll", () => {
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      const backToTop = document.getElementById("backToTopBtn");
      if (backToTop) {
        if (window.scrollY > 400) {
          backToTop.classList.remove("hidden");
        } else {
          backToTop.classList.add("hidden");
        }
      }
    }, { passive: true });

    if (mobileBtn && nav) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
      });
    }

    if (announcementClose && announcementBar) {
      announcementClose.addEventListener("click", () => {
        announcementBar.style.display = "none";
      });
    }

    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function setupCartBadge() {
    // If user clicks on cart badge button on any page, navigate to order.html
    const cartBtn = document.getElementById("openCartBtn");
    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        window.location.href = "order.html";
      });
    }
  }

  // --- MENU PAGE (menu.html) ---
  function setupMenuPage() {
    const menuGrid = document.getElementById("menuGrid");
    if (!menuGrid) return;

    const searchInput = document.getElementById("menuSearchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    const tabsContainer = document.getElementById("categoryTabs");
    const resetBtn = document.getElementById("resetFilterBtn");

    function renderMenuCards() {
      const filtered = DISHES.filter(dish => {
        const matchesCategory = (currentCategory === "all") || (dish.category === currentCategory);
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q ||
          dish.name.toLowerCase().includes(q) ||
          dish.nativeName.toLowerCase().includes(q) ||
          dish.description.toLowerCase().includes(q) ||
          dish.dietary.some(d => d.toLowerCase().includes(q));

        return matchesCategory && matchesQuery;
      });

      const noResults = document.getElementById("noMenuResults");
      if (filtered.length === 0) {
        menuGrid.innerHTML = "";
        if (noResults) noResults.classList.remove("hidden");
        return;
      }
      if (noResults) noResults.classList.add("hidden");

      menuGrid.innerHTML = filtered.map(dish => {
        const spiceIcons = dish.spiceLevel > 0 ? "🌶️".repeat(dish.spiceLevel) : "";
        const pills = dish.dietary.map(d => `<span class="pill ${d.includes('Halal') ? 'pill-halal' : ''}">${d}</span>`).join("");

        return `
          <article class="food-card" data-dish-id="${dish.id}">
            <div class="food-card-img-wrap">
              ${dish.popular ? '<span class="food-badge">Bestseller</span>' : ''}
              <img src="${dish.image}" alt="${dish.name} - Nigerian food London" loading="lazy">
            </div>
            <div class="food-card-body">
              <div class="food-card-header">
                <h3>${dish.name} ${spiceIcons}</h3>
                <span class="food-price">${RESTAURANT_CONFIG.currencySymbol}${dish.price.toFixed(2)} <span class="placeholder-tag">[Placeholder]</span></span>
              </div>
              <span class="food-native-name">${dish.nativeName}</span>
              <p class="food-desc">${dish.description}</p>
              <div class="food-card-footer">
                <div class="pills-row">${pills}</div>
                <button class="btn btn-sm btn-primary add-dish-btn" data-id="${dish.id}">
                  + Add
                </button>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }

    renderMenuCards();

    if (tabsContainer) {
      tabsContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".category-tab");
        if (!btn) return;
        document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category") || "all";
        renderMenuCards();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        if (clearBtn) clearBtn.style.display = searchQuery ? "block" : "none";
        renderMenuCards();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        searchQuery = "";
        clearBtn.style.display = "none";
        renderMenuCards();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        searchQuery = "";
        currentCategory = "all";
        document.querySelectorAll(".category-tab").forEach(t => {
          t.classList.toggle("active", t.getAttribute("data-category") === "all");
        });
        renderMenuCards();
      });
    }

    menuGrid.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".add-dish-btn");
      if (addBtn) {
        addToCart(addBtn.getAttribute("data-id"));
      }
    });
  }

  // --- ORDER PAGE (order.html) ---
  function setupOrderPage() {
    const tableBody = document.getElementById("orderTableBody");
    if (!tableBody) return;

    renderOrderTable();

    // Event delegation on table body
    tableBody.addEventListener("click", (e) => {
      const inc = e.target.closest(".inc-btn");
      if (inc) {
        updateQuantity(inc.getAttribute("data-id"), 1);
        return;
      }
      const dec = e.target.closest(".dec-btn");
      if (dec) {
        updateQuantity(dec.getAttribute("data-id"), -1);
        return;
      }
      const rem = e.target.closest(".remove-btn");
      if (rem) {
        removeFromCart(rem.getAttribute("data-id"));
      }
    });

    const clearBtn = document.getElementById("clearOrderBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", clearCart);
    }

    const checkoutForm = document.getElementById("orderCheckoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", handleWhatsAppCheckout);
    }
  }

  function renderOrderTable() {
    const tableBody = document.getElementById("orderTableBody");
    const emptyState = document.getElementById("emptyOrderState");
    const summaryCard = document.getElementById("orderSummaryCard");
    const checkoutBtn = document.getElementById("submitWhatsAppOrderBtn");

    if (!tableBody) return;

    if (cart.length === 0) {
      tableBody.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      if (summaryCard) summaryCard.style.display = "none";
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (summaryCard) summaryCard.style.display = "block";
    if (checkoutBtn) checkoutBtn.disabled = false;

    tableBody.innerHTML = cart.map(item => `
      <tr>
        <td>
          <strong>${item.name}</strong><br>
          <small class="text-gold">${item.nativeName || ''}</small>
        </td>
        <td>
          ${RESTAURANT_CONFIG.currencySymbol}${item.price.toFixed(2)}
        </td>
        <td>
          <div class="qty-stepper">
            <button class="qty-btn dec-btn" data-id="${item.id}" aria-label="Decrease">&minus;</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn inc-btn" data-id="${item.id}" aria-label="Increase">&plus;</button>
          </div>
        </td>
        <td>
          <strong>${RESTAURANT_CONFIG.currencySymbol}${(item.price * item.quantity).toFixed(2)}</strong>
        </td>
        <td>
          <button class="remove-btn" data-id="${item.id}" style="background:none;border:none;color:var(--color-danger);cursor:pointer;font-size:0.8rem;">
            &times;
          </button>
        </td>
      </tr>
    `).join("");

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById("orderSubtotal");
    const totalEl = document.getElementById("orderTotal");
    if (subtotalEl) subtotalEl.textContent = `${RESTAURANT_CONFIG.currencySymbol}${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `${RESTAURANT_CONFIG.currencySymbol}${subtotal.toFixed(2)}`;
  }

  function handleWhatsAppCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please add items to your basket before checking out.");
      return;
    }

    const nameInput = document.getElementById("custName");
    const phoneInput = document.getElementById("custPhone");
    const timeInput = document.getElementById("custTime");
    const notesInput = document.getElementById("custNotes");

    const name = nameInput ? nameInput.value.trim() : "Valued Customer";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const time = timeInput ? timeInput.value : "ASAP (~30 mins)";
    const notes = notesInput ? notesInput.value.trim() : "None";

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let message = `*NEW TAKEAWAY ORDER - ${RESTAURANT_CONFIG.brandName}*\n`;
    message += `----------------------------------------\n`;
    message += `*Customer:* ${name}\n`;
    if (phone) message += `*Contact Phone:* ${phone}\n`;
    message += `*Collection Time:* ${time}\n`;
    if (notes && notes !== "None") message += `*Dietary/Special Notes:* ${notes}\n`;
    message += `----------------------------------------\n`;
    message += `*ITEMS ORDERED:*\n`;

    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name} (${RESTAURANT_CONFIG.currencySymbol}${(item.price * item.quantity).toFixed(2)})\n`;
    });

    message += `----------------------------------------\n`;
    message += `*TOTAL (inc. VAT):* ${RESTAURANT_CONFIG.currencySymbol}${subtotal.toFixed(2)} [Placeholder Price]\n`;
    message += `*Pickup Location:* ${RESTAURANT_CONFIG.addressFormatted}\n\n`;
    message += `Please confirm preparation and pickup availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  }

  // --- RESERVATIONS PAGE (reservations.html) ---
  function setupReservationPage() {
    const form = document.getElementById("reservationForm");
    const dateInput = document.getElementById("resDate");

    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("resName");
        const phone = document.getElementById("resPhone");
        const email = document.getElementById("resEmail");
        const guests = document.getElementById("resGuests");
        const date = document.getElementById("resDate");
        const time = document.getElementById("resTime");
        const notes = document.getElementById("resNotes");

        let valid = true;
        document.querySelectorAll(".form-error").forEach(el => el.textContent = "");

        if (!name.value.trim()) {
          document.getElementById("resNameError").textContent = "Please enter your full name.";
          valid = false;
        }

        const phoneRegex = /^[\d\s+\-()]{8,}$/;
        if (!phoneRegex.test(phone.value.trim())) {
          document.getElementById("resPhoneError").textContent = "Please provide a valid contact number.";
          valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          document.getElementById("resEmailError").textContent = "Please enter a valid email address.";
          valid = false;
        }

        if (!date.value) {
          document.getElementById("resDateError").textContent = "Please select a booking date.";
          valid = false;
        } else {
          const selected = new Date(date.value);
          if (RESTAURANT_CONFIG.closedDays.includes(selected.getUTCDay())) {
            document.getElementById("resDateError").textContent = "We are closed on Mondays for kitchen prep. Please choose Tuesday through Sunday.";
            valid = false;
          }
        }

        if (!valid) return;

        // Show confirmation box
        const successBox = document.getElementById("bookingSuccessBox");
        const detailsEl = document.getElementById("bookingSuccessDetails");
        const waLink = document.getElementById("waBookingConfirmLink");

        if (detailsEl) {
          detailsEl.innerHTML = `
            <strong>Guest Name:</strong> ${escapeHtml(name.value)}<br>
            <strong>Party Size:</strong> ${escapeHtml(guests.value)} Guest(s)<br>
            <strong>Date & Time:</strong> ${escapeHtml(date.value)} at ${escapeHtml(time.value)}<br>
            <strong>Contact:</strong> ${escapeHtml(phone.value)} &bull; ${escapeHtml(email.value)}
          `;
        }

        if (waLink) {
          const waMsg = encodeURIComponent(
            `*TABLE RESERVATION ENQUIRY - ${RESTAURANT_CONFIG.brandName}*\n\n` +
            `• Name: ${name.value}\n` +
            `• Guests: ${guests.value}\n` +
            `• Date/Time: ${date.value} at ${time.value}\n` +
            `• Phone: ${phone.value}\n` +
            `• Notes: ${notes.value || 'None'}\n\n` +
            `Please confirm table availability. Thank you!`
          );
          waLink.href = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${waMsg}`;
        }

        form.style.display = "none";
        if (successBox) successBox.classList.remove("hidden");
      });
    }

    const resetBookingBtn = document.getElementById("newBookingBtn");
    if (resetBookingBtn) {
      resetBookingBtn.addEventListener("click", () => {
        const form = document.getElementById("reservationForm");
        const successBox = document.getElementById("bookingSuccessBox");
        if (form) {
          form.reset();
          form.style.display = "flex";
        }
        if (successBox) successBox.classList.add("hidden");
      });
    }
  }

  // --- CONTACT PAGE (contact.html) ---
  function setupContactPage() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const success = document.getElementById("contactSuccessBox");
        contactForm.style.display = "none";
        if (success) success.classList.remove("hidden");
      });
    }
  }

  // --- TOASTS & MODALS ---
  function setupModalsAndToasts() {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.className = "toast-notice";
      document.body.appendChild(toast);
    }
  }

  function showToast(message) {
    const toast = document.getElementById("appToast");
    if (!toast) return;
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  function setupFooter() {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  // Run on DOM load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
