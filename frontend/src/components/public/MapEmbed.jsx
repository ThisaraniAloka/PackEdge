import React from 'react';

export default function MapEmbed() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0059!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGreenhouse%20Studio!5e0!3m2!1sen!2sus!4v1234567890"
        title="PackEdge Location"
      />
    </div>
  );
}
