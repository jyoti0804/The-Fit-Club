import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'
import { clearCart } from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [step, setStep] = useState(1)
  const [billing, setBilling] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  })
  const [billingErrors, setBillingErrors] = useState<{ [key: string]: string }>({})

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [paymentErrors, setPaymentErrors] = useState<{ [key: string]: string }>({})

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling({ ...billing, [e.target.name]: e.target.value })
    setBillingErrors({ ...billingErrors, [e.target.name]: '' })
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })
    setPaymentErrors({ ...paymentErrors, [e.target.name]: '' })
  }

  const validateBilling = () => {
    const errors: { [key: string]: string } = {}
    Object.entries(billing).forEach(([key, value]) => {
      if (!value.trim()) errors[key] = 'This field is required'
    })
    setBillingErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePayment = () => {
    const errors: { [key: string]: string } = {}
    Object.entries(payment).forEach(([key, value]) => {
      if (!value.trim()) errors[key] = 'This field is required'
    })
    setPaymentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateBilling()) setStep(2)
    else if (step === 2 && validatePayment()) setStep(3)
  }

  const handlePlaceOrder = () => {
    if (!validateBilling() || !validatePayment()) return
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderSuccess(true)
      dispatch(clearCart())
    }, 2000) // 2 seconds to simulate processing
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#181818] text-white px-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
          ✅ Order Confirmed!
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Thank you for your purchase, {billing.name}! <br />
          Your order has been successfully placed.
        </p>
        <button
  onClick={() => navigate('/products')}
  className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
>
  Continue Shopping
</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white py-10 px-6 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
        🧾 Checkout
      </h1>

      {/* Step Indicator */}
      <div className="flex gap-4 mb-8">
        {['Billing', 'Payment', 'Review'].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 rounded-full border ${
              step === index + 1
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent'
                : 'border-white/20 text-gray-400'
            } font-semibold`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="bg-[#202020] p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Billing & Shipping Info</h2>
          <form className="flex flex-col gap-4">
            {Object.entries(billing).map(([key, value]) => (
              <div key={key}>
                <input
                  type="text"
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={handleBillingChange}
                  className={`p-3 rounded-lg bg-[#2a2a2a] border ${
                    billingErrors[key] ? 'border-red-500' : 'border-white/10'
                  } text-white w-full`}
                />
                {billingErrors[key] && (
                  <p className="text-red-500 text-sm mt-1">{billingErrors[key]}</p>
                )}
              </div>
            ))}
          </form>
          <button
            onClick={handleNextStep}
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-bold hover:shadow-lg transition"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-[#202020] p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
          <form className="flex flex-col gap-4">
            {Object.entries(payment).map(([key, value]) => (
              <div key={key}>
                <input
                  type={key === 'cvc' ? 'password' : 'text'}
                  name={key}
                  placeholder={key.toUpperCase()}
                  value={value}
                  onChange={handlePaymentChange}
                  className={`p-3 rounded-lg bg-[#2a2a2a] border ${
                    paymentErrors[key] ? 'border-red-500' : 'border-white/10'
                  } text-white w-full`}
                />
                {paymentErrors[key] && (
                  <p className="text-red-500 text-sm mt-1">{paymentErrors[key]}</p>
                )}
              </div>
            ))}
          </form>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg transition font-bold"
            >
              Review Order
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-[#202020] p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Order Review</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 pt-4 border-t border-white/10 text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg transition font-bold ${
                isProcessing ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
