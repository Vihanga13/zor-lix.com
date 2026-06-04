# PayPal Integration - Quick Start & Troubleshooting

## ✅ Fixed Issues

1. **Proxy Configuration**: Added Vite proxy to route `/api/paypal/*` requests to backend
2. **API URLs**: Changed from absolute to relative URLs
3. **Error Handling**: Improved error messages for debugging

## 🚀 How to Run (Correctly)

### Option 1: Full Development (Recommended)
```bash
npm run dev:full
```
This starts BOTH:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Option 2: Manual - Run in Two Terminals

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
npm run server
```

## 🧪 Testing Checklist

1. ✅ Open http://localhost:3000 in browser
2. ✅ Scroll to Pricing section
3. ✅ Click any plan's CTA button (e.g., "Activate Trial")
4. ✅ Checkout modal should open
5. ✅ PayPal button should render (blue button)
6. ✅ Click PayPal button
7. ✅ You'll be redirected to PayPal login
8. ✅ Use sandbox test account:
   - Email: `sb-bx6o7y35894651@personal.example.com`
   - Password: `12345678`

## 🔍 Debugging

### Check 1: Is Backend Running?
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"OK","message":"PayPal API Server is running"}`

### Check 2: Browser Console Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Check for errors when clicking CTA button
4. Look for red error messages

### Check 3: Network Tab
1. In DevTools, go to Network tab
2. Click a CTA button
3. Look for requests to:
   - `/api/paypal/create-order` (should succeed)
   - PayPal SDK loading

### Check 4: Common Issues

**Error: "Failed to load PayPal SDK"**
- Check internet connection
- PayPal CDN might be blocked
- Try refreshing page

**Error: "Failed to create order"**
- Backend not running on port 5000
- Run `npm run server` in another terminal
- Check backend is listening: `curl http://localhost:5000/health`

**CORS Errors**
- Make sure you're using the proxy (frontend on 3000, not direct 5000)
- Backend CORS header should allow localhost:3000

## 📋 Project Files

- `vite.config.ts` - Added proxy configuration
- `src/utils/paypalConfig.ts` - Updated to use relative URLs
- `src/components/Pricing.tsx` - PayPal button integration
- `src/routes/paypalRoutes.ts` - Backend API endpoints
- `server.ts` - Express backend server

## 🎯 Integration Flow

```
User clicks CTA Button
    ↓
Checkout modal opens
    ↓
PayPal SDK loads from CDN
    ↓
PayPal buttons render
    ↓
User clicks "Pay with PayPal"
    ↓
createOrder() called
    ↓
Frontend sends: POST /api/paypal/create-order
    ↓
Vite proxy forwards to: http://localhost:5000/api/paypal/create-order
    ↓
Backend creates PayPal order
    ↓
Returns order ID
    ↓
PayPal popup shows
    ↓
User approves payment
    ↓
captureOrder() called
    ↓
Frontend sends: POST /api/paypal/capture-order
    ↓
Backend captures payment
    ↓
Success message shown
```

## ⚡ Key Port Information

- **Frontend**: 3000
- **Backend (PayPal API)**: 5000
- **PayPal SDK**: CDN (https://www.paypal.com/sdk/js)

## 📝 Environment Variables

The `.env.example` file contains all needed PayPal credentials. They're already filled in for sandbox testing.

## 🔐 Security Note

These are SANDBOX credentials for testing only. For production, you need:
1. Real PayPal Business Account
2. Production Client ID & Secret
3. Production webhook setup
4. Order validation & persistence

---

**Need help?** Check the browser console (F12) and backend logs for error messages. The error messages should tell you exactly what's wrong!
