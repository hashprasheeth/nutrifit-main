from selenium import webdriver
from selenium.webdriver.chrome.options import Options

print("Starting test...")

try:
    print("Creating Chrome options...")
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    print("Initializing Chrome webdriver...")
    driver = webdriver.Chrome(options=options)
    
    print("WebDriver initialized successfully!")
    print(f"Browser version: {driver.capabilities['browserVersion']}")
    print(f"Driver version: {driver.capabilities['chrome']['chromedriverVersion'].split(' ')[0]}")
    
    # Test navigation
    print("Navigating to google.com...")
    driver.get("https://www.google.com")
    print(f"Page title: {driver.title}")
    
    # Clean up
    driver.quit()
    print("Test completed successfully!")
    
except Exception as e:
    print(f"An error occurred: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc() 