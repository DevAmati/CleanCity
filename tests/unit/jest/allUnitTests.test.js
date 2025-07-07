// tests/unit/jest/allUnitTests.test.js

describe('CleanCity App - Combined Unit Tests', () => {
    let dataService;
  
    beforeEach(() => {
      jest.resetModules();
      require('../../../script.js');
      dataService = global.dataService;
      dataService?.clearAllData();
    });
  
    // ---------------------- User Management ----------------------
    describe('User Management', () => {
      const testUsers = [
        { id: "1", name: "John Doe", email: "user1@test.com", password: "TestPass123", role: "User", phone: "+1-555-0101" },
        { id: "2", name: "Jane Smith", email: "user2@test.com", password: "TestPass123", role: "User", phone: "+1-555-0102" },
        { id: "3", name: "Mike Johnson", email: "user3@test.com", password: "TestPass123", role: "User", phone: "+1-555-0103" },
      ];
  
      test('Add multiple users and retrieve one by email', () => {
        testUsers.forEach(user => {
          expect(dataService.addUser({ ...user, createdAt: new Date().toISOString() })).toBe(true);
        });
        const retrieved = dataService.getUserByEmail("user2@test.com");
        expect(retrieved.name).toBe("Jane Smith");
      });
  
      test('Prevent duplicate user emails', () => {
        const user = { id: "10", name: "Duplicate", email: "user1@test.com", password: "AnotherPass", role: "User", phone: "+1-555-9999", createdAt: new Date().toISOString() };
        dataService.addUser(testUsers[0]);
        expect(dataService.addUser(user)).toBe(false);
      });
  
      test('Admin user registration', () => {
        const admin = { id: "99", name: "System Administrator", email: "admin@cleancity.com", password: "AdminPass123", role: "Admin", phone: "+1-555-0001", createdAt: new Date().toISOString() };
        expect(dataService.addUser(admin)).toBe(true);
        const retrieved = dataService.getUserByEmail("admin@cleancity.com");
        expect(retrieved.role).toBe("Admin");
      });
    });
  
    // ---------------------- Pickup Requests ----------------------
    describe('Pickup Request Logic', () => {
      test('Add pickup request and filter by status', () => {
        const request = {
          id: 1,
          userId: "user1@test.com",
          pickupDate: "2025-07-15",
          wasteType: "General",
          quantity: "Medium",
          status: "Pending",
          specialInstructions: "Ring bell",
          address: "123 Main St"
        };
        expect(dataService.addPickupRequest(request)).toBe(true);
        const filtered = dataService.filterRequestsByStatus("Pending");
        expect(filtered.length).toBeGreaterThan(0);
      });
  
      test('Filter requests by location returns empty (bug simulation)', () => {
        const result = dataService.filterRequestsByLocation("Eldoret");
        expect(result).toEqual([]); // Assuming no Eldoret data exists
      });
    });
  
    // ---------------------- Blog Posts ----------------------
    describe('Blog Post Logic', () => {
      test('Add and retrieve a published blog post', () => {
        const post = {
          id: 1,
          title: "5 Ways to Reduce Waste",
          content: "Helpful tips...",
          author: "EcoTeam",
          date: "2025-06-01",
          tags: ["Tips"],
          featured: true
        };
        expect(dataService.addBlogPost(post)).toBe(true);
        const posts = dataService.getAllBlogPosts();
        expect(posts.length).toBeGreaterThan(0);
      });
    });
  
    // ---------------------- Community Posts ----------------------
    describe('Community Post Logic', () => {
      test('Post and retrieve community message', () => {
        const post = {
          id: 1,
          content: "Just scheduled pickup!",
          author: "Sarah J.",
          date: "2025-06-01",
          likes: 12,
          comments: 3
        };
        expect(dataService.addCommunityPost(post)).toBe(true);
        const posts = dataService.getAllCommunityPosts();
        expect(posts[0].author).toBe("Sarah J.");
      });
    });
  
    // ---------------------- Form Validations ----------------------
    describe('Form Validation', () => {
      test('Reject invalid registration data', () => {
        const invalidUser = {
          email: "bademail",
          password: "123",
          confirmPassword: "456",
          name: "",
          phone: "notaphone"
        };
        expect(dataService.validateRegistration(invalidUser)).toBe(false);
      });
    });
  
    // ---------------------- Admin Panel ----------------------
    describe('Admin Panel Features', () => {
      test('Retrieve all users (admin)', () => {
        dataService.addUser({ id: "a1", email: "admin@cleancity.com", name: "Admin", role: "Admin", password: "AdminPass", phone: "+1-555-0001", createdAt: new Date().toISOString() });
        const users = dataService.getAllUsers();
        expect(users.length).toBeGreaterThan(0);
      });
    });
  });
  