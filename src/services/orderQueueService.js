/**
 * Order Queue Management Service
 * Handles capacity tracking, delivery date calculation, and rush job availability
 */

class OrderQueueService {
  constructor() {
    this.dailyCapacity = {
      regular: 15, // Regular orders per day
      rush24h: 5,  // 24-hour rush orders per day
      rush12h: 2   // 12-hour rush orders per day
    }

    this.workingDays = [1, 2, 3, 4, 5] // Monday to Friday
    this.baseDeliveryTime = {
      express: 1,  // Express packages: 24-48h
      standard: 2, // Standard packages: 48-72h
      premium: 1   // Premium packages: 24-48h
    }

    // Simulate current queue (in production, this would come from your database)
    this.currentQueue = this.initializeQueue()
  }

  // Initialize mock queue data (replace with actual database calls)
  initializeQueue() {
    const today = new Date()
    const queue = []

    // Add some mock orders for testing
    for (let i = 0; i < 8; i++) {
      const deliveryDate = new Date(today)
      deliveryDate.setDate(today.getDate() + Math.floor(i / 3))

      queue.push({
        id: `order_${Date.now()}_${i}`,
        type: i < 5 ? 'regular' : 'rush24h',
        deliveryDate: deliveryDate.toISOString().split('T')[0],
        status: 'pending'
      })
    }

    return queue
  }

  // Get current capacity status
  getCapacityStatus() {
    const today = new Date().toISOString().split('T')[0]
    const todayOrders = this.currentQueue.filter(order =>
      order.deliveryDate === today && order.status === 'pending'
    )

    const regularOrders = todayOrders.filter(order => order.type === 'regular').length
    const rush24hOrders = todayOrders.filter(order => order.type === 'rush24h').length
    const rush12hOrders = todayOrders.filter(order => order.type === 'rush12h').length

    return {
      regular: {
        current: regularOrders,
        capacity: this.dailyCapacity.regular,
        available: this.dailyCapacity.regular - regularOrders,
        percentUsed: Math.round((regularOrders / this.dailyCapacity.regular) * 100)
      },
      rush24h: {
        current: rush24hOrders,
        capacity: this.dailyCapacity.rush24h,
        available: this.dailyCapacity.rush24h - rush24hOrders,
        percentUsed: Math.round((rush24hOrders / this.dailyCapacity.rush24h) * 100)
      },
      rush12h: {
        current: rush12hOrders,
        capacity: this.dailyCapacity.rush12h,
        available: this.dailyCapacity.rush12h - rush12hOrders,
        percentUsed: Math.round((rush12hOrders / this.dailyCapacity.rush12h) * 100)
      }
    }
  }

  // Calculate realistic delivery date based on current queue
  calculateDeliveryDate(packageType = 'standard', isRushJob = false, rushType = null) {
    const now = new Date()
    const capacity = this.getCapacityStatus()

    if (isRushJob && rushType) {
      const rushCapacity = rushType === '12h' ? capacity.rush12h : capacity.rush24h
      const rushHours = rushType === '12h' ? 12 : 24

      if (rushCapacity.available > 0) {
        // Rush job available today
        const deliveryDate = new Date(now.getTime() + (rushHours * 60 * 60 * 1000))
        return {
          date: deliveryDate,
          dateString: deliveryDate.toISOString().split('T')[0],
          available: true,
          message: `Delivery in ${rushHours} hours`,
          surcharge: rushType === '12h' ? 50 : 25
        }
      } else {
        // Rush capacity full - offer next available slot
        const nextAvailableDate = this.findNextAvailableRushSlot(rushType)
        return {
          date: nextAvailableDate,
          dateString: nextAvailableDate.toISOString().split('T')[0],
          available: false,
          message: `Rush slots full today. Next available: ${this.formatDate(nextAvailableDate)}`,
          surcharge: rushType === '12h' ? 50 : 25
        }
      }
    }

    // Regular delivery calculation
    const baseDeliveryDays = this.baseDeliveryTime[packageType] || 2
    const queueDelay = Math.ceil(capacity.regular.percentUsed / 25) // Add delay based on capacity

    const deliveryDate = this.addBusinessDays(now, baseDeliveryDays + queueDelay)

    return {
      date: deliveryDate,
      dateString: deliveryDate.toISOString().split('T')[0],
      available: true,
      message: `Delivery by ${this.formatDate(deliveryDate)}`,
      surcharge: 0
    }
  }

  // Find next available rush slot
  findNextAvailableRushSlot(rushType) {
    let checkDate = new Date()
    const rushCapacity = rushType === '12h' ? this.dailyCapacity.rush12h : this.dailyCapacity.rush24h

    for (let i = 1; i <= 7; i++) { // Check next 7 days
      checkDate.setDate(checkDate.getDate() + 1)

      if (!this.isWorkingDay(checkDate)) continue

      const dateString = checkDate.toISOString().split('T')[0]
      const rushOrdersOnDate = this.currentQueue.filter(order =>
        order.deliveryDate === dateString && order.type === `rush${rushType}`
      ).length

      if (rushOrdersOnDate < rushCapacity) {
        return new Date(checkDate)
      }
    }

    // If no slots in 7 days, return next Monday
    return this.addBusinessDays(new Date(), 7)
  }

  // Add business days (excluding weekends)
  addBusinessDays(startDate, businessDays) {
    let currentDate = new Date(startDate)
    let daysAdded = 0

    while (daysAdded < businessDays) {
      currentDate.setDate(currentDate.getDate() + 1)
      if (this.isWorkingDay(currentDate)) {
        daysAdded++
      }
    }

    return currentDate
  }

  // Check if date is a working day
  isWorkingDay(date) {
    return this.workingDays.includes(date.getDay())
  }

  // Format date for display
  formatDate(date) {
    return date.toLocaleDateString('en-SG', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get urgency indicator for UI
  getUrgencyIndicator() {
    const capacity = this.getCapacityStatus()
    const totalPercentUsed = capacity.regular.percentUsed

    if (totalPercentUsed >= 90) {
      return {
        level: 'high',
        color: 'red',
        message: 'Only 1-2 slots left today',
        animate: true
      }
    } else if (totalPercentUsed >= 70) {
      return {
        level: 'medium',
        color: 'orange',
        message: `${capacity.regular.available} slots remaining`,
        animate: true
      }
    } else if (totalPercentUsed >= 50) {
      return {
        level: 'low',
        color: 'yellow',
        message: `${capacity.regular.current} projects started today`,
        animate: false
      }
    } else {
      return {
        level: 'normal',
        color: 'green',
        message: 'Plenty of availability',
        animate: false
      }
    }
  }

  // Reserve slot in queue (call when order is placed)
  reserveSlot(orderType, deliveryDate) {
    const orderId = `order_${Date.now()}`
    this.currentQueue.push({
      id: orderId,
      type: orderType,
      deliveryDate: deliveryDate,
      status: 'reserved',
      timestamp: new Date().toISOString()
    })
    return orderId
  }

  // Get queue statistics for admin dashboard
  getQueueStatistics() {
    const today = new Date().toISOString().split('T')[0]
    const thisWeek = []

    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      const dateString = date.toISOString().split('T')[0]

      const dayOrders = this.currentQueue.filter(order =>
        order.deliveryDate === dateString
      )

      thisWeek.push({
        date: dateString,
        formatted: this.formatDate(date),
        regular: dayOrders.filter(o => o.type === 'regular').length,
        rush24h: dayOrders.filter(o => o.type === 'rush24h').length,
        rush12h: dayOrders.filter(o => o.type === 'rush12h').length,
        total: dayOrders.length
      })
    }

    return {
      todayCapacity: this.getCapacityStatus(),
      weekAhead: thisWeek,
      totalInQueue: this.currentQueue.filter(o => o.status === 'pending').length,
      averageDeliveryTime: this.calculateAverageDeliveryTime()
    }
  }

  // Calculate average delivery time
  calculateAverageDeliveryTime() {
    const deliveredOrders = this.currentQueue.filter(o => o.status === 'delivered')
    if (deliveredOrders.length === 0) return '48 hours'

    // Mock calculation - in production, calculate from actual delivery times
    return '42 hours'
  }
}

// Export singleton instance
const orderQueueService = new OrderQueueService()
export default orderQueueService