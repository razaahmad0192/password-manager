import { React, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            {/* Navbar */}
           

            {/* Hero Section */}
            <section id="home" className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-white to-gray-100">
                <h2 className="text-5xl font-extrabold mb-4 text-blue-700">
                    Secure Your Passwords. Simplify Your Life.
                </h2>
                <p className="max-w-2xl text-gray-600 mb-8">
                    LockSafe is a secure, encrypted password manager built to protect your
                    digital identity. Store, organize, and access your passwords from
                    anywhere — safely and easily.
                </p>
                <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Create Free Account
                </Link>
            </section>

            {/* Features Section */}
            <section id="features" className="px-8 py-20 bg-white text-center">
                <h3 className="text-3xl font-bold mb-10">Why Choose LockSafe?</h3>
                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    <div>
                        <h4 className="text-xl font-semibold mb-3 text-blue-600">
                            End-to-End Encryption
                        </h4>
                        <p>
                            Your passwords are encrypted locally before they ever touch our
                            servers. Only you can decrypt them — not even we can see them.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-3 text-blue-600">
                            Auto-Generate Strong Passwords
                        </h4>
                        <p>
                            Generate uncrackable passwords instantly and save them with a
                            single click. Never reuse or forget another password.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-3 text-blue-600">
                            Access Anywhere
                        </h4>
                        <p>
                            Use LockSafe from your desktop, tablet, or mobile. Everything syncs
                            securely in real-time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section
                id="security"
                className="px-8 py-20 bg-gray-100 text-center text-gray-800"
            >
                <h3 className="text-3xl font-bold mb-6">Enterprise-Grade Security</h3>
                <p className="max-w-3xl mx-auto text-gray-600 mb-10">
                    We use AES-256 encryption, PBKDF2 key derivation, and zero-knowledge
                    architecture. Your master password never leaves your device, ensuring
                    absolute privacy and protection.
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">AES-256</h4>
                        <p>
                            Industry-standard encryption used by governments and security
                            agencies worldwide.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Zero-Knowledge</h4>
                        <p>
                            Only you can access your vault. We never store or transmit your
                            master password.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">End-to-End</h4>
                        <p>
                            Add an extra layer of security with End to End Encyrption.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            {/* <section id="pricing" className="px-8 py-20 bg-white text-center">
        <h3 className="text-3xl font-bold mb-10">Simple, Transparent Pricing</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 border rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Free</h4>
            <p className="text-gray-600 mb-4">For individuals</p>
            <p className="text-3xl font-bold mb-6">$0</p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li className="text-xl font-semibold">✔ 50 stored passwords</li>
              <li className="text-xl font-semibold">✔ AES-256 encryption</li>
              <li className="text-xl font-semibold">✔ Local backup</li>
            </ul>
            <Link
              to="/signup"
              className="block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          <div className="p-8 border-2 border-blue-600 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">Pro</h4>
            <p className="text-gray-600 mb-4">For power users</p>
            <p className="text-3xl font-bold mb-6">$5/mo</p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li className="text-xl font-semibold">✔ Unlimited passwords</li>
              <li className="text-xl font-semibold">✔ Device sync</li>
              <li className="text-xl font-semibold">✔ 2FA & breach alerts</li>
            </ul>
            <Link
              to="/signup"
              className="block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Upgrade Now
            </Link>
          </div>

          <div className="p-8 border rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Enterprise</h4>
            <p className="text-gray-600 mb-4">For teams</p>
            <p className="text-3xl font-bold mb-6">Custom</p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li className="text-xl font-semibold">✔ Admin dashboard</li>
              <li className="text-xl font-semibold">✔ Role-based access</li>
              <li className="text-xl font-semibold">✔ 24/7 support</li>
            </ul>
            <a
              href="#contact"
              className="block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section> */}

            {/* Contact Section */}
            <section
                id="contact"
                className="px-8 py-20 bg-white text-center text-gray-800"
            >
                <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
                <p className="text-gray-600 mb-8">
                    Have questions? We’re here to help you 24/7.
                </p>
                <a
                    href="mailto:ahmedsial295@gmail.com"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    ahmedsial295@gmail.com
                </a>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 bg-white border-t text-gray-600">
                © {new Date().getFullYear()} LockSafe. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
