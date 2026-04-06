import React from 'react';

export default function CustomerPraise() {
  const testimonials = [
    {
      id: 1,
      author: 'Sarah Johnson',
      company: 'EcoShop',
      quote: 'PackEdge packaging is beautiful and truly eco-friendly!',
      rating: 5,
    },
    {
      id: 2,
      author: 'Mike Chen',
      company: 'Green Goods Co',
      quote: 'Great quality and fast shipping. Highly recommended!',
      rating: 5,
    },
    {
      id: 3,
      author: 'Lisa Rodriguez',
      company: 'Sustainable Goods',
      quote: 'Best sustainable packaging option available.',
      rating: 5,
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">What Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-6 bg-white rounded-lg shadow">
            <div className="mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-lg">★</span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-gray-500">{testimonial.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
