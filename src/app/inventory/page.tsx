/* 📦 Inventory Module - Integrated from legacy-mocks */

"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  Plus,
  Bell,
  CheckCircle,
  Calendar,
  Truck,
  BarChart3,
  Settings,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const InventoryModule = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
  }, [])

  // Sample inventory data
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
      lastOrdered: "2025-01-05",
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
      lastOrdered: "2024-12-20",
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
      lastOrdered: "2025-01-10",
      expirationDate: "2027-07-30",
      status: "adequate",
      location: "Supply Closet B",
      lotNumber: "GLV2025079"
    },
    {
      id: 4,
      name: "Dental Burs (Diamond)",
      category: "Instruments",
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: "pieces",
      unitCost: 4.25,
      totalValue: 191.25,
      vendor: "Brasseler USA",
      lastOrdered: "2025-01-12",
      expirationDate: null,
      status: "adequate",
      location: "Operatory Supplies",
      lotNumber: "BUR2025011"
    },
    {
      id: 5,
      name: "Alginate Impression Material",
      category: "Impression Materials",
      currentStock: 8,
      minStock: 12,
      maxStock: 30,
      unit: "pouches",
      unitCost: 15.99,
      totalValue: 127.92,
      vendor: "Kerr Dental",
      lastOrdered: "2024-12-15",
      expirationDate: "2025-10-20",
      status: "low",
      location: "Lab Storage",
      lotNumber: "ALG2024122"
    }
  ]

  const categories = [
    'all',
    'Restorative Materials',
    'Pharmaceuticals',
    'PPE & Safety',
    'Instruments',
    'Impression Materials'
  ]

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'low': return 'bg-yellow-100 text-yellow-800'
      case 'adequate': return 'bg-green-100 text-green-800'
      case 'overstock': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'critical': return <AlertCircle className="h-4 w-4" />
      case 'low': return <AlertTriangle className="h-4 w-4" />
      case 'adequate': return <CheckCircle className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  // Calculate summary statistics
  const stats = {
    totalItems: inventoryItems.length,
    criticalItems: inventoryItems.filter(i => i.status === 'critical').length,
    lowStockItems: inventoryItems.filter(i => i.status === 'low').length,
    totalValue: inventoryItems.reduce((sum, item) => sum + item.totalValue, 0),
    expiringItems: inventoryItems.filter(i => {
      if (!i.expirationDate) return false
      const expDate = new Date(i.expirationDate)
      const threeMonths = new Date()
      threeMonths.setMonth(threeMonths.getMonth() + 3)
      return expDate <= threeMonths
    }).length
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
            <p className="text-sm text-gray-600 mt-1">Track supplies, equipment, and materials</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Truck className="w-4 h-4 mr-2" />
              Vendors
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">{stats.totalItems}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Stock</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalItems}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.lowStockItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.expiringItems}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search items or vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Item Name</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-center p-3">Stock Level</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-right p-3">Unit Cost</th>
                    <th className="text-right p-3">Total Value</th>
                    <th className="text-center p-3">Expiration</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.vendor}</p>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{item.category}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-medium">{item.currentStock}</span>
                          <span className="text-sm text-gray-500">/ {item.maxStock}</span>
                          <span className="text-sm text-gray-500">{item.unit}</span>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1 mx-auto">
                          <div 
                            className={`h-2 rounded-full ${
                              item.status === 'critical' ? 'bg-red-500' :
                              item.status === 'low' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={getStatusColor(item.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(item.status)}
                            {item.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="p-3 text-right">${item.unitCost.toFixed(2)}</td>
                      <td className="p-3 text-right font-medium">${item.totalValue.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        {item.expirationDate ? (
                          <span className={`text-sm ${
                            new Date(item.expirationDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3))
                              ? 'text-orange-600 font-medium'
                              : 'text-gray-600'
                          }`}>
                            {new Date(item.expirationDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <Button variant="outline" size="sm">
                          Order
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                Critical Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-800">
                {stats.criticalItems} items below minimum stock levels. 
                Immediate reordering recommended.
              </p>
              <Button className="mt-3 bg-red-600 hover:bg-red-700" size="sm">
                View Critical Items
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Expiration Warning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-800">
                {stats.expiringItems} items expiring within 3 months. 
                Review and rotate stock.
              </p>
              <Button className="mt-3 bg-orange-600 hover:bg-orange-700" size="sm">
                View Expiring Items
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Usage Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800">
                Track consumption patterns and optimize reorder points.
              </p>
              <Button className="mt-3 bg-blue-600 hover:bg-blue-700" size="sm">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InventoryModule
