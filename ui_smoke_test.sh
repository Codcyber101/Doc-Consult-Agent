#!/bin/bash

BASE_URL="http://localhost:3000"
echo "Starting Sovereign Utility UI Smoke Tests..."
echo "=========================================="

test_route() {
  local route=$1
  local expected_text=$2
  echo -n "Testing $route ... "
  
  response=$(curl -s -L "$BASE_URL$route")
  status=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE_URL$route")
  
  if [ "$status" -ne 200 ]; then
    echo "❌ FAILED (Status: $status)"
    return 1
  fi
  
  if echo "$response" | grep -qi "$expected_text"; then
    echo "✅ OK"
  else
    echo "❌ FAILED (Text '$expected_text' not found)"
    return 1
  fi
}

# Run tests
test_route "/" "Selam"
test_route "/services" "Directory"
test_route "/services/trade-license" "Trade License Renewal"
test_route "/flows/trade-license" "Step 1 of 5"
test_route "/vault" "Vault"
test_route "/vault/doc-1" "Abebe Bikila"
test_route "/track" "Tracking"
test_route "/track/ET-TL-2026-B812" "Officer Review"
test_route "/admin" "Surveillance"
test_route "/admin/review" "Review Queue"
test_route "/admin/policies" "Policy Registry"
test_route "/admin/audit" "Audit Ledger"
test_route "/admin/research" "Research Lab"
test_route "/login" "Authentication"

echo "=========================================="
echo "SMOKE TESTS COMPLETE"
