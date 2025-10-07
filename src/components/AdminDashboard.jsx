import React, { useState, useEffect } from 'react'
import { BarChart3, Clock, AlertTriangle, CheckCircle, Zap, Calendar, TrendingUp, Users, LogOut, User, ClipboardList } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import orderQueueService from '../services/orderQueueService'
import authService from '../services/authService'
import OrderManagement from './OrderManagement'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [queueStats, setQueueStats] = useState(null)
  const [refreshTime, setRefreshTime] = useState(new Date())
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' or 'orders'

  useEffect(() => {
    // Get current user
    const user = authService.getCurrentUser()
    setCurrentUser(user)

    const loadQueueStats = () => {
      const stats = orderQueueService.getQueueStatistics()
      setQueueStats(stats)
      setRefreshTime(new Date())
    }

    loadQueueStats()
    // Auto-refresh every 2 minutes
    const interval = setInterval(loadQueueStats, 2 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    authService.logout()
    navigate('/admin/login', { replace: true })
  }

  if (!queueStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading queue statistics...</p>
        </div>
      </div>
    )
  }

  const { todayCapacity, weekAhead, totalInQueue, averageDeliveryTime } = queueStats

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' ? 'Pipeline Dashboard' : 'Order Management'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard'
                  ? `Last updated: ${refreshTime.toLocaleTimeString()}`
                  : 'Manage and track all customer orders'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-SG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {/* User Info & Logout */}
              {currentUser && (
                <div className="flex items-center space-x-4 border-l border-gray-300 pl-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-violet-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{currentUser.name}</div>
                      <div className="text-gray-500 capitalize">{currentUser.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'dashboard'
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Pipeline Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'orders'
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Order Management</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {activeTab === 'dashboard' ? (
          <>
            {/* Dashboard Content */}
        {/* Today's Capacity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Regular Orders */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Regular Orders</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {todayCapacity.regular.current}/{todayCapacity.regular.capacity}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${todayCapacity.regular.percentUsed}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {todayCapacity.regular.available} slots remaining
            </p>
          </div>

          {/* 24h Rush Orders */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">24h Rush</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {todayCapacity.rush24h.current}/{todayCapacity.rush24h.capacity}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${todayCapacity.rush24h.percentUsed}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {todayCapacity.rush24h.available} slots remaining
            </p>
          </div>

          {/* 12h Rush Orders */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">12h Express</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {todayCapacity.rush12h.current}/{todayCapacity.rush12h.capacity}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${todayCapacity.rush12h.percentUsed}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {todayCapacity.rush12h.available} slots remaining
            </p>
          </div>

          {/* Queue Status */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Queue</h3>
                <p className="text-2xl font-bold text-gray-900">{totalInQueue}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Avg delivery: {averageDeliveryTime}
            </p>
            <div className="mt-2 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">On track</span>
            </div>
          </div>
        </div>

        {/* Week Ahead Schedule */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">7-Day Pipeline</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Regular</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">24h Rush</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">12h Rush</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {weekAhead.map((day, index) => {
                  const isToday = index === 0
                  const totalCapacity = 15 + 5 + 2 // regular + rush24h + rush12h
                  const utilizationPercent = Math.round((day.total / totalCapacity) * 100)

                  return (
                    <tr key={day.date} className={isToday ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {day.formatted}
                              {isToday && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">TODAY</span>}
                            </div>
                            <div className="text-sm text-gray-500">{day.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{day.regular}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{day.rush24h}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{day.rush12h}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-medium text-gray-900">{day.total}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          {utilizationPercent >= 90 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Full
                            </span>
                          ) : utilizationPercent >= 70 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Busy
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Available
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Capacity Alerts */}
        {(todayCapacity.regular.percentUsed >= 80 || todayCapacity.rush24h.percentUsed >= 90 || todayCapacity.rush12h.percentUsed >= 90) && (
          <div className="bg-white rounded-lg border border-orange-200">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-orange-900">Capacity Alerts</h2>
              </div>
              <div className="space-y-3">
                {todayCapacity.regular.percentUsed >= 80 && (
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-800">
                      <strong>Regular orders at {todayCapacity.regular.percentUsed}% capacity</strong> -
                      Only {todayCapacity.regular.available} slots remaining today
                    </span>
                  </div>
                )}
                {todayCapacity.rush24h.percentUsed >= 90 && (
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-800">
                      <strong>24h rush orders at {todayCapacity.rush24h.percentUsed}% capacity</strong> -
                      Consider blocking new rush orders
                    </span>
                  </div>
                )}
                {todayCapacity.rush12h.percentUsed >= 90 && (
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <Zap className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-800">
                      <strong>12h express orders at {todayCapacity.rush12h.percentUsed}% capacity</strong> -
                      Express delivery may be unavailable
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Increase Capacity</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Block Rush Orders</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Update Delivery Times</span>
            </button>
          </div>
        </div>
          </>
        ) : (
          /* Order Management Tab */
          <OrderManagement />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard