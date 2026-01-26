import asyncio
from playwright.async_api import async_playwright

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # 1. Landing Page
        print("Testing Landing Page...")
        await page.goto("http://localhost:3000")
        await page.wait_for_selector("h1:has-text('Selam')")
        print("✅ Landing Page OK")

        # 2. Services Directory
        print("Testing Services Directory...")
        await page.click("text=Services")
        await page.wait_for_url("**/services")
        await page.wait_for_selector("h1:has-text('Directory')")
        print("✅ Services Directory OK")

        # 3. Service Detail
        print("Testing Service Detail...")
        await page.click("text=Trade License Renewal")
        await page.wait_for_url("**/services/trade-license")
        await page.wait_for_selector("h1:has-text('Trade License Renewal')")
        print("✅ Service Detail OK")

        # 4. Wizard Flow
        print("Testing Wizard Flow...")
        await page.click("text=Initialize Wizard")
        await page.wait_for_url("**/flows/trade-license")
        await page.wait_for_selector("text=Step 1 of 5")
        # Go to Step 2
        await page.click("button:has-text('Continue')")
        await page.wait_for_selector("text=Step 2 of 5")
        print("✅ Wizard Flow (Steps 1 & 2) OK")

        # 5. Document Vault
        print("Testing Document Vault...")
        await page.goto("http://localhost:3000/vault")
        await page.wait_for_selector("h1:has-text('Vault')")
        await page.wait_for_selector("text=Kebele ID Card")
        print("✅ Document Vault OK")

        # 6. Vault Detail
        print("Testing Vault Detail...")
        await page.click("text=View")
        await page.wait_for_url("**/vault/doc-1")
        await page.wait_for_selector("h2:has-text('Abebe Bikila')")
        print("✅ Vault Detail OK")

        # 7. Application Tracker
        print("Testing Application Tracker...")
        await page.goto("http://localhost:3000/track")
        await page.wait_for_selector("h1:has-text('Tracking')")
        await page.wait_for_selector("text=ET-TL-2026-B812")
        print("✅ Application Tracker OK")

        # 8. Tracker Detail
        print("Testing Tracker Detail...")
        await page.click("text=Details")
        await page.wait_for_url("**/track/ET-TL-2026-B812")
        await page.wait_for_selector("h4:has-text('Officer Review')")
        print("✅ Tracker Detail OK")

        # 9. Admin Dashboard
        print("Testing Admin Dashboard...")
        await page.goto("http://localhost:3000/admin")
        await page.wait_for_selector("h1:has-text('Surveillance')")
        
        # Admin Sub-pages
        await page.click("text=Policy Registry")
        await page.wait_for_url("**/admin/policies")
        await page.wait_for_selector("h1:has-text('Policy Registry Canvas')")
        
        await page.click("text=Human-in-Loop Review")
        await page.wait_for_url("**/admin/review")
        await page.wait_for_selector("h1:has-text('Review Queue')")
        
        await page.click("text=Agent Research Lab")
        await page.wait_for_url("**/admin/research")
        await page.wait_for_selector("h1:has-text('Research Lab')")
        
        await page.click("text=Sovereign Audit")
        await page.wait_for_url("**/admin/audit")
        await page.wait_for_selector("h1:has-text('Audit Ledger')")
        print("✅ Admin Suite OK")

        # 10. Login
        print("Testing Login Page...")
        await page.goto("http://localhost:3000/login")
        await page.wait_for_selector("h1:has-text('Authentication')")
        print("✅ Login Page OK")

        await browser.close()
        print("\n🏆 ALL TESTS PASSED!")

if __name__ == "__main__":
    asyncio.run(run_tests())
