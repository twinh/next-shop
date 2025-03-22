export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <p className="text-gray-600">
              We&#39;re dedicated to providing the best shopping experience for our customers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-600 hover:text-gray-900">Products</a></li>
              <li><a href="/collections" className="text-gray-600 hover:text-gray-900">Collections</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-gray-900">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-600 hover:text-gray-900">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-black text-white rounded-r hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Next Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 