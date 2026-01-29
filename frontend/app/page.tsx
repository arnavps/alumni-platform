"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  UsersIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  BarChart3Icon,
  MessageSquareIcon,
} from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-black/5 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Alumni Platform Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span
                className={`text-xl font-bold transition-colors ${scrolled ? "text-slate-900" : "text-white"
                  }`}
              >
                Alumni Platform
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A5F] via-[#0F172A] to-[#0F172A]">
        {/* Particles Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          <div className="absolute top-40 right-20 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 animation-delay-200" />
          <div className="absolute bottom-40 left-1/4 h-2 w-2 animate-pulse rounded-full bg-cyan-300 animation-delay-500" />
          <div className="absolute top-60 right-1/3 h-1 w-1 animate-pulse rounded-full bg-blue-300 animation-delay-700" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/15 px-4 py-2 backdrop-blur-lg">
                <span className="text-sm font-semibold text-blue-300">
                  🎓 Trusted by 50,000+ Alumni
                </span>
              </div>

              <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-white lg:text-6xl">
                Alumni Engagement & Networking Platform
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300">
                Connect verified alumni, students, and faculty through structured
                networking, mentorship, referrals, and analytics.
              </p>

              <div className="max-w-md space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-xl border-2 border-white/20 bg-white/10 px-5 text-white placeholder-white/50 backdrop-blur-lg transition focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/30"
                />

                <Link
                  href="/register"
                  className="flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-lg shadow-blue-500/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/50"
                >
                  Get Started Free
                </Link>

                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4" /> No credit card required
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4" /> Free 30-day trial
                  </span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:ml-auto">
              <div className="relative animate-float">
                <div className="relative rounded-2xl">
                  <img
                    src="/placeholder.png"
                    alt="Network of alumni, students and faculty connecting through the platform"
                    className="w-full h-auto max-w-[600px] drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-radial from-cyan-500/20 to-transparent blur-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="h-6 w-6 text-white/60" />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Trusted by leading institutions
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-xl bg-slate-50 p-6 opacity-60 transition hover:opacity-100"
              >
                <span className="text-lg font-bold text-slate-400">
                  University {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Everything you need to engage your alumni
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Powerful features designed for universities, institutions, and alumni networks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheckIcon,
                title: "Verified Alumni Network",
                description:
                  "Rigorous verification process ensures authentic connections within your community.",
              },
              {
                icon: BriefcaseIcon,
                title: "Job & Internship Board",
                description:
                  "Alumni post opportunities exclusively for students and fellow graduates.",
              },
              {
                icon: UsersIcon,
                title: "Mentorship Matching",
                description:
                  "AI-powered matching connects students with alumni mentors in their field.",
              },
              {
                icon: TrendingUpIcon,
                title: "Referral Management",
                description:
                  "Track and manage referral requests with built-in anti-spam controls.",
              },
              {
                icon: MessageSquareIcon,
                title: "Interview Insights",
                description:
                  "Share and access real interview experiences from alumni at top companies.",
              },
              {
                icon: BarChart3Icon,
                title: "Analytics Dashboard",
                description:
                  "Comprehensive metrics on engagement, placements, and network growth.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Get started in minutes with our simple onboarding process.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Account",
                description:
                  "Sign up with your institutional email and complete your profile.",
              },
              {
                step: "02",
                title: "Get Verified",
                description:
                  "Submit documents for alumni verification and gain full access.",
              },
              {
                step: "03",
                title: "Start Connecting",
                description:
                  "Browse opportunities, request mentorship, and engage with the network.",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mb-6 text-6xl font-bold text-blue-100">
                  {step.step}
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Hear from alumni and students using the platform daily.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Alumni, Class of 2018",
                quote:
                  "This platform helped me connect with students and give back to my alma mater. The mentorship feature is outstanding.",
              },
              {
                name: "Raj Patel",
                role: "Current Student",
                quote:
                  "I landed my dream internship through a referral from an alumnus I met here. The community is incredibly supportive.",
              },
              {
                name: "Dr. Emily Chen",
                role: "Faculty Member",
                quote:
                  "The analytics dashboard gives us valuable insights into student-alumni engagement. It's transformed our career services.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <p className="mb-6 text-slate-200 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: "50,000+", label: "Active Alumni" },
              { value: "1,200+", label: "Job Placements" },
              { value: "95%", label: "Satisfaction Rate" },
              { value: "300+", label: "Partner Companies" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-2 text-5xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-5xl font-bold">
            Ready to transform your alumni network?
          </h2>
          <p className="mb-10 text-xl text-slate-300">
            Join thousands of institutions already using our platform.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 font-semibold text-white shadow-lg shadow-blue-500/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/50 sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="inline-flex h-14 w-full items-center justify-center rounded-xl border-2 border-white/20 px-8 font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-3">
                <Image
                  src="/Logo.png"
                  alt="Alumni Platform Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-bold">Alumni Platform</span>
              </Link>
              <p className="text-sm text-slate-400">
                Connecting alumni, students, and institutions worldwide.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookie Policy", "Licenses"],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="mb-4 font-semibold">{col.title}</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            © 2025 Alumni Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
