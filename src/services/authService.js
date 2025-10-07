/**
 * Admin Authentication Service
 * Handles login, logout, and session management for admin users
 */

class AuthService {
  constructor() {
    this.TOKEN_KEY = 'snapshelf_admin_token'
    this.USER_KEY = 'snapshelf_admin_user'
    this.SESSION_TIMEOUT = 8 * 60 * 60 * 1000 // 8 hours in milliseconds

    // In production, these should be environment variables or from a secure backend
    this.adminCredentials = {
      'admin@snapshelf.com': 'SnapShelf2024!Admin',
      'manager@snapshelf.com': 'Manager2024!Studio'
    }
  }

  // Validate admin credentials
  async validateCredentials(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials
    const storedPassword = this.adminCredentials[email.toLowerCase()]

    if (!storedPassword || storedPassword !== password) {
      throw new Error('Invalid email or password')
    }

    // Create user object
    const user = {
      email: email.toLowerCase(),
      name: email === 'admin@snapshelf.com' ? 'Admin User' : 'Manager User',
      role: email === 'admin@snapshelf.com' ? 'admin' : 'manager',
      loginTime: new Date().toISOString(),
      permissions: this.getUserPermissions(email)
    }

    return user
  }

  // Get user permissions based on role
  getUserPermissions(email) {
    const isAdmin = email === 'admin@snapshelf.com'

    return {
      viewDashboard: true,
      manageCapacity: isAdmin,
      viewOrders: true,
      manageSettings: isAdmin,
      viewReports: true
    }
  }

  // Login user and create session
  async login(email, password) {
    try {
      const user = await this.validateCredentials(email, password)

      // Generate session token (in production, this should be a JWT from backend)
      const token = this.generateSessionToken(user)

      // Store in localStorage
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))

      return { user, token }
    } catch (error) {
      throw error
    }
  }

  // Generate session token
  generateSessionToken(user) {
    const payload = {
      userId: user.email,
      role: user.role,
      loginTime: Date.now(),
      expiresAt: Date.now() + this.SESSION_TIMEOUT
    }

    // In production, use proper JWT signing
    return btoa(JSON.stringify(payload))
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem(this.TOKEN_KEY)
    const user = localStorage.getItem(this.USER_KEY)

    if (!token || !user) {
      return false
    }

    try {
      // Decode and validate token
      const payload = JSON.parse(atob(token))
      const now = Date.now()

      // Check if token is expired
      if (payload.expiresAt < now) {
        this.logout()
        return false
      }

      return true
    } catch (error) {
      this.logout()
      return false
    }
  }

  // Get current user
  getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null
    }

    const userData = localStorage.getItem(this.USER_KEY)
    try {
      return JSON.parse(userData)
    } catch (error) {
      this.logout()
      return null
    }
  }

  // Get current session token
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  // Check specific permission
  hasPermission(permission) {
    const user = this.getCurrentUser()
    return user?.permissions?.[permission] || false
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  // Refresh session (extend expiry)
  refreshSession() {
    if (!this.isAuthenticated()) {
      return false
    }

    const user = this.getCurrentUser()
    const token = this.generateSessionToken(user)

    localStorage.setItem(this.TOKEN_KEY, token)
    return true
  }

  // Get session info
  getSessionInfo() {
    if (!this.isAuthenticated()) {
      return null
    }

    const token = localStorage.getItem(this.TOKEN_KEY)
    try {
      const payload = JSON.parse(atob(token))
      return {
        loginTime: new Date(payload.loginTime),
        expiresAt: new Date(payload.expiresAt),
        timeRemaining: Math.max(0, payload.expiresAt - Date.now()),
        isExpiringSoon: (payload.expiresAt - Date.now()) < (30 * 60 * 1000) // 30 minutes
      }
    } catch (error) {
      return null
    }
  }

  // Auto-refresh session periodically
  startSessionMonitoring() {
    // Check session every 5 minutes
    const intervalId = setInterval(() => {
      const sessionInfo = this.getSessionInfo()

      if (!sessionInfo) {
        clearInterval(intervalId)
        return
      }

      // Auto-refresh if expiring within 30 minutes
      if (sessionInfo.isExpiringSoon) {
        this.refreshSession()
      }
    }, 5 * 60 * 1000) // 5 minutes

    return intervalId
  }
}

// Export singleton instance
const authService = new AuthService()
export default authService