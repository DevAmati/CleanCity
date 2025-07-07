/**
 * @file DashboardDataFlow.test.js
 * @desc Integration test to validate data flow from pickup submission to dashboard metrics
 */

describe('🧪 Dashboard Data Flow Integration Tests', () => {
    let dataService;
  
    beforeEach(() => {
      jest.resetModules();
      require('../../../script.js'); // Assumes dataService is set to global
      dataService = global.dataService;
      dataService.clearAllData();
    });
  
    test('Submitting pickup should increment total requests on dashboard', () => {
      const user = {
        id: "USR123",
        name: "Test User",
        email: "testuser@example.com",
        password: "securePass123",
        role: "User",
        phone: "0700123456",
        createdAt: new Date().toISOString()
      };
  
      // Register user
      dataService.addUser(user);
  
      // Simulate login
      dataService.login(user.email, user.password);
  
      // Submit a pickup request
      const pickupRequest = {
        id: "REQ123",
        date: "2025-07-09",
        wasteType: "Plastic",
        quantity: 3,
        location: "Kutus",
        userId: user.id
      };
  
      const result = dataService.addPickupRequest(pickupRequest);
      expect(result).toBe(true);
  
      // Check if dashboard reflects the request
      const allRequests = dataService.getAllPickupRequests();
      expect(allRequests.length).toBe(1);
  
      const userRequests = allRequests.filter(req => req.userId === user.id);
      expect(userRequests.length).toBe(1);
      expect(userRequests[0].wasteType).toBe("Plastic");
    });
  
    test('Pickup history should show newly added request', () => {
      const user = {
        id: "USR456",
        name: "History Tester",
        email: "history@example.com",
        password: "history123",
        role: "User",
        phone: "0700987654",
        createdAt: new Date().toISOString()
      };
  
      dataService.addUser(user);
      dataService.login(user.email, user.password);
  
      const request = {
        id: "REQ999",
        date: "2025-07-10",
        wasteType: "Organic",
        quantity: 2,
        location: "Kerugoya",
        userId: user.id
      };
  
      dataService.addPickupRequest(request);
  
      const pickupHistory = dataService.getRequestsByUserId(user.id);
      expect(pickupHistory.length).toBe(1);
      expect(pickupHistory[0].wasteType).toBe("Organic");
    });
  });

  