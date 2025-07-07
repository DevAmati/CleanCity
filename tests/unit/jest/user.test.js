/**
 * @jest-environment jsdom
 */
global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value.toString();
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    }
  };
  
  describe('User Management Tests', () => {
    let dataService;
  
    beforeEach(() => {
      jest.resetModules();
      require('../../../script.js');
      dataService = global.dataService;
      dataService.clearAllData();
    });
  
    const testUsers = [
      {
        id: "1",
        name: "John Doe",
        email: "user1@test.com",
        password: "TestPass123",
        role: "User",
        phone: "+1-555-0101"
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "user2@test.com",
        password: "TestPass123",
        role: "User",
        phone: "+1-555-0102"
      },
      {
        id: "3",
        name: "Mike Johnson",
        email: "user3@test.com",
        password: "TestPass123",
        role: "User",
        phone: "+1-555-0103"
      }
    ];
  
    test('Add multiple users and retrieve them by email', () => {
      testUsers.forEach(user => {
        const result = dataService.addUser({
          ...user,
          createdAt: new Date().toISOString()
        });
        expect(result).toBe(true);
      });
  
      const retrieved = dataService.getUserByEmail("user2@test.com");
      expect(retrieved.name).toBe("Jane Smith");
      expect(retrieved.phone).toBe("+1-555-0102");
    });
  
    test('Adding a user with existing email should fail', () => {
      const user = {
        id: "10",
        name: "Duplicate",
        email: "user1@test.com",
        password: "AnotherPass",
        role: "User",
        phone: "+1-555-9999",
        createdAt: new Date().toISOString()
      };
      dataService.addUser(testUsers[0]);
      const result = dataService.addUser(user);
      expect(result).toBe(false);
    });
  
    test('Admin user registration and retrieval', () => {
      const admin = {
        id: "99",
        name: "System Administrator",
        email: "admin@cleancity.com",
        password: "AdminPass123",
        role: "Admin",
        phone: "+1-555-0001",
        createdAt: new Date().toISOString()
      };
      const added = dataService.addUser(admin);
      expect(added).toBe(true);
  
      const retrieved = dataService.getUserByEmail("admin@cleancity.com");
      expect(retrieved.role).toBe("Admin");
    });
  });
  