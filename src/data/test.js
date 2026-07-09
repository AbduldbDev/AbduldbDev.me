const project = {
  category: "Academic",
  categoryColor: "text-secondary border-secondary/30 bg-secondary/5",
  title: "Silakbo Apparel",
  description:
    "A socially driven e-commerce platform built to promote mental health awareness through motivational apparel, combining advocacy with a seamless online shopping experience.",
  overview: [
    "Silakbo Apparel was developed as an advocacy-centered e-commerce website that empowers customers to support mental health awareness by purchasing motivational T-shirts. Every aspect of the platform was designed to provide a meaningful shopping experience while spreading positive messages.",
    "Built entirely with native PHP, MySQL, and Bootstrap, the system delivers a lightweight, fully customized online store without relying on third-party frameworks. It features a complete retail workflow, enabling customers to browse and purchase products while allowing administrators to efficiently manage inventory, orders, and store operations.",
  ],
  problems: [
    "Limited online platforms dedicated to promoting mental health advocacy through merchandise.",
    "Manual product, inventory, and order management processes reducing operational efficiency.",
    "Need for a lightweight, customizable e-commerce solution without framework dependencies.",
  ],
  solutions: [
    {
      title: "Framework-Free Architecture",
      body: "Developed entirely using native PHP and MySQL for maximum flexibility, maintainability, and performance.",
    },
    {
      title: "Complete E-Commerce Workflow",
      body: "Integrated shopping cart, checkout, order processing, and inventory management into a unified platform.",
    },
    {
      title: "Administrative Dashboard",
      body: "Centralized back-office system for managing products, customer orders, and store operations efficiently.",
    },
  ],
  features: [
    {
      title: "Product Catalog & Shopping Cart",
      body: "Browse motivational apparel with category filtering, detailed product pages, and a responsive shopping cart.",
    },
    {
      title: "Order & Checkout Management",
      body: "Secure checkout process with order placement, order history, and purchase tracking.",
    },
    {
      title: "Inventory & Product Management",
      body: "Administrators can add, update, and remove products while monitoring stock availability.",
    },
    {
      title: "Customer Account System",
      body: "User registration, authentication, profile management, and order history for returning customers.",
    },
    {
      title: "Responsive Bootstrap Interface",
      body: "Mobile-friendly design ensuring a consistent shopping experience across desktop, tablet, and mobile devices.",
    },
  ],
  stack: ["PHP", "MySQL", "Bootstrap", "HTML5", "CSS3", "JavaScript"],
  demoUrl: "#",
  repoUrl: "#",
  heroImage: "/placeholder.png",
  screenshots: Array(8).fill("/placeholder.png"),
  codeSnippet: `public function placeOrder($customerId, $cartItems) {
    $orderId = createOrder($customerId);

    foreach ($cartItems as $item) {
        saveOrderItem($orderId, $item);
        updateInventory($item['product_id'], $item['quantity']);
    }

    return $orderId;
}`,
  snippetFile: "app/Services/OrderService.php",
};
