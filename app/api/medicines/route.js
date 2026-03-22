let medicines = [
    { id: 1, name: "Paracetamol 500mg", price: 25, category: "Pain Relief" },
    { id: 2, name: "Amoxicillin 250mg", price: 45, category: "Antibiotic" },
    { id: 3, name: "Cetirizine 10mg", price: 15, category: "Allergy" },
  ];
  
  export async function GET() {
    return Response.json(medicines);
  }
  
  export async function POST(request) {
    const body = await request.json();
    const newMed = { id: Date.now(), ...body };
    medicines.push(newMed);
    return Response.json(newMed, { status: 201 });
  }
  
  export async function PUT(request) {
    const updated = await request.json();
    medicines = medicines.map((m) => (m.id === updated.id ? updated : m));
    return Response.json(updated);
  }
  
  export async function DELETE(request) {
    const { id } = await request.json();
    medicines = medicines.filter((m) => m.id !== id);
    return Response.json({ success: true });
  }
  