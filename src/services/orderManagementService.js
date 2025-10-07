/**
 * Order Management Service
 * Handles viewing, editing, and managing customer orders
 */

class OrderManagementService {
  constructor() {
    this.orders = this.initializeMockOrders()
    this.teamMembers = this.initializeTeamMembers()
    this.statuses = [
      { id: 'pending', label: 'Pending Review', color: 'yellow', description: 'Awaiting initial review' },
      { id: 'in-progress', label: 'In Progress', color: 'blue', description: 'Currently being edited' },
      { id: 'quality-check', label: 'Quality Check', color: 'purple', description: 'Under quality review' },
      { id: 'revision', label: 'Revision Required', color: 'orange', description: 'Needs customer revisions' },
      { id: 'completed', label: 'Completed', color: 'green', description: 'Ready for delivery' },
      { id: 'delivered', label: 'Delivered', color: 'gray', description: 'Delivered to customer' },
      { id: 'cancelled', label: 'Cancelled', color: 'red', description: 'Order cancelled' }
    ]
    this.priorities = [
      { id: 'low', label: 'Low', color: 'gray' },
      { id: 'normal', label: 'Normal', color: 'blue' },
      { id: 'high', label: 'High', color: 'orange' },
      { id: 'urgent', label: 'Urgent', color: 'red' }
    ]
  }

  // Initialize mock team members
  initializeTeamMembers() {
    return [
      { id: 'unassigned', name: 'Unassigned', avatar: null, workload: 0, skills: [] },
      { id: 'alice', name: 'Alice Chen', avatar: '👩‍🎨', workload: 8, skills: ['background-removal', 'color-correction', 'retouching'] },
      { id: 'david', name: 'David Kim', avatar: '👨‍💻', workload: 6, skills: ['background-removal', 'bulk-processing', 'automation'] },
      { id: 'sarah', name: 'Sarah Wilson', avatar: '👩‍🎨', workload: 5, skills: ['retouching', 'color-correction', 'creative-editing'] },
      { id: 'mike', name: 'Mike Rodriguez', avatar: '👨‍🎨', workload: 7, skills: ['background-removal', 'product-photography', 'batch-editing'] }
    ]
  }

  // Initialize mock orders
  initializeMockOrders() {
    const now = new Date()
    const customers = [
      { name: 'Emma Thompson', email: 'emma@beautystore.com', company: 'Beauty Boutique' },
      { name: 'James Wilson', email: 'james@techgadgets.com', company: 'Tech Gadgets Co.' },
      { name: 'Sofia Rodriguez', email: 'sofia@fashionhub.com', company: 'Fashion Hub' },
      { name: 'Michael Chen', email: 'mike@homeessentials.com', company: 'Home Essentials' },
      { name: 'Lisa Anderson', email: 'lisa@organic-life.com', company: 'Organic Life' }
    ]

    const orderTypes = ['Standard Editing', 'Rush 24h', 'Background Removal', 'Color Correction', 'Product Enhancement']
    const platforms = ['Shopify', 'Amazon', 'Lazada', 'Shopee', 'Instagram', 'Facebook']

    return Array.from({ length: 25 }, (_, i) => {
      const customer = customers[Math.floor(Math.random() * customers.length)]
      const daysAgo = Math.floor(Math.random() * 14)
      const createdAt = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))
      const deliveryDays = Math.floor(Math.random() * 5) + 1
      const deliveryDate = new Date(createdAt.getTime() + (deliveryDays * 24 * 60 * 60 * 1000))

      const statusOptions = daysAgo < 2 ? ['pending', 'in-progress'] :
                           daysAgo < 5 ? ['in-progress', 'quality-check', 'revision'] :
                           ['completed', 'delivered']

      return {
        id: `ORD-${String(i + 1).padStart(3, '0')}`,
        customer: customer,
        orderType: orderTypes[Math.floor(Math.random() * orderTypes.length)],
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        quantity: Math.floor(Math.random() * 50) + 5,
        price: (Math.random() * 800 + 100).toFixed(2),
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        priority: i < 3 ? 'urgent' : i < 8 ? 'high' : i < 15 ? 'normal' : 'low',
        assignedTo: i < 20 ? ['alice', 'david', 'sarah', 'mike'][Math.floor(Math.random() * 4)] : 'unassigned',
        createdAt: createdAt.toISOString(),
        deliveryDate: deliveryDate.toISOString(),
        progress: Math.floor(Math.random() * 100),
        notes: i % 3 === 0 ? 'Customer requested white background for all images' : i % 4 === 0 ? 'Rush order - high priority' : '',
        files: {
          received: Math.floor(Math.random() * 10) + 5,
          processed: Math.floor(Math.random() * 8),
          delivered: Math.floor(Math.random() * 5)
        },
        tags: this.generateRandomTags(),
        lastActivity: new Date(createdAt.getTime() + (Math.random() * (now.getTime() - createdAt.getTime()))).toISOString()
      }
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  generateRandomTags() {
    const allTags = ['rush', 'bulk-order', 'new-customer', 'returning-client', 'complex-bg', 'simple-edit', 'e-commerce', 'fashion', 'beauty', 'electronics']
    const numTags = Math.floor(Math.random() * 3) + 1
    return Array.from({ length: numTags }, () => allTags[Math.floor(Math.random() * allTags.length)])
      .filter((tag, index, self) => self.indexOf(tag) === index) // Remove duplicates
  }

  // Get all orders with optional filtering
  getOrders(filters = {}) {
    let filteredOrders = [...this.orders]

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === filters.status)
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.priority === filters.priority)
    }

    // Filter by assigned team member
    if (filters.assignedTo && filters.assignedTo !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.assignedTo === filters.assignedTo)
    }

    // Search by customer name, email, or order ID
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order.customer.email.toLowerCase().includes(searchTerm) ||
        order.customer.company.toLowerCase().includes(searchTerm)
      )
    }

    // Filter by date range
    if (filters.dateFrom) {
      filteredOrders = filteredOrders.filter(order =>
        new Date(order.createdAt) >= new Date(filters.dateFrom)
      )
    }

    if (filters.dateTo) {
      filteredOrders = filteredOrders.filter(order =>
        new Date(order.createdAt) <= new Date(filters.dateTo)
      )
    }

    return filteredOrders
  }

  // Get single order by ID
  getOrder(orderId) {
    return this.orders.find(order => order.id === orderId)
  }

  // Update order
  updateOrder(orderId, updates) {
    const orderIndex = this.orders.findIndex(order => order.id === orderId)
    if (orderIndex === -1) {
      throw new Error('Order not found')
    }

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      ...updates,
      lastActivity: new Date().toISOString()
    }

    return this.orders[orderIndex]
  }

  // Update order status
  updateOrderStatus(orderId, newStatus, note = '') {
    const order = this.getOrder(orderId)
    if (!order) {
      throw new Error('Order not found')
    }

    return this.updateOrder(orderId, {
      status: newStatus,
      notes: note || order.notes,
      progress: newStatus === 'completed' ? 100 : newStatus === 'in-progress' ? Math.max(order.progress, 25) : order.progress
    })
  }

  // Update order priority
  updateOrderPriority(orderId, newPriority) {
    return this.updateOrder(orderId, { priority: newPriority })
  }

  // Assign order to team member
  assignOrder(orderId, teamMemberId) {
    const teamMember = this.teamMembers.find(member => member.id === teamMemberId)
    if (!teamMember) {
      throw new Error('Team member not found')
    }

    return this.updateOrder(orderId, { assignedTo: teamMemberId })
  }

  // Get order statistics
  getOrderStatistics(filters = {}) {
    const orders = this.getOrders(filters)

    const statusCounts = this.statuses.reduce((acc, status) => {
      acc[status.id] = orders.filter(order => order.status === status.id).length
      return acc
    }, {})

    const priorityCounts = this.priorities.reduce((acc, priority) => {
      acc[priority.id] = orders.filter(order => order.priority === priority.id).length
      return acc
    }, {})

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.price), 0)
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0

    return {
      total: orders.length,
      statusCounts,
      priorityCounts,
      totalRevenue: totalRevenue.toFixed(2),
      avgOrderValue: avgOrderValue.toFixed(2),
      overdueOrders: orders.filter(order =>
        new Date(order.deliveryDate) < new Date() &&
        !['completed', 'delivered', 'cancelled'].includes(order.status)
      ).length
    }
  }

  // Get team workload
  getTeamWorkload() {
    return this.teamMembers.map(member => {
      const assignedOrders = this.orders.filter(order =>
        order.assignedTo === member.id &&
        !['completed', 'delivered', 'cancelled'].includes(order.status)
      )

      return {
        ...member,
        activeOrders: assignedOrders.length,
        pendingTasks: assignedOrders.filter(order => order.status === 'pending').length,
        inProgressTasks: assignedOrders.filter(order => order.status === 'in-progress').length
      }
    })
  }

  // Get status and priority options
  getStatuses() {
    return this.statuses
  }

  getPriorities() {
    return this.priorities
  }

  getTeamMembers() {
    return this.teamMembers
  }

  // Bulk update orders
  bulkUpdateOrders(orderIds, updates) {
    const results = []

    orderIds.forEach(orderId => {
      try {
        const updatedOrder = this.updateOrder(orderId, updates)
        results.push({ success: true, orderId, order: updatedOrder })
      } catch (error) {
        results.push({ success: false, orderId, error: error.message })
      }
    })

    return results
  }

  // Delete/Cancel order
  cancelOrder(orderId, reason = '') {
    return this.updateOrder(orderId, {
      status: 'cancelled',
      notes: reason || 'Order cancelled'
    })
  }
}

// Export singleton instance
const orderManagementService = new OrderManagementService()
export default orderManagementService