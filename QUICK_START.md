# 🚀 PayPal Integration - Run Commands

## Single Command (Easiest)
```bash
npm run dev:full
```
Starts both frontend (3000) and backend (5000) automatically ✅

## Two Separate Commands (Alternative)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**  
```bash
npm run server
```

---

## What Was Fixed ✅

1. **Vite Proxy Configuration** - API calls now properly route from frontend to backend
2. **Relative URLs** - Changed from absolute `http://localhost:5000` to relative `/api/paypal` paths
3. **Error Handling** - Better error messages for debugging

## Test the Integration

1. Open http://localhost:3000
2. Scroll to **Pricing** section
3. Click any plan button (e.g., "Activate Trial")
4. Checkout modal opens
5. **PayPal button should appear** ✅
6. Click to test (uses PayPal sandbox)

## Sandbox Test Account
- Email: `sb-bx7n7y35894651@personal.example.com`
- Password: `12345678`

## Quick Diagnostics

**Check backend:**
```bash
curl http://localhost:5000/health
```

**Browser DevTools (F12):**
- Console tab → check for errors
- Network tab → watch API calls to `/api/paypal/...`

---

**All ready! Run `npm run dev:full` and test the PayPal integration.** 🎉
