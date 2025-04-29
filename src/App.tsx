import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/sidebar.component';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> 
      <main className="flex-1 p-8">
        <Outlet /> 
      </main>
    </div>
  );
}

// import { useState } from 'react'
// import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <h1 className="text-3xl font-bold underline">
// //           Hello world!
// //         </h1>
        
// //       </div>
// //     </>
// //   )
// // }

// // export default App
// import { FaMapMarkerAlt, FaBookmark, FaCalendarAlt, FaWind, FaCloudRain, FaTachometerAlt, FaSun, FaSearch, FaBell,FaRegClock } from 'react-icons/fa';

// export default function WeatherDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-600 text-white p-6">
//         <h1 className="text-2xl font-bold mb-8">WeatherApp</h1>
        
//         <nav className="space-y-6">
//           <SidebarItem icon={<FaMapMarkerAlt />} active>Map</SidebarItem>
//           <SidebarItem icon={<FaBookmark />}>Saved Location</SidebarItem>
//           <SidebarItem icon={<FaCalendarAlt />}>Calendar</SidebarItem>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Header */}
        // <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
        //   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
        //     <div>
        //       <h1 className="text-2xl font-bold text-gray-800">January 2022</h1>
        //       <p className="text-gray-500">Thursday, Jan 4, 2022</p>
        //     </div>
            
        //     <div className="flex items-center gap-4">
        //       {/* Search Bar */}
        //       <div className="relative flex-1 max-w-md">
        //         <input
        //           type="text"
        //           placeholder="Search location here"
        //           className="w-full pl-10 pr-44 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         <FaSearch className="absolute left-3 top-3 text-gray-400" />
        //       </div>
              
        //       {/* Alert Icon */}
        //       <button className="p-2 text-gray-500 hover:text-gray-700 relative">
        //         <FaBell className="text-xl" />
        //         <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        //       </button>
              
        //       {/* Log/Time Icon */}
        //       <button className="p-2 text-gray-500 hover:text-gray-700">
        //         <FaRegClock className="text-xl" />
        //       </button>
        //     </div>
        //   </div>
        // </header>

//         {/* Today Overview */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Today overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <MetricCard icon={<FaWind />} title="Wind Speed" value="12km/h" change="2km/h" />
//             <MetricCard icon={<FaCloudRain />} title="Rain Change" value="24%" change="10%" />
//             <MetricCard icon={<FaTachometerAlt />} title="Pressure" value="720 hpa" change="32 hpa" />
//             <MetricCard icon={<FaSun />} title="Uv Index" value="2,3" change="0,3" />
//           </div>
//         </section>

//         {/* Temperature Section */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Average Weekly Temperature</h2>
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left pb-2 text-gray-500 font-medium">System</th>
//                   <th className="text-left pb-2 text-gray-500 font-medium">Test</th>
//                   <th className="text-left pb-2 text-gray-500 font-medium">Test</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-100">
//                   <td className="py-3 text-gray-600">Setting</td>
//                   <td className="py-3 font-medium">30°</td>
//                   <td className="py-3 font-medium">25°</td>
//                 </tr>
//                 <tr className="border-b border-gray-100">
//                   <td className="py-3 text-gray-600">Logout account</td>
//                   <td className="py-3 font-medium">20°</td>
//                   <td className="py-3 font-medium">15°</td>
//                 </tr>
//                 <tr>
//                   <td className="py-3"></td>
//                   <td className="py-3 text-gray-600">Week 1</td>
//                   <td className="py-3 text-gray-600">Week 2</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Location and Current Temp */}
//         <section className="flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-700">Tegal, Indonesia</h2>
//           </div>
//           <div className="text-right">
//             <p className="text-4xl font-bold text-gray-800">23° C</p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// // Reusable Components
// const SidebarItem = ({ icon, children, active = false }: { icon: React.ReactNode, children: React.ReactNode, active?: boolean }) => (
//   <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
//     active ? 'bg-blue-700' : 'hover:bg-blue-700/50'
//   }`}>
//     <span className="text-lg">{icon}</span>
//     <span>{children}</span>
//   </div>
// );

// const MetricCard = ({ icon, title, value, change }: { icon: React.ReactNode, title: string, value: string, change: string }) => (
//   <div className="bg-white p-4 rounded-lg shadow-sm">
//     <div className="flex items-center space-x-3 mb-2">
//       <span className="text-blue-500">{icon}</span>
//       <h3 className="text-gray-600">{title}</h3>
//     </div>
//     <div className="flex items-baseline space-x-2">
//       <p className="text-2xl font-bold">{value}</p>
//       <p className={`text-sm ${
//         change.startsWith('-') ? 'text-red-500' : 'text-green-500'
//       }`}>{change}</p>
//     </div>
//   </div>
// );