import requests
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def check_server_status():
    """Check if the application server is running on localhost:5000"""
    url = "http://localhost:5000"
    
    print(f"Checking if server is running at {url}...")
    
    # Try with requests first (faster)
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print(f"Server is running! Status code: {response.status_code}")
            return True
        else:
            print(f"Server returned status code: {response.status_code}")
            return False
    except requests.RequestException as e:
        print(f"Could not connect to server: {e}")
        
    # Try with Selenium as a backup
    print("\nTrying with Selenium...")
    try:
        options = Options()
        options.add_argument("--headless")
        driver = webdriver.Chrome(options=options)
        
        driver.set_page_load_timeout(10)
        driver.get(url)
        
        print(f"Page title: {driver.title}")
        if "NutriFit" in driver.title:
            print("Successfully connected to NutriFit application!")
        else:
            print(f"Connected to server but title doesn't contain 'NutriFit': {driver.title}")
            
        driver.quit()
        return True
    except Exception as e:
        print(f"Selenium connection failed: {e}")
        return False

def main():
    """Main function to check server status and provide guidance"""
    if check_server_status():
        print("\nServer is running correctly. You should be able to run the tests.")
    else:
        print("\nServer does not appear to be running. Please follow these steps:")
        print("1. Make sure the NutriFit application is started:")
        print("   python app.py")
        print("2. Check for any error messages when starting the app")
        print("3. Verify the application is using port 5000")
        print("4. Check if you can access the app in your browser: http://localhost:5000")
        
        print("\nIf you need to run tests without the app:")
        print("1. Modify test files to use a mock server or skip login tests")
        print("2. Or create a test that focuses only on Chart.js functionality without requiring login")

if __name__ == "__main__":
    main() 