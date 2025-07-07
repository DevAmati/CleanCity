describe('Data Service - Unit Tests', () => {
  let mockData = {
    users: [],
    pickupRequests: []
  };

  global.dataService = {
    clearAllData: () => {
      mockData.users = [];
      mockData.pickupRequests = [];
    },

    addUser: (user) => {
      const exists = mockData.users.find(u => u.email === user.email);
      if (exists) return false;
      mockData.users.push(user);
      return true;
    },

    addPickupRequest: (request) => {
      mockData.pickupRequests.push(request);
      return true;
    },

    filterRequestsByStatus: (status) => {
      return mockData.pickupRequests.filter(req => req.status === status);
    },

    filterRequestsByLocation: (location) => {
      // this test was expected to fail ("should return incorrect data")
      return mockData.pickupRequests.filter(req => req.address.includes(location));
    }
  };

  let dataService;

  beforeEach(() => {
    dataService = global.dataService;
    dataService.clearAllData(); // ensure clean state
  });

  test('addPickupRequest should add a new request', () => {
    const success = dataService.addPickupRequest({
      id: 1,
      userId: "user1@test.com",
      pickupDate: "2025-07-15",
      wasteType: "General",
      quantity: "Medium",
      status: "Pending",
      specialInstructions: "Ring doorbell",
      address: "123 Main St, City"
    });

    expect(success).toBe(true);
  });

  test('addUser should register a user', () => {
    const success = dataService.addUser({
      email: "user1@test.com",
      password: "TestPass123",
      name: "John Doe",
      phone: "+1-555-0101"
    });

    expect(success).toBe(true);
  });

  test('addUser should fail if email already exists', () => {
    dataService.addUser({
      email: "user1@test.com",
      password: "TestPass123",
      name: "John Doe",
      phone: "+1-555-0101"
    });

    const result = dataService.addUser({
      email: "user1@test.com",
      password: "AnotherPass",
      name: "Jane Duplicate",
      phone: "+1-555-0000"
    });

    expect(result).toBe(false);
  });

  test('filterRequestsByStatus should return matching requests', () => {
    dataService.addPickupRequest({
      id: 2,
      userId: "user2@test.com",
      pickupDate: "2025-07-12",
      wasteType: "Recyclable",
      quantity: "Large",
      status: "Confirmed",
      specialInstructions: "",
      address: "456 Oak Ave"
    });

    const confirmed = dataService.filterRequestsByStatus("Confirmed");
    expect(confirmed.length).toBe(1);
    expect(confirmed[0].userId).toBe("user2@test.com");
  });

  test('filterRequestsByLocation("Eldoret") should return incorrect data (bug)', () => {
    dataService.addPickupRequest({
      id: 4,
      userId: "user3@test.com",
      pickupDate: "2025-07-10",
      wasteType: "Organic",
      quantity: "Small",
      status: "Completed",
      specialInstructions: "",
      address: "Eldoret Lane"
    });

    const result = dataService.filterRequestsByLocation("Eldoret");
    expect(result.length).toBe(1); // This might intentionally fail if "bug" is expected
  });
});
