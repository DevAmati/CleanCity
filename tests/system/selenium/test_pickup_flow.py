"""
End‑to‑end test:  login  ➜  submit pickup request  ➜  verify it shows on dashboard
Works against the SPA version of CleanCity that serves
  /login, /home and /dashboard routes.

Prerequisites
-------------
1. Local dev server running at http://localhost:3000
2. Firefox + geckodriver in PATH   (or switch to Chrome if preferred)
3. Python packages: selenium
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest


class PickupFlowTest(unittest.TestCase):
    BASE_URL = "http://localhost:3000"

    def setUp(self) -> None:
        opts = Options()
        # Uncomment next line to run headless (handy on CI systems)
        # opts.headless = True

        self.driver = webdriver.Firefox(service=FirefoxService(), options=opts)
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 10)

        # Go straight to the login route
        self.driver.get(f"{self.BASE_URL}/login")

    def tearDown(self) -> None:
        self.driver.quit()

    def test_pickup_submission_and_dashboard_update(self):
        d, w = self.driver, self.wait

        # --- LOGIN -------------------------------------------------------- #
        w.until(EC.presence_of_element_located((By.ID, "login-form")))
        d.find_element(By.ID, "login-email").send_keys("user@cleancity.com")
        d.find_element(By.ID, "login-password").send_keys("password123")
        d.find_element(By.CSS_SELECTOR, "#login-form button[type='submit']").click()

        # Wait until login is successful and user links become visible
        w.until(EC.presence_of_element_located((By.ID, "user-links")))

        # --- PICKUP FORM SUBMISSION --------------------------------------- #
        d.get(f"{self.BASE_URL}/home")
        w.until(EC.presence_of_element_located((By.ID, "pickup-form")))

        d.find_element(By.ID, "fullName").send_keys("John Selenium")
        d.find_element(By.ID, "location").send_keys("Nairobi")
        d.find_element(
            By.CSS_SELECTOR,
            "input[name='wasteType'][value='Recyclable']"
        ).click()

        # Set preferred date using JavaScript to avoid picker issues
        d.execute_script(
            "document.getElementById('preferredDate').value = '2025-07-10';"
        )

        d.find_element(By.ID, "pickup-form").submit()
        w.until(EC.visibility_of_element_located((By.ID, "success-message")))

        # --- DASHBOARD VERIFICATION -------------------------------------- #
        d.get(f"{self.BASE_URL}/dashboard")

        total_el = w.until(EC.presence_of_element_located((By.ID, "totalRequests")))
        self.assertGreater(
            int(total_el.text.strip()), 0,
            "Total requests should be > 0 after submission"
        )

        w.until(EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, "#requests-tbody tr")
        ))
        rows = d.find_elements(By.CSS_SELECTOR, "#requests-tbody tr")
        self.assertTrue(
            any("John Selenium" in r.text for r in rows),
            "Newly submitted pickup request not found in dashboard table"
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
