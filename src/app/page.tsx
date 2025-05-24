"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Printer,
  Server,
  Shield,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsSection from "@/components/ProductsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-rose-50 to-amber-50 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-60 -right-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-60 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Decorative leaves */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none">
        <Image
          src={"/images/leaf.png"}
          alt="Decorative leaf"
          width={300}
          height={300}
          className="object-contain animate-float"
        />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
        <Image
          src={"/images/leaf.png"}
          alt="Decorative leaf"
          width={300}
          height={300}
          className="object-contain transform scale-x-[-1] animate-float"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
        <Image
          src={"/images/leaf.png"}
          alt="Decorative leaf"
          width={300}
          height={300}
          className="object-contain transform rotate-180 animate-float"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none">
        <Image
          src={"/images/leaf.png"}
          alt="Decorative leaf"
          width={300}
          height={300}
          className="object-contain transform scale-x-[-1] rotate-180 animate-float"
        />
      </div>

      {/* Floating flowers */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 pointer-events-none animate-float animation-delay-1000">
        <Image
          src={"/images/flower1.png"}
          alt="Decorative flower"
          width={100}
          height={100}
          className="object-contain animate-float"
        />
      </div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 pointer-events-none animate-float animation-delay-3000">
        <Image
          src={"/images/flower1.png"}
          alt="Decorative flower"
          width={80}
          height={80}
          className="object-contain animate-float"
        />
      </div>
      <div className="absolute top-2/3 right-1/3 w-10 h-10 pointer-events-none animate-float animation-delay-5000">
        <Image
          src={"/images/flower1.png"}
          alt="Decorative flower"
          width={60}
          height={60}
          className="object-contain animate-float"
        />
      </div>

      {/* Navigation */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8  backdrop-filter backdrop-blur-sm bg-transparent bg-opacity-20 border border-white border-opacity-30 rounded-3xl m-4 shadow-xl">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-shrink-0 font-display text-2xl font-bold tracking-tight">
              Aadevraj
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              {["Services", "Solutions", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 transition-colors relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 border-0 shadow-lg shadow-amber-200/50 hover:shadow-amber-200/70 transition-shadow">
                <span className="relative z-10">Get Started</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="relative  backdrop-filter backdrop-blur-sm bg-transparent bg-opacity-20 border border-white border-opacity-30 rounded-3xl p-8 shadow-xl">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-amber-300 rounded-full filter blur-md opacity-30" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-green-300 rounded-full filter blur-md opacity-30" />
              {/* backdrop-filter backdrop-blur-sm bg-transparent bg-opacity-20 border border-white border-opacity-30 rounded-3xl p-8 shadow-xl */}
              <div className="relative">
                <h1 className="font-display font-sans text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  Aadevraj
                </h1>
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-amber-300 rounded-full filter blur-md opacity-30">
                  <Image
                    src={"/images/flower1.png"}
                    alt="Clay flower"
                    width={150}
                    height={150}
                    className="object-contain animate-float"
                  />
                </div>
                <p className="mt-4 text-xl text-gray-800">
                  Professional IT services and printing solutions for businesses
                  of all sizes. We deliver excellence in technology and print.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-br from-amber-400 to-amber-500 border-0 shadow-lg shadow-amber-200/50 hover:shadow-amber-200/70 transition-shadow"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore Services
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="relative overflow-hidden group border-white border-opacity-50"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <span className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { icon: Shield, text: "Secure" },
                    { icon: Clock, text: "24/7 Support" },
                    { icon: Users, text: "Expert Team" },
                    { icon: Server, text: "Reliable" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 relative group"
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <item.icon className="h-5 w-5 text-amber-600" />
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                      <span className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md perspective">
                {/* 3D Clay elements */}
                <div className="relative transform-3d rotate-y-6 rotate-x-12">
                  <div className="absolute -top-16 -left-16 w-32 h-32">
                    <div className="w-full h-full transform translate-z-8 rotate-y-24">
                      <Image
                        src={"/images/flower1.png"}
                        alt="Clay flower"
                        width={150}
                        height={150}
                        className="object-contain animate-float"
                      />
                    </div>
                  </div>

                  <div className="relative w-80 h-80 transform-3d rotate-y-6 rotate-x-6 hover:rotate-y-12 transition-transform duration-700">
                    <Image
                      src={"/images/3dhero1.png"}
                      alt="Adeveraaj Emblem"
                      width={500}
                      height={500}
                      className="object-contain transform translate-z-16"
                    />
                  </div>

                  <div className="absolute -bottom-12 -right-12 w-24 h-24">
                    <div className="w-full h-full transform translate-z-12 rotate-y-12">
                      <Image
                        src={"/images/leaf.png"}
                        alt="Clay flower"
                        width={120}
                        height={120}
                        className="object-contain animate-float animation-delay-2000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-amber-200 rounded-full filter blur-xl opacity-30" />
            </div>
            <h2 className="relative z-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="relative z-10 mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
              Comprehensive technology and printing solutions tailored to your
              business needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                id: "it-infra",
                icon: Server,
                title: "IT Infrastructure",
                description:
                  "Robust and scalable IT infrastructure solutions designed for reliability and performance.",
                color: "from-green-200 to-green-100",
              },
              {
                id: "print",
                icon: Printer,
                title: "Print Management",
                description:
                  "End-to-end print management services that optimize costs and improve efficiency.",
                color: "from-rose-200 to-rose-100",
              },
            ].map((service) => (
              <div
                key={service.id}
                className="relative transform-3d hover:translate-z-4 transition-transform duration-300  backdrop-filter backdrop-blur-sm bg-transparent bg-opacity-20 border border-white border-opacity-30 rounded-3xl  shadow-xl "
              >
                <div
                  className={`rounded-3xl bg-gradient-to-br ${service.color} p-8 shadow-clay h-full`}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-50" />

                  {/* Decorative flower in corner */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 opacity-80">
                    <Image
                      src={"/images/leaf.png"}
                      alt="Decorative flower"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <service.icon className="h-7 w-7 text-amber-600" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              className="relative overflow-hidden group border-white border-opacity-50"
            >
              <span className="relative z-10">View All Services</span>
              <span className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </div>
      </section>

      <ProductsSection />

      {/* Testimonials Section */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="absolute -left-20 top-1/3 w-16 h-16 pointer-events-none">
          <Image
            src={"/images/leaf.png"}
            alt="Decorative leaf"
            width={100}
            height={100}
            className="object-contain transform rotate-45"
          />
        </div>

        <div className="absolute -right-10 bottom-1/4 w-16 h-16 pointer-events-none">
          <Image
            src={"/images/leaf.png"}
            alt="Decorative leaf"
            width={100}
            height={100}
            className="object-contain transform -rotate-45 scale-x-[-1]"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses of all sizes for our exceptional service and
              solutions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "testimonial1",
                quote:
                  "ADEVERAAJ transformed our IT infrastructure with their innovative solutions. Highly recommended!",
                author: "Sarah Johnson",
                role: "CTO, TechVision Inc.",
              },
              {
                id: "testimonial2",
                quote:
                  "Their print management services reduced our costs by 30% while improving quality. Exceptional service!",
                author: "Michael Chen",
                role: "Operations Director, Global Media",
              },
              {
                id: "testimonial3",
                quote:
                  "The cybersecurity solutions provided by ADEVERAAJ have given us peace of mind in an increasingly complex digital landscape.",
                author: "Priya Sharma",
                role: "Security Head, FinTech Solutions",
              },
            ].map((testimonial) => (
              <div key={testimonial.id} className="relative perspective group ">
                <div className="relative backdrop-filter backdrop-blur-sm bg-transparent bg-opacity-20 border border-white border-opacity-30 rounded-3xl p-6 shadow-xl transform-3d group-hover:rotate-y-3 group-hover:rotate-x-3 transition-transform duration-300">
                  <div className="absolute top-3 left-3 text-5xl text-amber-300 opacity-30 font-serif">
                    &ldquo;
                  </div>

                  <div className="relative z-10">
                    <p className="text-gray-800 mb-4 relative z-10">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center">
                      <div className="mr-3 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 w-8 h-8 opacity-70">
                    <Image
                      src="/images/leaf.png"
                      alt="Decorative flower"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative">
                <div className="backdrop-filter backdrop-blur-sm bg-white bg-opacity-20 border border-white border-opacity-30 rounded-3xl p-8 shadow-xl h-full">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Get In Touch
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    Have questions about our services? Contact us today and our
                    team will be happy to assist you.
                  </p>

                  <div className="mt-8 space-y-6">
                    {[
                      {
                        id: "email",
                        label: "Email",
                        value: "info@adeveraaj.com",
                      },
                      {
                        id: "phone",
                        label: "Phone",
                        value: "+1 (555) 123-4567",
                      },
                      {
                        id: "address",
                        label: "Address",
                        value: "123 Tech Plaza, Innovation District, CA 94103",
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex">
                        <div className="w-24 flex-shrink-0 font-medium text-gray-900">
                          {item.label}:
                        </div>
                        <div className="text-gray-700">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-6 right-6 w-20 h-20 opacity-80">
                    <Image
                      src="/images/3dhero.png"
                      alt="Adeveraaj Emblem"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="backdrop-filter backdrop-blur-sm bg-white bg-opacity-20 border border-white border-opacity-30 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h3>

                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-br from-amber-400 to-amber-500 border-0 shadow-lg shadow-amber-200/50 hover:shadow-amber-200/70 transition-shadow">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white border-opacity-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 mr-3">
                <Image
                  src="/images/3dhero.png"
                  alt="Adeveraaj Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div className="font-serif text-xl font-bold tracking-tighter">
                ADEVERAAJ
              </div>
            </div>

            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} ADEVERAAJ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
