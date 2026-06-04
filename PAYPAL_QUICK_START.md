# PayPal Integration - Quick Reference

## 🎯 Where to Find PayPal Buttons

### Location Path:
```
Home Page → Pricing Section → Click any CTA Button → PayPal Buttons in Modal
```

### Visual Steps:

1. **Pricing Section** 
   - Find three pricing cards: Starter, Professional, Enterprise
   - Interactive slider to select plans

2. **Click CTA Button**
   - "Activate Trial" (Starter)
   - "Secure License" (Professional)  
   - "Contact Operations" (Enterprise)

3. **Modal Opens**
   - Shows "LUMINA_LICENSING_SANDBOX"
   - Displays ~1.8 second loading animation
   - JSON configuration appears

4. **PayPal Buttons Render**
   ```
   ┌─────────────────────────────────┐
   │  💛 PayPal                      │
   ├─────────────────────────────────┤
   │  💳 Debit or Credit Card        │
   ├─────────────────────────────────┤
   │     Powered by PayPal           │
   └─────────────────────────────────┘
   ```

## 🚀 Quick Start Commands

### Start Everything:
```bash
npm run dev:full
```

### Then Open:
```
http://localhost:3000
```

### Navigate to Pricing:
- Click "PRICING" in navbar OR
- Scroll down to Pricing section

## 🧪 Test Payment Flow

### Step 1: Click CTA Button
- Any of the three plan buttons
- Modal appears with loading animation

### Step 2: PayPal Buttons Appear
- Wait for SDK to load (~1.8 seconds)
- Two payment options displayed

### Step 3: Choose Payment Method
- Click **PayPal** (yellow button) → Login to PayPal Sandbox
- Click **Card** (gray button) → Enter test card details

### Step 4: Complete Payment
- Approve payment on PayPal site
- Redirected back with Order ID
- Success message displays

## 💳 Test Payment Methods

### PayPal Sandbox Account
```
Email: sb-x4w5xx11111111@business.example.com
Password: Y)1}t34#9u
```

### Test Credit Card (Card Option)
```
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

## 🔍 Backend API Endpoints

### Create Order
```
POST http://localhost:5000/api/paypal/create-order
Body: { planName, amount, description }
Response: { id, status }
```

### Capture Order
```
POST http://localhost:5000/api/paypal/capture-order
Body: { orderID }
Response: { id, status, payer, purchase_units }
```

## 🛠️ Debug Checklist

- [ ] Both servers running (`npm run dev:full`)
- [ ] Frontend: http://localhost:3000 loads
- [ ] Backend: http://localhost:5000/health returns OK
- [ ] Pricing section scrolls into view
- [ ] CTA button clicks open modal
- [ ] Modal shows loading animation
- [ ] PayPal buttons appear after loading
- [ ] PayPal button is clickable

## 📊 Architecture

```
Browser (Frontend)
    ↓ (Click CTA)
React Pricing Component
    ↓ (Load SDK)
PayPal SDK (CDN)
    ↓ (Create Order)
Express Backend :5000
    ↓ (PayPal API)
PayPal Sandbox
    ↓ (Order Created)
Backend → Frontend
    ↓ (Render Buttons)
PayPal Buttons Widget
    ↓ (User approves)
Capture Order
    ↓ (Success)
Confirmation Modal
```

## 🎨 Styling Notes

- PayPal buttons styled with default PayPal styling
- Modal is dark-themed to match site design
- Buttons are responsive (mobile-friendly)
- Loading animation uses Framer Motion

## 📦 Dependencies Used

- **@paypal/checkout-server-sdk** - Backend order management
- **paypal/checkout-js** - Frontend SDK (loaded from CDN)
- **react** - Frontend framework
- **express** - Backend framework
- **vite** - Dev server with proxy

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Buttons not showing | Ensure both `npm run dev` and `npm run server` running |
| SDK fails to load | Check internet, verify Client ID in code |
| Order creation fails | Check backend server logs |
| Payment not captured | Verify backend /api/paypal/capture-order endpoint |
| Modal stuck loading | Restart both frontend and backend servers |

## ✅ Verification

**Last Verified:** 2026-06-04  
**Status:** ✅ WORKING  
**Both Servers:** ✅ RUNNING  
**PayPal SDK:** ✅ LOADING  
**Buttons:** ✅ RENDERING  
**Flow:** ✅ COMPLETE  

---

## 📝 File References

- Component: `src/components/Pricing.tsx`
- Config: `src/utils/paypalConfig.ts`
- Backend: `src/routes/paypalRoutes.ts`
- Server: `server.ts`
- Proxy: `vite.config.ts`
