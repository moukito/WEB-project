import Cart from '../components/Cart';
import Header from '../components/Header';

function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Cart />
      </main>
    </div>
  );
}

export default CartPage;