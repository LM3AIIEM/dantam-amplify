/* ⚠️ LEGACY MOCK – do not edit */


"use client"

import React, { useState, useEffect } from 'react'
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Wrench, 
  DollarSign,
  Search,
  Filter,
  Plus,
  Bell,
  CheckCircle,
  XCircle,
  Calendar,
  Truck,
  BarChart3,
  Settings,
  ShoppingCart,
  AlertCircle,
  Package2,
  Zap,
  ArrowUp,
  ArrowDown,
  User
} from 'lucide-react'

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentDate, setCurrentDate] = useState(null)

  // Initialize date on client side to prevent hydration mismatch
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
  }, [])

  // Realistic dental inventory data
  const inventoryItems = [
    {
      id: 1,
      name: "3M Filtek Universal Composite",
      category: "Restorative Materials",
      currentStock: 15,
      minStock: 10,
      maxStock: 50,
      unit: "syringes",
      unitCost: 32.50,
      totalValue: 487.50,
      vendor: "Patterson Dental",
      lastOrdered: "2025-07-15",
      expirationDate: "2026-08-30",
      status: "adequate",
      location: "Storage Room A",
      lotNumber: "LOT2025078"
    },
    {
      id: 2,
      name: "Septocaine Anesthetic Cartridges",
      category: "Pharmaceuticals",
      currentStock: 3,
      minStock: 12,
      maxStock: 100,
      unit: "cartridges",
      unitCost: 1.85,
      totalValue: 5.55,
      vendor: "Henry Schein",
      lastOrdered: "2025-06-20",
      expirationDate: "2025-09-15",
      status: "critical",
      location: "Refrigerated Storage",
      lotNumber: "ANE2025062"
    },
    {
      id: 3,
      name: "Nitrile Examination Gloves",
      category: "PPE & Safety",
      currentStock: 125,
      minStock: 50,
      maxStock: 500,
      unit: "boxes",
      unitCost: 8.95,
      totalValue: 1118.75,
      vendor: "Defend",
      lastOrdered: "2025-07-28",
      expirationDate: "2027-07-30",
      status: "adequate",
      location: "Supply Closet B",
      lotNumber: "GLV2025079"
    },
    {
      id: 4,
      name: "Alginate Impression Material",
      category: "Impression Materials",
      currentStock: 8,
      minStock: 15,
      maxStock: 40,
      unit: "packages",
      unitCost: 24.75,
      totalValue: 198.00,
      vendor: "Kerr Dental",
      lastOrdered: "2025-07-10",
      expirationDate: "2025-08-20",
      status: "low",
      location: "Storage Room A",
      lotNumber: "ALG2025071"
    },
    {
      id: 5,
      name: "Dental X-Ray Film (Size 2)",
      category: "Radiology Supplies",
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: "packets",
      unitCost: 12.30,
      totalValue: 553.50,
      vendor: "Carestream Dental",
      lastOrdered: "2025-07-25",
      expirationDate: "2026-12-31",
      status: "adequate",
      location: "Radiology Storage",
      lotNumber: "XRF2025076"
    },
    {
      id: 6,
      name: "High-Speed Handpiece Maintenance Kit",
      category: "Instrument Maintenance",
      currentStock: 2,
      minStock: 5,
      maxStock: 15,
      unit: "kits",
      unitCost: 85.00,
      totalValue: 170.00,
      vendor: "NSK America",
      lastOrdered: "2025-06-15",
      expirationDate: "N/A",
      status: "low",
      location: "Maintenance Area",
      lotNumber: "MNT2025061"
    }
  ]

  // Equipment data
  const equipmentList = [
    {
      id: 1,
      name: "Adec 1040 Dental Chair #1",
      category: "Dental Chairs",
      serialNumber: "ADC2023-001",
      purchaseDate: "2023-03-15",
      warranty: "Active until March 2026",
      lastMaintenance: "2025-06-15",
      nextMaintenance: "2025-09-15",
      status: "operational",
      condition: "excellent",
      location: "Operatory 1",
      maintenanceCost: 2850.00,
      vendor: "Adec Inc."
    },
    {
      id: 2,
      name: "Sirona CEREC Omnicam",
      category: "CAD/CAM Systems",
      serialNumber: "SIR2022-045",
      purchaseDate: "2022-08-20",
      warranty: "Expired",
      lastMaintenance: "2025-07-20",
      nextMaintenance: "2025-10-20",
      status: "operational",
      condition: "good",
      location: "Operatory 2",
      maintenanceCost: 4250.00,
      vendor: "Dentsply Sirona"
    },
    {
      id: 3,
      name: "Planmeca ProMax 3D X-Ray",
      category: "Imaging Equipment",
      serialNumber: "PLN2024-012",
      purchaseDate: "2024-01-10",
      warranty: "Active until January 2027",
      lastMaintenance: "2025-05-10",
      nextMaintenance: "2025-08-10",
      status: "maintenance_due",
      condition: "excellent",
      location: "Imaging Room",
      maintenanceCost: 1850.00,
      vendor: "Planmeca USA"
    },
    {
      id: 4,
      name: "Midmark M11 Sterilizer",
      category: "Sterilization Equipment",
      serialNumber: "MID2023-078",
      purchaseDate: "2023-11-05",
      warranty: "Active until November 2026",
      lastMaintenance: "2025-07-30",
      nextMaintenance: "2025-08-15",
      status: "maintenance_overdue",
      condition: "fair",
      location: "Sterilization Center",
      maintenanceCost: 950.00,
      vendor: "Midmark Corporation"
    }
  ]

  // Vendor data
  const vendors = [
    {
      id: 1,
      name: "Patterson Dental",
      rating: 4.8,
      totalOrders: 156,
      onTimeDelivery: 94,
      qualityScore: 96,
      lastOrder: "2025-07-30",
      outstandingOrders: 3,
      paymentTerms: "Net 30",
      contact: "orders@patterson.com"
    },
    {
      id: 2,
      name: "Henry Schein",
      rating: 4.6,
      totalOrders: 89,
      onTimeDelivery: 91,
      qualityScore: 94,
      lastOrder: "2025-07-28",
      outstandingOrders: 1,
      paymentTerms: "Net 30",
      contact: "service@henryschein.com"
    },
    {
      id: 3,
      name: "Kerr Dental",
      rating: 4.7,
      totalOrders: 67,
      onTimeDelivery: 96,
      qualityScore: 98,
      lastOrder: "2025-07-25",
      outstandingOrders: 2,
      paymentTerms: "Net 15",
      contact: "support@kerrdental.com"
    }
  ]

  // Alert data
  const alerts = [
    {
      id: 1,
      type: "critical",
      message: "Septocaine Anesthetic - Only 3 cartridges remaining",
      item: "Septocaine Anesthetic Cartridges",
      action: "Order immediately",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "maintenance",
      message: "Midmark M11 Sterilizer maintenance overdue by 3 days",
      item: "Midmark M11 Sterilizer",
      action: "Schedule service",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "expiration",
      message: "Alginate Impression Material expires in 13 days",
      item: "Alginate Impression Material",
      action: "Use first or reorder",
      timestamp: "3 hours ago"
    },
    {
      id: 4,
      type: "low_stock",
      message: "High-Speed Handpiece Maintenance Kit below minimum",
      item: "Maintenance Kit",
      action: "Reorder suggested",
      timestamp: "5 hours ago"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'adequate': return 'text-green-600 bg-green-50 border-green-200'
      case 'maintenance_overdue': return 'text-red-600 bg-red-50 border-red-200'
      case 'maintenance_due': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'operational': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  const getStockPercentage = (current, max) => {
    return Math.round((current / max) * 100)
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...new Set(inventoryItems.map(item => item.category))]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Inventory Dashboard</h1>
          <p className="text-slate-600 text-sm">{currentDate || 'Loading...'}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alert Panel */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-slate-900">Critical Alerts</h2>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
            {alerts.filter(a => a.type === 'critical' || a.type === 'maintenance').length}
          </span>
        </div>
        <div className="space-y-3">
          {alerts.slice(0, 4).map(alert => (
            <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
              alert.type === 'critical' ? 'border-red-200 bg-red-50' :
              alert.type === 'maintenance' ? 'border-yellow-200 bg-yellow-50' :
              alert.type === 'expiration' ? 'border-orange-200 bg-orange-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              {alert.type === 'critical' && <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />}
              {alert.type === 'maintenance' && <Wrench className="w-5 h-5 text-yellow-600 mt-0.5" />}
              {alert.type === 'expiration' && <Clock className="w-5 h-5 text-orange-600 mt-0.5" />}
              {alert.type === 'low_stock' && <Package className="w-5 h-5 text-blue-600 mt-0.5" />}
              <div className="flex-1">
                <p className="font-medium text-slate-900">{alert.message}</p>
                <p className="text-sm text-slate-600">{alert.action} • {alert.timestamp}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Action
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Total Items</p>
              <p className="text-2xl font-semibold text-slate-900">347</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm">12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Critical Stock</p>
              <p className="text-2xl font-semibold text-slate-900">8</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <ArrowDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm">3 items since yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Total Value</p>
              <p className="text-2xl font-semibold text-slate-900">$89,750</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm">8.5% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Expiring Soon</p>
              <p className="text-2xl font-semibold text-slate-900">15</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-600 text-sm">Within next 30 days</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Quick Reorder</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">Anesthetic Cartridges</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Order
              </button>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">Maintenance Kits</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Order
              </button>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">Alginate Material</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Order
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-slate-900">Maintenance Due</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">Sterilizer Unit</span>
              <span className="text-red-600 text-sm font-medium">Overdue</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">X-Ray Machine</span>
              <span className="text-yellow-600 text-sm font-medium">Due Soon</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-slate-900">Recent Deliveries</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">Patterson Dental</span>
              <span className="text-green-600 text-sm">Delivered</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-700">Henry Schein</span>
              <span className="text-blue-600 text-sm">In Transit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInventory = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Inventory Management</h1>
          <p className="text-slate-600 text-sm">Track and manage all dental supplies</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </button>
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
            Import CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select 
            className="px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Stock Level</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Unit Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Total Value</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Expires</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">LOT: {item.lotNumber}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700">{item.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.currentStock} {item.unit}</span>
                          <span className="text-xs text-slate-600">{getStockPercentage(item.currentStock, item.maxStock)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.status === 'critical' ? 'bg-red-500' :
                              item.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(getStockPercentage(item.currentStock, item.maxStock), 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-900">${item.unitCost.toFixed(2)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900">${item.totalValue.toFixed(2)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm ${
                      item.expirationDate === 'N/A' ? 'text-slate-500' :
                      new Date(item.expirationDate) < new Date(Date.now() + 30*24*60*60*1000) ? 'text-red-600' :
                      new Date(item.expirationDate) < new Date(Date.now() + 90*24*60*60*1000) ? 'text-yellow-600' :
                      'text-slate-700'
                    }`}>
                      {item.expirationDate === 'N/A' ? 'N/A' : new Date(item.expirationDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-1 text-blue-600 hover:text-blue-700">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-700">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderEquipment = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Equipment Management</h1>
          <p className="text-slate-600 text-sm">Track maintenance and equipment status</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Equipment
          </button>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {equipmentList.map(equipment => (
          <div key={equipment.id} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">{equipment.name}</h3>
                <p className="text-sm text-slate-600">{equipment.category}</p>
                <p className="text-xs text-slate-500">S/N: {equipment.serialNumber}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(equipment.status)}`}>
                {equipment.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Location:</span>
                <span className="text-sm font-medium text-slate-900">{equipment.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Condition:</span>
                <span className={`text-sm font-medium ${
                  equipment.condition === 'excellent' ? 'text-green-600' :
                  equipment.condition === 'good' ? 'text-blue-600' :
                  equipment.condition === 'fair' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {equipment.condition.charAt(0).toUpperCase() + equipment.condition.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Last Maintenance:</span>
                <span className="text-sm text-slate-900">{new Date(equipment.lastMaintenance).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Next Maintenance:</span>
                <span className={`text-sm font-medium ${
                  new Date(equipment.nextMaintenance) < new Date() ? 'text-red-600' :
                  new Date(equipment.nextMaintenance) < new Date(Date.now() + 7*24*60*60*1000) ? 'text-yellow-600' :
                  'text-slate-900'
                }`}>
                  {new Date(equipment.nextMaintenance).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Warranty:</span>
                <span className="text-sm text-slate-900">{equipment.warranty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Maintenance Cost:</span>
                <span className="text-sm font-medium text-slate-900">${equipment.maintenanceCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Schedule Service
              </button>
              <button className="px-3 py-2 text-sm border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                View History
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Maintenance Calendar */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Upcoming Maintenance</h3>
        </div>
        <div className="space-y-3">
          {equipmentList
            .filter(eq => new Date(eq.nextMaintenance) < new Date(Date.now() + 30*24*60*60*1000))
            .sort((a, b) => new Date(a.nextMaintenance) - new Date(b.nextMaintenance))
            .map(equipment => (
              <div key={equipment.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wrench className={`w-5 h-5 ${
                    new Date(equipment.nextMaintenance) < new Date() ? 'text-red-600' :
                    new Date(equipment.nextMaintenance) < new Date(Date.now() + 7*24*60*60*1000) ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900">{equipment.name}</p>
                    <p className="text-sm text-slate-600">{equipment.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    new Date(equipment.nextMaintenance) < new Date() ? 'text-red-600' :
                    new Date(equipment.nextMaintenance) < new Date(Date.now() + 7*24*60*60*1000) ? 'text-yellow-600' :
                    'text-slate-900'
                  }`}>
                    {new Date(equipment.nextMaintenance).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(equipment.nextMaintenance) < new Date() ? 'Overdue' :
                     `${Math.ceil((new Date(equipment.nextMaintenance) - new Date()) / (24*60*60*1000))} days`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )

  const renderVendors = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Vendor Management</h1>
          <p className="text-slate-600 text-sm">Track vendor performance and relationships</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">{vendor.name}</h3>
                <p className="text-sm text-slate-600">{vendor.contact}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.floor(vendor.rating) ? 'bg-yellow-400' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-900 mt-1">{vendor.rating}/5.0</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{vendor.totalOrders}</p>
                <p className="text-sm text-slate-600">Total Orders</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{vendor.onTimeDelivery}%</p>
                <p className="text-sm text-slate-600">On-Time</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Quality Score:</span>
                <span className="text-sm font-medium text-slate-900">{vendor.qualityScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Payment Terms:</span>
                <span className="text-sm text-slate-900">{vendor.paymentTerms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Outstanding Orders:</span>
                <span className="text-sm font-medium text-slate-900">{vendor.outstandingOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Last Order:</span>
                <span className="text-sm text-slate-900">{new Date(vendor.lastOrder).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                New Order
              </button>
              <button className="px-3 py-2 text-sm border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Vendor Performance Comparison</h3>
        </div>
        <div className="space-y-4">
          {vendors.map(vendor => (
            <div key={vendor.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-900">{vendor.name}</span>
                <span className="text-sm text-slate-600">{vendor.onTimeDelivery}% on-time</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                  style={{ width: `${vendor.onTimeDelivery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Analytics & Reports</h1>
          <p className="text-slate-600 text-sm">Cost analysis and inventory insights</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Spending Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 78, 82, 71, 89, 94, 76, 85, 92, 88, 96, 91].map((value, index) => (
              <div key={index} className="flex-1 bg-blue-100 rounded-t flex items-end">
                <div 
                  className="w-full bg-blue-600 rounded-t transition-all duration-500"
                  style={{ height: `${(value / 100) * 200}px` }}
                  title={`Month ${index + 1}: ${(value * 100).toLocaleString()}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-2">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Spending by Category</h3>
          <div className="space-y-4">
            {[
              { name: 'Restorative Materials', amount: 24750, percentage: 35 },
              { name: 'PPE & Safety', amount: 18500, percentage: 26 },
              { name: 'Pharmaceuticals', amount: 14200, percentage: 20 },
              { name: 'Impression Materials', amount: 8900, percentage: 13 },
              { name: 'Radiology Supplies', amount: 4250, percentage: 6 }
            ].map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-900">{category.name}</span>
                  <span className="text-sm text-slate-600">${category.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{category.percentage}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-slate-900">Cost Savings</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">$12,450</p>
          <p className="text-sm text-slate-600">Saved this year through optimized ordering</p>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">vs. Last Year:</span>
              <span className="text-green-600 font-medium">+18.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package2 className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Inventory Turnover</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">8.2x</p>
          <p className="text-sm text-slate-600">Annual inventory turnover rate</p>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Industry Average:</span>
              <span className="text-slate-600">6.8x</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="font-semibold text-slate-900">Waste Reduction</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600 mb-2">92%</p>
          <p className="text-sm text-slate-600">Of items used before expiration</p>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Expired Items:</span>
              <span className="text-red-600">$485 value</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Inventory Valuation Report', description: 'Current value of all inventory items' },
            { name: 'Usage Analysis Report', description: 'Track item usage patterns and trends' },
            { name: 'Vendor Performance Report', description: 'Detailed vendor metrics and comparison' },
            { name: 'Expiration Management Report', description: 'Items expiring in various timeframes' },
            { name: 'Cost Analysis Report', description: 'Detailed cost breakdowns and savings' },
            { name: 'Equipment Maintenance Report', description: 'Maintenance history and upcoming needs' }
          ].map((report, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <h4 className="font-medium text-slate-900 mb-2">{report.name}</h4>
              <p className="text-sm text-slate-600 mb-3">{report.description}</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Generate →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'vendors', label: 'Vendors', icon: User },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Inventory Management</h1>
                  <p className="text-xs text-slate-600">Dantam AUGUST</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-blue-600 bg-blue-50'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'equipment' && renderEquipment()}
        {activeTab === 'vendors' && renderVendors()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  )
}

export default InventoryManagement