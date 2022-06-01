const adminManage = {
    isAdmin: false,
    checkAdmin: () => {
      if (this.isAdmin) {
        return true
      } else {
        return false
      }
    },
    login () {
      this.isAdmin = true
    },
    logout () {
      this.isAdmin = false
    }
  }
  
  module.exports = adminManage