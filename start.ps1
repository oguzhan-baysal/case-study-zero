Start-Process powershell -ArgumentList "-NoExit", "cd host-app; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "cd products-remote; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "cd basket-remote; npm start"