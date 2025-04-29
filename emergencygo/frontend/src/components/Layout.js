export default function Layout({ children }) {
    return (
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-full w-60 bg-gray-800 text-white p-4 z-50">
          {/* Nav content */}
        </aside>
  
        {/* Main content */}
        <main style={{ marginLeft: 240, padding: 24 }}>
            {children}
        </main>
      </div>
    );
  }
  