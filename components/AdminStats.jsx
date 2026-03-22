export default function AdminStats({ title, value }) {
    return (
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-blue-600 mt-1">{value}</p>
      </div>
    );
  }
  