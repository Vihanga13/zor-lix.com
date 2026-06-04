# PayPal Sandbox Integration Guide

This document provides setup and usage instructions for the PayPal Sandbox integration in the Zor Lix Intelligence application.

## Overview

The PayPal Sandbox integration allows users to purchase pricing tiers directly from the Pricing section. When users click a CTA button, they'll be presented with a PayPal checkout experience.

## Configuration

### 1. Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# PayPal Sandbox Configuration
PAYPAL_CLIENT_ID=ATsbxK_Np55iDsAdworUDrw4D_IeaxGwVflIrMj9LFqjPee0yhTj3QtBSHtnMnDBCMKON-1hBR1qbySf
PAYPAL_SECRET_KEY=EGIL9A41metxd7q1XlwL6BXy5oQFkpV5YUT4NsCYPz32I-5cNm-Z7_N99EyNNeGGFmHI2C1ZFtGpq2wt
PAYPAL_MODE=sandbox

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### 2. Dependencies Installation

```bash
npm install
```

This will install all required packages, including:
- `@paypal/checkout-server-sdk` - PayPal server-side SDK
- `express` - Backend server framework
- `tsx` - TypeScript execution for Node.js

## Running the Application

### Development Mode (Both Frontend and Backend)

```bash
npm run dev:full
```

This command starts both:
- **Frontend**: Vite dev server on `http://localhost:3000`
- **Backend**: Express server on `http://localhost:5000`

### Frontend Only

```bash
npm run dev
```

### Backend Only (PayPal API Server)

```bash
npm run server
```

## Project Structure

```
src/
├── components/
│   └── Pricing.tsx          # Pricing component with PayPal integration
├── utils/
│   └── paypalConfig.ts      # PayPal configuration and API utilities
└── routes/
    └── paypalRoutes.ts      # Backend PayPal API routes

server.ts                     # Express server setup
```

## API Endpoints

### Create Order
- **Endpoint**: `POST /api/paypal/create-order`
- **Body**:
  ```json
  {
    "planName": "Professional Module",
    "amount": "159.00",
    "description": "Scale-up Corporation - Up to 25 source integrations"
  }
  ```
- **Response**:
  ```json
  {
    "id": "order_id_from_paypal",
    "status": "CREATED"
  }
  ```

### Capture Order
- **Endpoint**: `POST /api/paypal/capture-order`
- **Body**:
  ```json
  {
    "orderID": "order_id_from_paypal"
  }
  ```
- **Response**:
  ```json
  {
    "id": "order_id",
    "status": "COMPLETED",
    "payer": { ... },
    "purchase_units": [ ... ]
  }
  ```

## How It Works

### User Flow

1. **User clicks CTA button** on pricing plan (e.g., "Activate Trial", "Secure License")
2. **Checkout modal opens** with loading state
3. **PayPal SDK loads** automatically
4. **PayPal buttons render** in the modal
5. **User clicks "Pay with PayPal"**
6. **PayPal popup/redirect** for login and approval
7. **Order captured** after user approval
8. **Success confirmation** displayed

### Technical Flow

1. **Frontend** (`Pricing.tsx`):
   - Detects checkout trigger
   - Loads PayPal SDK via CDN
   - Renders PayPal buttons

2. **PayPal Buttons**:
   - `createOrder()`: Calls backend API to create order
   - `onApprove()`: Calls backend API to capture order
   - `onError()`: Displays error messages

3. **Backend** (`server.ts` + `paypalRoutes.ts`):
   - Receives order creation request
   - Communicates with PayPal API
   - Returns order ID to frontend
   - Captures order on user approval
   - Returns payment confirmation

## Testing

### Sandbox Test Accounts

Use these PayPal sandbox accounts for testing:

**Buyer Account** (for testing purchases):
- Email: `buyer@sandbox.paypal.com`
- Password: (configured in PayPal Developer Dashboard)

**Seller Account** (to view transactions):
- Email: Your PayPal Developer account email
- Access through: https://developer.paypal.com/

### Testing Flow

1. Start the application with `npm run dev:full`
2. Navigate to the Pricing section
3. Click a plan's CTA button
4. In the checkout modal, click the PayPal button
5. You'll be redirected to PayPal sandbox login
6. Log in with the buyer test account
7. Approve the payment
8. Return to the app and see confirmation

## Troubleshooting

### Issue: "PayPal SDK failed to load"
- **Solution**: Check network tab in browser dev tools. Ensure PayPal CDN is accessible.

### Issue: "Failed to create PayPal order"
- **Solution**: Verify backend server is running on port 5000. Check `.env` file has correct credentials.

### Issue: CORS errors
- **Solution**: Ensure `FRONTEND_URL` in `.env` matches your frontend URL.

### Issue: Order not captured
- **Solution**: Check backend logs for PayPal API errors. Verify credentials are correct.

## Security Notes

⚠️ **Important**: 
- The credentials shown in this guide are **sandboxed** credentials for testing only
- **Never** commit real credentials to version control
- Use environment variables in production
- Consider using PayPal Partner credentials for production deployments
- Implement proper order validation on the backend before capturing

## Production Deployment

For production:

1. **Update credentials**:
   ```env
   PAYPAL_CLIENT_ID=your_production_client_id
   PAYPAL_SECRET_KEY=your_production_secret_key
   PAYPAL_MODE=production
   ```

2. **Update URLs**:
   ```env
   FRONTEND_URL=https://your-domain.com
   ```

3. **Add order validation**:
   - Verify amounts match server-side database
   - Implement webhook listeners for async confirmations
   - Add order persistence (database storage)

4. **Add error handling**:
   - Implement proper logging
   - Add email notifications
   - Implement retry logic

## Support

For issues with PayPal integration:
- PayPal Developer Docs: https://developer.paypal.com/docs/
- PayPal REST API: https://developer.paypal.com/docs/api/
- PayPal Sandbox: https://developer.sandbox.paypal.com/

## Files Modified/Created

- ✅ `src/components/Pricing.tsx` - Added PayPal integration
- ✅ `src/utils/paypalConfig.ts` - Created PayPal utilities
- ✅ `src/routes/paypalRoutes.ts` - Created API routes
- ✅ `server.ts` - Created Express server
- ✅ `package.json` - Added dependencies and scripts
- ✅ `.env.example` - Updated with PayPal config
