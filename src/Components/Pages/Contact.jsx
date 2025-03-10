import React from "react";
import Navbar from "../Layout/Navbar";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import "./Contact.css"; 

const Contact = () => {
  return (
    <>
      <header className="navbarr">
        <Navbar />
      </header>

      <div className="contact-container">
        <div className="contact-wrapper">
          <main>
            <div className="contact-box">
              <h1 className="contact-title">Contact Us</h1>

              <div className="contact-grid">
                {/* Section Informations */}
                <div className="contact-info">
                  <h2 className="contact-subtitle">Get in Touch</h2>

                  <div className="contact-details">
                    <div className="contact-item">
                      <Phone className="contact-icon" />
                      <div>
                        <p className="label">Phone</p>
                        <p>+9661XXXXXXX</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <Mail className="contact-icon" />
                      <div>
                        <p className="label">Email</p>
                        <p>contact@healthcare.com</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <MapPin className="contact-icon" />
                      <div>
                        <p className="label">Address</p>
                        <p>123 Medical Center Blvd, Healthcare City</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <Clock className="contact-icon" />
                      <div>
                        <p className="label">Working Hours</p>
                        <p>Mon-Fri: 8am-8pm, Sat: 9am-5pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Formulaire */}
                <div className="contact-form">
                  <h2 className="contact-subtitle">Send us a Message</h2>

                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" placeholder="Enter your name" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="Enter your email" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" rows="4" placeholder="Enter your message" required></textarea>
                    </div>

                    <button type="submit" className="contact-button">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Contact;
