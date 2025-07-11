"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MessageCircle,
  Phone,
  Zap,
  Moon,
  Star,
  Heart,
  Menu,
  X,
} from "lucide-react"


export default function VDotHealingWebsite() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const services = [
    { name: "Migraine Relief", price: "₹3000-₹8000", duration: "7-30 days" },
    { name: "Stress Management", price: "₹3500-₹8500", duration: "7-30 days" },
    { name: "Anxiety Relief", price: "₹3500-₹8500", duration: "7-30 days" },
    { name: "Insomnia Treatment", price: "₹4000-₹9000", duration: "7-30 days" },
    { name: "Pain Management", price: "₹4500-₹9500", duration: "7-30 days" },
    { name: "Weight Loss", price: "₹5000-₹10000", duration: "15-30 days" },
  ]

  const sessionPackages = [
    { duration: "7 Days", price: "₹5,999", sessions: "7 Sessions", popular: false },
    { duration: "15 Days", price: "₹9,999", sessions: "15 Sessions", popular: true },
    { duration: "30 Days", price: "₹15,999", sessions: "30 Sessions", popular: false },
  ]

  const handleBooking = () => {
    const message = `Hello! I would like to book a  session\n please send me details\n\nName: ${bookingForm.name}\nPhone: ${bookingForm.phone}\nEmail: ${bookingForm.email}\nPreferred Date: ${bookingForm.preferredDate}\nPreferred Time: ${bookingForm.preferredTime}\nMessage: ${bookingForm.message}`
    window.open(`https://wa.me/919137762871?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleDemoBooking = () => {
    const message = `Hello! I would like to book a Demo Session (₹399).\n\nName: ${bookingForm.name}\nPhone: ${bookingForm.phone}\nEmail: ${bookingForm.email}\nPreferred Date: ${bookingForm.preferredDate}\nPreferred Time: ${bookingForm.preferredTime}`
    window.open(`https://wa.me/919137762871?text=${encodeURIComponent(message)}`, "_blank")
  }


const [submittedFeedbacks, setSubmittedFeedbacks] = useState<
  { rating: number; message: string }[]
>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0B3FF] via-white to-[#A5D6A7]">
      {/* Header */}
      <header className="bg-[#4B0082] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Mind Spirit Body Logo" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl font-bold text-white">Mind Spirit Body</h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-[#C6FF00] transition-colors">Home</a>
              <a href="#services" className="hover:text-[#C6FF00] transition-colors">Benefits</a>
              <a href="#pricing" className="hover:text-[#C6FF00] transition-colors">Pricing</a>
              <a href="#booking" className="hover:text-[#C6FF00] transition-colors">Book Now</a>
              <a href="#faq" className="hover:text-[#C6FF00] transition-colors">FAQ</a>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav Links */}
          {menuOpen && (
            <div className="md:hidden mt-4 flex flex-col space-y-2">
              <a href="#home" className="block px-2 py-1 hover:text-[#C6FF00]" onClick={() => setMenuOpen(false)}>
                Home
              </a>
              <a href="#services" className="block px-2 py-1 hover:text-[#C6FF00]" onClick={() => setMenuOpen(false)}>
                Services
              </a>
              <a href="#pricing" className="block px-2 py-1 hover:text-[#C6FF00]" onClick={() => setMenuOpen(false)}>
                Pricing
              </a>
              <a href="#booking" className="block px-2 py-1 hover:text-[#C6FF00]" onClick={() => setMenuOpen(false)}>
                Book Now
              </a>
              <a href="#faq" className="block px-2 py-1 hover:text-[#C6FF00]" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
  <div className="container mx-auto text-center">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-pink-600 to-rose-600 bg-clip-text text-transparent">
        Heal Your Mind, Transform Your Life
      </h2>
      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
        Discover the healing power of Meditation with sessions tailored just for you. Whether it’s migraine relief or stress reduction, begin your journey to a healthier, calmer you.
      </p>

      {/* Coupon Logic */}
      {(() => {
        const [showCoupon, setShowCoupon] = useState(false);
        const [coupon, setCoupon] = useState("");
        const [finalPrice, setFinalPrice] = useState("₹999");

        const handleCouponApply = () => {
          if (coupon.toLowerCase() === "mindbody") {
            setFinalPrice("₹699");
          } else {
            setFinalPrice("₹999");
          }
        };

        const handleSendToWhatsApp = () => {
          const message = `Hello! I want to book a 1-Day Healing Session.\nCoupon Code: ${coupon || "N/A"}\nFinal Price: ${finalPrice}`;
          const whatsappUrl = `https://wa.me/919137762871?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, "_blank");
        };

        return (
          <>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3"
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Your Healing Journey
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3"
                onClick={() => setShowCoupon(true)}
              >
                Book 1 Day Session - {finalPrice}
              </Button>
            </div>

            {showCoupon && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <Button
                  onClick={handleCouponApply}
                  className="bg-pink-500 text-white hover:bg-pink-600 mr-2"
                >
                  Apply Coupon
                </Button>
                <Button
                  onClick={handleSendToWhatsApp}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Send to WhatsApp
                </Button>
              </div>
            )}
          </>
        );
      })()}
    </div>
  </div>
</section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Mind Spirit Body ?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-pink-700">Natural Healing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Harness your mind's natural ability to heal without medications or invasive procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-pink-700">Deep Relaxation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Experience profound relaxation that reduces stress and promotes overall well-being.
                </p>
              </CardContent>
            </Card>

            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-pink-700">Lasting Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Create positive changes that last, with techniques you can use throughout your life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

     {/* Benefits Section */}
<section id="benefits" className="py-16 px-4 bg-white/50">
  <div className="container mx-auto">
    <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Benefits of Our Therapy</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          title: "Stress Reduction",
          description:
            "Experience deep relaxation and relief from daily stress through guided hypnotherapy sessions.",
        },
        {
          title: "Improved Sleep",
          description:
            "Our techniques help regulate your sleep cycle and overcome insomnia naturally.",
        },
        {
          title: "Anxiety Management",
          description:
            "Learn to manage anxiety, calm your thoughts, and gain emotional control.",
        },
        {
          title: "Pain Relief",
          description:
            "Alleviate chronic pain conditions by targeting the mind-body connection through hypnosis.",
        },
        {
          title: "Weight Loss Support",
          description:
            "Boost your motivation and mindset to support healthy eating and consistent exercise.",
        },
        {
          title: "Emotional Healing",
          description:
            "Release past traumas and negative emotions to achieve emotional clarity and peace.",
        },
      ].map((benefit, index) => (
        <Card
          key={index}
          className="border border-pink-200 hover:shadow-md transition-shadow bg-white"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-pink-700">{benefit.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">{benefit.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

 {/* Pricing Section */}
<section id="pricing" className="py-16 px-4 bg-white/50">
  <div className="container mx-auto">
    <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Session Packages</h3>
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {sessionPackages.map((pkg, index) => {
        const [showCoupon, setShowCoupon] = useState(false);
        const [coupon, setCoupon] = useState("");
        const [price, setPrice] = useState(pkg.price);

        const applyCoupon = () => {
          const original = parseInt(pkg.price.replace(/₹|,/g, ""));
          if (coupon.trim().toLowerCase() === "mindbody") {
            const discounted = Math.floor(original / 2);
            setPrice(`₹${discounted.toLocaleString()}`);
          } else {
            setPrice(pkg.price);
          }
        };

        const sendToWhatsApp = () => {
          const message = `Hello! I would like to book the ${pkg.duration} package.\nCoupon Code: mindbody\nFinal Price: ${price}.`;
          window.open(`https://wa.me/919137762871?text=${encodeURIComponent(message)}`, "_blank");
        };

        return (
          <Card
            key={index}
            className={`relative border-2 hover:shadow-lg transition-shadow ${
              pkg.popular ? "border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50" : "border-pink-200"
            }`}
          >
            {pkg.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-pink-700">{pkg.duration}</CardTitle>
              <CardDescription className="text-3xl font-bold text-gray-800 mt-2">{price}</CardDescription>
              <p className="text-gray-600">{pkg.sessions}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className={`w-full ${
                  pkg.popular
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
                onClick={() => setShowCoupon(true)}
              >
                Choose Package
              </Button>

              {showCoupon && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                  />
                  <Button onClick={applyCoupon} className="w-full bg-pink-500 text-white hover:bg-pink-600">
                    Apply Coupon
                  </Button>
                  <Button onClick={sendToWhatsApp} className="w-full bg-green-500 text-white hover:bg-green-600">
                    Send to WhatsApp
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</section>



{/* Booking Section */}
<section id="booking" className="py-16 px-4">
  <div className="container mx-auto max-w-2xl">
    <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Book Your Session</h3>
    <Card className="border-pink-200">
      <CardHeader>
        <CardTitle className="text-pink-700 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Schedule Your Appointment
        </CardTitle>
        <CardDescription>
          Fill out the form below and we'll contact you via WhatsApp to confirm your booking.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={bookingForm.name}
              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={bookingForm.phone}
              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={bookingForm.email}
            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
            placeholder="Enter your email address"
          />
        </div>

        

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              value={bookingForm.preferredDate}
              onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
            />
          </div>
          <div>
            <Label>Preferred Time Batch</Label>
            <Select onValueChange={(batch) => setBookingForm({ ...bookingForm, preferredTime: "" + batch })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning Batch">Morning Batch (9 AM - 12 PM)</SelectItem>
                <SelectItem value="Evening Batch">Evening Batch (2 PM - 6 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="time-slot">Select 1 Hour Slot</Label>
          <Select
            value={bookingForm.preferredTime}
            onValueChange={(slot) => setBookingForm({ ...bookingForm, preferredTime: slot })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose 1 hour slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</SelectItem>
              <SelectItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</SelectItem>
              <SelectItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</SelectItem>
              <SelectItem value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</SelectItem>
              <SelectItem value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</SelectItem>
              <SelectItem value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</SelectItem>
              <SelectItem value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">Additional Message (Optional)</Label>
          <Textarea
            id="message"
            value={bookingForm.message}
            onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
            placeholder="Tell us about your specific needs or concerns..."
            rows={3}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleBooking}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            disabled={!bookingForm.name || !bookingForm.phone}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Book via WhatsApp
          </Button>
          <Button
            onClick={handleDemoBooking}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50"
            disabled={!bookingForm.name || !bookingForm.phone}
          >
            Demo Session - ₹399
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</section>

{/* Rate Us Section */}
<section id="rate-us" className="py-16 px-4 bg-white/70">
  <div className="container mx-auto max-w-xl text-center">
    <h3 className="text-4xl font-bold text-gray-800 mb-6">Rate Your Experience</h3>
    <p className="text-gray-600 mb-6">We’d love to hear your feedback. Please rate us and share your thoughts!</p>

    {/* Star Rating */}
    <div className="flex justify-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={rating >= star ? "#f59e0b" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="w-10 h-10 cursor-pointer text-yellow-400 hover:scale-110 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.914c.969 0 1.371 1.24.588 1.81l-3.975 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.975-2.89a1 1 0 00-1.176 0l-3.975 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.975-2.89c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z"
          />
        </svg>
      ))}
    </div>

    {/* Feedback Textarea */}
    <textarea
      placeholder="Write your feedback (optional)"
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      className="w-full border border-gray-300 rounded px-4 py-2 mb-4 resize-none"
      rows={3}
    />

    {/* Submit Button */}
    <Button
      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 hover:from-pink-600 hover:to-rose-600"
      onClick={() => {
        const message = `Rating: ${rating} Stars\nFeedback: ${feedback || "N/A"}`;
        window.open(`https://wa.me/919137762871?text=${encodeURIComponent(message)}`, "_blank");
      }}
      disabled={rating === 0}
    >
      Submit Rating
    </Button>

    {/* Sample Reviews */}
    <div className="mt-12">
      <h4 className="text-2xl font-semibold text-gray-700 text-center mb-6">What Others Are Saying</h4>
      <div className="grid gap-4 text-left">
        {[
          "Absolutely transformative experience. I feel calmer and more in control.",
          "The sessions helped me reduce my anxiety significantly. Highly recommended!",
          "Professional, relaxing, and truly healing. Thank you!",
          "I was skeptical at first, but now I'm a believer. Great results.",
        ].map((review, idx) => (
          <div key={idx} className="bg-white border border-pink-200 rounded-lg p-4 shadow-sm">
            <p className="text-gray-600 italic">“{review}”</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>




      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                What is healing hypnosis and how does it work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Healing hypnosis is a therapeutic technique that uses guided relaxation and focused attention to help
                you access your subconscious mind. It works by helping you enter a deeply relaxed state where positive
                suggestions can be more easily accepted, promoting natural healing and positive behavioral changes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                How effective is hypnosis for migraine relief?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Clinical studies show that hypnosis can be highly effective for migraine relief, with many clients
                experiencing a significant reduction in frequency and intensity. Our 7-day migraine program has helped
                numerous clients achieve lasting relief through targeted hypnotic techniques.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                What's included in each session package?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Each package includes daily guided hypnosis sessions, personalized audio recordings, progress tracking,
                and ongoing support via WhatsApp. The 7-day package (₹3,000) includes 7 sessions, 15-day (₹5,000)
                includes 15 sessions, and 30-day (₹8,000) includes 30 sessions plus additional resources.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                Can hypnosis help with anxiety and stress?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, hypnosis is particularly effective for anxiety and stress management. Our specialized programs
                (₹3,500-₹8,500) teach relaxation techniques, help reframe negative thought patterns, and provide tools
                for long-term stress management.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                How does the weight loss hypnosis program work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our weight loss program (₹5,000-₹10,000) focuses on changing your relationship with food, increasing
                motivation for healthy habits, and addressing emotional eating patterns. It's available in 15-day and
                30-day packages for sustainable results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                What is the demo session and what does it include?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The demo session (₹399) is a 45-minute introductory session where you'll experience hypnosis firsthand,
                learn about the process, and discuss your specific needs. It's perfect for first-time clients who want
                to try hypnosis before committing to a full program.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border border-pink-200 rounded-lg px-4">
              <AccordionTrigger className="text-pink-700 hover:text-pink-800">
                How do I schedule and attend sessions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                After booking through our website, we'll contact you via WhatsApp to confirm your appointment and
                provide session details. Sessions can be conducted online or in-person, depending on your preference and
                location.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-black text-white py-12 px-4">
  <div className="container mx-auto">
    <div className="grid md:grid-cols-3 gap-8">
      {/* Branding Section */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <img src="/logo.png" alt="Mind Spirit Body Logo" className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Mind Spirit Body
            </h4>
            <p className="text-xs text-gray-300"></p>
          </div>
        </div>
        <p className="text-gray-300 text-sm">
          Empowering minds, healing hearts, and transforming lives through the power of therapeutic hypnosis.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h5 className="font-semibold mb-4 text-pink-400">Quick Links</h5>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            <a href="#home" className="hover:text-pink-400 transition-colors">Home</a>
          </li>
          <li>
            <a href="#services" className="hover:text-pink-400 transition-colors">Benefits</a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-pink-400 transition-colors">Pricing</a>
          </li>
          <li>
            <a href="#booking" className="hover:text-pink-400 transition-colors">Book Now</a>
          </li>
          <li>
            <a href="#faq" className="hover:text-pink-400 transition-colors">FAQ</a>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h5 className="font-semibold mb-4 text-pink-400">Contact Info</h5>
        <div className="space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            +91 9137762871
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            WhatsApp Support
          </p>
          <p>Available: Mon-Sat, 9 AM - 8 PM</p>
        </div>
      </div>
    </div>

    {/* Bottom Text */}
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
      <p>&copy; 2025 Mind Spirit Body. All rights reserved. | Transforming lives through healing hypnosis.</p>
    </div>
  </div>
</footer>

    </div>
  )
}
