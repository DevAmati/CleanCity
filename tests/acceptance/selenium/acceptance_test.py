import unittest
import time
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class AcceptanceTest(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        self.driver = webdriver.Chrome(service=Service(), options=chrome_options)
        self.driver.get("http://localhost:3000")
        self.wait = WebDriverWait(self.driver, 15)
        self.log_path = os.path.join("tests", "acceptance", "frs_test_map.md")
        self._log("## ✅ Acceptance Test Results\n\n| Flow | Status | Timestamp |\n|------|--------|-----------|")

    def _log(self, message):
        with open(self.log_path, "a", encoding="utf-8") as f:
            f.write(message + "\n")

    def _take_screenshot_on_failure(self, test_name):
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"screenshot_{test_name}_{ts}.png"
        filepath = os.path.join("tests", "acceptance", filename)
        self.driver.save_screenshot(filepath)

    def test_user_and_admin_flow(self):
        try:
            self._login_and_submit_pickup("user@cleancity.com", "password123", is_admin=False)
            self._login_and_submit_pickup("admin@cleancity.com", "admin123", is_admin=True)
            self._log("| User & Admin Flow | ✅ Pass | " + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + " |")
        except Exception as e:
            self._take_screenshot_on_failure("user_admin_flow")
            self._log("| User & Admin Flow | ❌ Fail | " + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + " |")
            raise e

    def _login_and_submit_pickup(self, email, password, is_admin=False):
        driver = self.driver
        wait = self.wait

        # Go to login
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[data-page='login']"))).click()

        # Wait for form and fill it
        wait.until(EC.presence_of_element_located((By.ID, "login-form")))
        driver.find_element(By.ID, "login-email").send_keys(email)
        driver.find_element(By.ID, "login-password").send_keys(password)
        driver.find_element(By.ID, "login-form").submit()

        # Go to dashboard
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[data-page='dashboard']"))).click()
        wait.until(EC.presence_of_element_located((By.ID, "dashboard-page")))

        # Go to home (pickup form)
        driver.find_element(By.CSS_SELECTOR, "a[data-page='home']").click()
        wait.until(EC.presence_of_element_located((By.ID, "pickup-form")))

        # Fill out pickup form
        driver.find_element(By.ID, "fullName").send_keys("Test User")
        driver.find_element(By.ID, "location").send_keys("Nairobi")
        driver.find_element(By.CSS_SELECTOR, "input[name='wasteType'][value='General']").click()
        driver.find_element(By.ID, "preferredDate").send_keys("2025-07-20")
        driver.find_element(By.CSS_SELECTOR, "#pickup-form button[type='submit']").click()

        # Wait for success message
        wait.until(EC.visibility_of_element_located((By.ID, "success-message")))

        if is_admin:
            # Go to admin
            driver.find_element(By.CSS_SELECTOR, "a[data-page='admin']").click()
            wait.until(EC.presence_of_element_located((By.ID, "admin-page")))

        # Logout
        driver.find_element(By.ID, "logout-btn").click()
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a[data-page='login']")))

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
