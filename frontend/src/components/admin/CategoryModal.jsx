import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

export default function CategoryModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add category
    onClose();
  };

  return (
    <Modal isOpen={true} title="Add New Category" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          as="textarea"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Category
        </button>
      </form>
    </Modal>
  );
}
