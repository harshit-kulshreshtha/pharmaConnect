export async function GET() {
    const orders = [
      { id: "ORD-101", customer: "Harshit", status: "Pending" },
      { id: "ORD-102", customer: "Riya", status: "Shipped" },
      { id: "ORD-103", customer: "Arjun", status: "Delivered" },
    ];
    return Response.json(orders);
  }
  