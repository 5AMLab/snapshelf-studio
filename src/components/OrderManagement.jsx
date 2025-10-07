import React, { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Eye,
  Edit3,
  User,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Users,
  FileImage,
  Tag
} from 'lucide-react'
import orderManagementService from '../services/orderManagementService'

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignedTo: 'all',
    search: '',
    dateFrom: '',
    dateTo: ''
  })
  const [selectedOrders, setSelectedOrders] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [statistics, setStatistics] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [statuses, setStatuses] = useState([])
  const [priorities, setPriorities] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    loadOrders()
    setTeamMembers(orderManagementService.getTeamMembers())
    setStatuses(orderManagementService.getStatuses())
    setPriorities(orderManagementService.getPriorities())
  }, [])

  useEffect(() => {
    applyFilters()
  }, [orders, filters])

  const loadOrders = () => {
    const allOrders = orderManagementService.getOrders()
    const stats = orderManagementService.getOrderStatistics()
    setOrders(allOrders)
    setStatistics(stats)
  }

  const applyFilters = () => {
    const filtered = orderManagementService.getOrders(filters)
    setFilteredOrders(filtered)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const getStatusInfo = (statusId) => {
    return statuses.find(status => status.id === statusId) || { label: statusId, color: 'gray' }
  }

  const getPriorityInfo = (priorityId) => {
    return priorities.find(priority => priority.id === priorityId) || { label: priorityId, color: 'gray' }
  }

  const getTeamMember = (memberId) => {
    return teamMembers.find(member => member.id === memberId) || { name: 'Unassigned', avatar: '👤' }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = (deliveryDate, status) => {
    return new Date(deliveryDate) < new Date() && !['completed', 'delivered', 'cancelled'].includes(status)
  }

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderManagementService.updateOrderStatus(orderId, newStatus)
      loadOrders()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleAssignmentChange = async (orderId, teamMemberId) => {
    try {
      await orderManagementService.assignOrder(orderId, teamMemberId)
      loadOrders()
    } catch (error) {
      console.error('Failed to assign order:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
              </div>
              <FileImage className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${statistics.totalRevenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-600">${statistics.avgOrderValue}</p>
              </div>
              <Tag className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{statistics.overdueOrders}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, customers, or IDs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Priority</option>
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id}>{priority.label}</option>
              ))}
            </select>

            <select
              value={filters.assignedTo}
              onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Assignees</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              More
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(filteredOrders.map(order => order.id))
                      } else {
                        setSelectedOrders([])
                      }
                    }}
                    className="w-4 h-4 text-violet-600 border-gray-300 rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status)
                const priorityInfo = getPriorityInfo(order.priority)
                const assignee = getTeamMember(order.assignedTo)
                const overdue = isOverdue(order.deliveryDate, order.status)

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="w-4 h-4 text-violet-600 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.orderType}</div>
                        <div className="text-xs text-gray-400">{formatDate(order.createdAt)}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                        <div className="text-xs text-gray-400">{order.customer.company}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border-0 font-medium focus:ring-2 focus:ring-violet-500 ${
                          statusInfo.color === 'green' ? 'bg-green-100 text-green-800' :
                          statusInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          statusInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          statusInfo.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          statusInfo.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                          statusInfo.color === 'red' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {statuses.map(status => (
                          <option key={status.id} value={status.id}>{status.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        priorityInfo.color === 'red' ? 'bg-red-100 text-red-800' :
                        priorityInfo.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                        priorityInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {priorityInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={order.assignedTo}
                        onChange={(e) => handleAssignmentChange(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-violet-500"
                      >
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.avatar} {member.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className={`font-medium ${overdue ? 'text-red-600' : 'text-gray-900'}`}>
                          {formatDate(order.deliveryDate)}
                        </div>
                        {overdue && (
                          <div className="text-red-500 text-xs flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">${order.price}</div>
                        <div className="text-gray-500">{order.quantity} photos</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Edit Order"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found matching your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{selectedOrders.length} orders selected</span>
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Update Status
            </button>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
              Assign
            </button>
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement