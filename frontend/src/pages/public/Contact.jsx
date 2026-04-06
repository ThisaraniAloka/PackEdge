import React from 'react';
import ContactForm from '../../components/public/ContactForm';
import MapEmbed from '../../components/public/MapEmbed';

export default function Contact() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactForm />
        <MapEmbed />
      </div>
    </div>
  );
}
